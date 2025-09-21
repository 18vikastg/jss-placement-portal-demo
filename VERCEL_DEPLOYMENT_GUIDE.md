# 🚀 JSS Placement Portal - Vercel Deployment Guide

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Set up at [mongodb.com/atlas](https://mongodb.com/atlas)
3. **Cloudinary Account**: Set up at [cloudinary.com](https://cloudinary.com)
4. **GitHub Repository**: Your code should be pushed to GitHub

## 🌐 Step-by-Step Deployment

### 1. **MongoDB Atlas Setup**

1. Create a new MongoDB Atlas cluster
2. Create a database user with read/write permissions
3. Get your connection string (replace `<password>` and `<dbname>`)
4. Whitelist all IP addresses (0.0.0.0/0) for Vercel

**MongoDB Connection String Format:**
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### 2. **Cloudinary Setup**

1. Sign up for Cloudinary account
2. Go to Dashboard and note down:
   - Cloud name
   - API Key  
   - API Secret

### 3. **Deploy to Vercel**

#### Option A: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
cd /home/vikas/Desktop/jss-placement-portal
vercel --prod
```

#### Option B: Deploy via Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository: `18vikastg/jss-placement-portal-demo`
4. Configure project settings:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (keep as root)
   - **Build Command**: `cd placement-portal/frontend && npm install && npm run build`
   - **Output Directory**: `placement-portal/frontend/dist`

### 4. **Environment Variables Configuration**

In your Vercel project dashboard, go to Settings > Environment Variables and add:

#### Production Environment Variables:
```env
# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/jobportal?retryWrites=true&w=majority

# JWT Security
JWT_SECRET=your_super_secure_jwt_secret_key_for_production_use_at_least_32_characters_long
SECRET_KEY=your_super_secure_jwt_secret_key_for_production_use_at_least_32_characters_long

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Environment
NODE_ENV=production
```

### 5. **Update Frontend API Configuration**

The frontend needs to point to your Vercel backend. Create/update the API configuration:

**File: `placement-portal/frontend/src/utils/constant.js`**
```javascript
// Update this with your actual Vercel backend URL
export const USER_API_END_POINT = "https://your-app-name.vercel.app/api/v1/user";
export const JOB_API_END_POINT = "https://your-app-name.vercel.app/api/v1/job";
export const APPLICATION_API_END_POINT = "https://your-app-name.vercel.app/api/v1/application";
export const COMPANY_API_END_POINT = "https://your-app-name.vercel.app/api/v1/company";
```

### 6. **AI Services Deployment Strategy**

Since Vercel has limitations for Python and long-running processes, consider these options:

#### Option A: Railway.app for AI Services
```bash
# Deploy AI Resume Analyzer to Railway
# 1. Sign up at railway.app
# 2. Connect GitHub repository
# 3. Deploy ai-resume-analyser folder
# 4. Update frontend to point to Railway URL
```

#### Option B: Render.com for AI Services
```bash
# Deploy to Render.com
# 1. Connect GitHub repository
# 2. Create Web Service for Python app
# 3. Use ai-resume-analyser as root directory
```

## 🎯 Deployment Commands

### Quick Deploy (From Project Root):
```bash
# 1. Commit all changes
git add .
git commit -m "Ready for Vercel deployment"
git push origin main

# 2. Deploy to Vercel
vercel --prod
```

### Manual Deploy Steps:
```bash
# 1. Install dependencies and build
cd placement-portal/frontend
npm install
npm run build

# 2. Test backend locally
cd ../backend
npm install
npm start

# 3. Deploy via Vercel Dashboard or CLI
```

## 🌍 Expected URLs After Deployment

- **Frontend**: `https://your-app-name.vercel.app`
- **Backend API**: `https://your-app-name.vercel.app/api/v1/*`
- **Health Check**: `https://your-app-name.vercel.app/health`

## 🔧 Troubleshooting

### Common Issues:

1. **Build Failures**: Check build logs in Vercel dashboard
2. **Database Connection**: Verify MongoDB Atlas whitelist and connection string
3. **CORS Errors**: Ensure frontend URL is in backend CORS configuration
4. **Environment Variables**: Double-check all required variables are set

### Debug Commands:
```bash
# Check Vercel logs
vercel logs

# Test API endpoints
curl https://your-app-name.vercel.app/health
curl https://your-app-name.vercel.app/api/v1/user
```

## 🎉 Post-Deployment Checklist

- [ ] Frontend loads successfully
- [ ] Backend API responds to health check
- [ ] User registration/login works
- [ ] Database operations work
- [ ] File uploads work (Cloudinary)
- [ ] All dashboard features work
- [ ] Mobile responsiveness works

## 🚀 AI Services Alternative Deployment

For complete AI integration:

1. **AI Resume Analyzer**: Deploy to Railway/Render
2. **AI Career Coach**: Deploy to Vercel (Next.js compatible)
3. **Update frontend**: Point to deployed AI service URLs

Your JSS Placement Portal will be live and ready for the IEEE conference! 🎯

## 📞 Support

If you encounter issues, check:
1. Vercel deployment logs
2. MongoDB Atlas connection
3. Environment variables configuration
4. CORS settings in backend