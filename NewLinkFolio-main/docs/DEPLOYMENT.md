# LinkFolio Deployment Guide

## Prerequisites

- Node.js 16+ and npm
- Git
- Backend API server (Node.js/Express recommended)
- Database (MongoDB/PostgreSQL recommended)
- Web server (Nginx/Apache) for production

## Development Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd NewLinkFolio-main
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create `.env` file in root directory:
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_WS_URL=ws://localhost:3001
REACT_APP_ENV=development
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Production Build

### 1. Build for Production
```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### 2. Preview Production Build
```bash
npm run preview
```

## Backend Integration

### 1. API Endpoints
Ensure your backend implements the following endpoints:
- Authentication: `/api/auth/*`
- Profile: `/api/profile/*`
- Alumni: `/api/alumni/*`
- Messaging: `/api/messages/*`
- Notifications: `/api/notifications/*`

### 2. CORS Configuration
Configure CORS to allow requests from your frontend domain:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

### 3. WebSocket Support
Implement WebSocket for real-time features:
- Messaging
- Notifications
- Connection requests

## Deployment Options

### Option 1: Static Hosting (Recommended)

#### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Configure environment variables

#### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```
3. Run: `npm run deploy`

### Option 2: VPS/Cloud Server

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/linkfolio/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /ws {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

#### PM2 Process Manager
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save
pm2 startup
```

#### Ecosystem Configuration
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'linkfolio-backend',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
};
```

## Environment Variables

### Frontend (.env)
```env
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_WS_URL=wss://api.yourdomain.com
REACT_APP_ENV=production
```

### Backend (.env)
```env
NODE_ENV=production
PORT=3001
DATABASE_URL=mongodb://localhost:27017/linkfolio
JWT_SECRET=your-jwt-secret
CORS_ORIGIN=https://yourdomain.com
```

## Database Setup

### MongoDB
```bash
# Install MongoDB
# Create database
use linkfolio

# Create collections
db.createCollection("users")
db.createCollection("profiles")
db.createCollection("messages")
db.createCollection("notifications")
```

### PostgreSQL
```sql
-- Create database
CREATE DATABASE linkfolio;

-- Create tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## SSL Certificate

### Let's Encrypt (Free)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring

### Application Monitoring
- Use PM2 monitoring: `pm2 monit`
- Set up log rotation
- Monitor server resources

### Error Tracking
- Sentry for error tracking
- Log aggregation with ELK stack

## Performance Optimization

### Frontend
- Enable gzip compression
- Use CDN for static assets
- Implement lazy loading
- Optimize images

### Backend
- Database indexing
- Caching with Redis
- Rate limiting
- Connection pooling

## Security

### Frontend
- Content Security Policy (CSP)
- HTTPS enforcement
- XSS protection
- Input validation

### Backend
- JWT token validation
- Rate limiting
- SQL injection prevention
- CORS configuration
- Input sanitization

## Backup Strategy

### Database Backup
```bash
# MongoDB
mongodump --db linkfolio --out /backup/mongodb/

# PostgreSQL
pg_dump linkfolio > /backup/postgresql/linkfolio.sql
```

### File Backup
- Profile pictures
- Uploaded files
- Configuration files

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CORS configuration in backend
   - Verify API URL in frontend

2. **WebSocket Connection Failed**
   - Check WebSocket URL
   - Verify proxy configuration

3. **Build Failures**
   - Check Node.js version
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

4. **Database Connection Issues**
   - Verify database URL
   - Check database server status
   - Verify credentials

### Logs
- Frontend: Browser console
- Backend: PM2 logs or application logs
- Nginx: `/var/log/nginx/error.log`

## Maintenance

### Regular Tasks
- Update dependencies
- Monitor server resources
- Backup database
- Review logs
- Security updates

### Updates
1. Test in staging environment
2. Backup production data
3. Deploy updates
4. Monitor for issues
5. Rollback if necessary
