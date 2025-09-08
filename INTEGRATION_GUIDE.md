# JSS Placement Portal - AI Career Coach Integration

## 🚀 Overview

This integration combines the main JSS Placement Portal with the AI Career Coach system, providing students with a unified platform for:

- **Placement Management**: Job applications, company drives, student profiles
- **AI Career Guidance**: Personalized career roadmaps and guidance
- **Resume Builder**: AI-powered resume creation and optimization
- **Interview Preparation**: Mock interviews and AI-powered practice
- **Cover Letter Generator**: AI-assisted cover letter creation
- **Preparation Hub**: Comprehensive study materials and resources

## 🏗️ Architecture

```
JSS Placement Portal (Integrated)
├── placement-portal/          # Main Portal (React + Node.js)
│   ├── frontend/              # React/Vite (Port 5174)
│   └── backend/               # Node.js/Express (Port 8000)
└── ai-career-coach/           # AI Tools (Next.js, Port 3001)
    ├── career-guide/          # Career roadmap generation
    ├── resume/                # AI resume builder
    ├── ai-cover-letter/       # Cover letter generator
    ├── interview/             # Interview preparation
    ├── preparation-hub/       # Study resources
    └── dashboard/             # AI analytics dashboard
```

## 🚀 Quick Start

### Automated Startup (Recommended)

```bash
# Navigate to the project root
cd /home/vikas/Desktop/jss-placement-portal

# Run the integrated startup script
./start-integrated-portal.sh
```

This script will automatically start all three services:
- **Backend API**: http://localhost:8000
- **Main Portal**: http://localhost:5174  
- **AI Career Coach**: http://localhost:3001

### Manual Startup

If you prefer to start services individually:

```bash
# Terminal 1: Backend
cd placement-portal/backend
npm run dev

# Terminal 2: Frontend  
cd placement-portal/frontend
npm run dev

# Terminal 3: AI Career Coach
cd ai-career-coach
npm run dev
```

## 🔗 Integration Points

### Student Dashboard Integration

The main student dashboard now includes integrated access to all AI Career Coach features:

1. **Career Guide** - AI-powered career roadmaps
2. **AI Resume Builder** - Create professional resumes
3. **Cover Letter Generator** - AI-assisted cover letters
4. **Interview Prep** - Mock interviews and practice
5. **Preparation Hub** - Study materials and resources
6. **AI Dashboard** - Analytics and progress tracking

### URL Structure

- Main Portal: `http://localhost:5174`
- AI Career Guide: `http://localhost:3001/career-guide`
- Resume Builder: `http://localhost:3001/resume`
- Cover Letters: `http://localhost:3001/ai-cover-letter`
- Interview Prep: `http://localhost:3001/interview`
- Preparation Hub: `http://localhost:3001/preparation-hub`
- AI Dashboard: `http://localhost:3001/dashboard`

## 📊 Features Overview

### Main Placement Portal
- Student registration and profile management
- Company and job listing management
- Placement drive coordination
- Application tracking
- Faculty dashboard
- Resume analysis (existing feature)

### AI Career Coach System
- **Career Guide**: Personalized career roadmaps based on student goals
- **Resume Builder**: AI-powered resume creation with templates
- **Cover Letter Generator**: Context-aware cover letter creation
- **Interview Preparation**: Mock interviews with AI feedback
- **Preparation Hub**: Curated study materials and resources
- **Analytics Dashboard**: Progress tracking and insights

## 🛠️ Technical Details

### Technologies Used
- **Frontend**: React 18, Vite, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB
- **AI System**: Next.js 15, React 19, MongoDB
- **AI Services**: Google Gemini API
- **UI Components**: Radix UI, Lucide React icons

### Database Configuration
- **Main Portal**: Uses existing MongoDB setup
- **AI Career Coach**: Uses separate MongoDB database (`ai-career-coach`)

### Environment Variables
The AI Career Coach system uses port 3001 to avoid conflicts:
```bash
PORT=3001
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3001
```

## 🔧 Configuration

### Port Configuration
- **Backend API**: 8000
- **Frontend (Main Portal)**: 5174
- **AI Career Coach**: 3001

### AI Services
The system uses Google Gemini API for AI-powered features. Fallback responses are provided when API quota is exceeded.

## 📱 User Experience

Students now have seamless access to AI career tools directly from their main dashboard. The integration maintains the existing placement portal functionality while adding comprehensive AI-powered career guidance features.

### Navigation Flow
1. Student logs into main portal (localhost:5174)
2. Dashboard displays both placement tools and AI career tools
3. AI tools open in new tabs (localhost:3001) for focused usage
4. Students can switch between systems seamlessly

## 🚦 Service Management

### Start All Services
```bash
./start-integrated-portal.sh
```

### Stop All Services
```bash
pkill -f "npm run dev"
```

### Check Service Status
```bash
ps aux | grep "npm run dev"
```

### View Logs
```bash
tail -f *.log
```

## 📋 Troubleshooting

### Port Conflicts
If ports are already in use, the startup script will detect and report conflicts. Stop conflicting services or modify port configurations.

### Service Startup Issues
Check individual service logs:
- `backend.log` - Backend API logs
- `frontend.log` - Frontend development server logs  
- `ai-career-coach.log` - AI Career Coach logs

### Database Connection
Ensure MongoDB is running for both the main portal and AI Career Coach systems.

## 🔄 Development Workflow

1. **Make changes** to either system independently
2. **Test integration** using the startup script
3. **Verify cross-system** navigation and features
4. **Check logs** for any integration issues

## 🎯 Next Steps

- [ ] Single Sign-On (SSO) integration between systems
- [ ] Unified user management
- [ ] Cross-system analytics and reporting
- [ ] Mobile-responsive optimization
- [ ] Performance monitoring and optimization

## 📞 Support

For technical issues or questions about the integration:
1. Check service logs for error details
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check port availability and configurations

## 🏆 Benefits

This integration provides:
- **Unified Experience**: Single dashboard for all student needs
- **AI-Powered Tools**: Comprehensive career guidance and preparation
- **Seamless Navigation**: Easy access to all features
- **Scalable Architecture**: Independent but integrated systems
- **Enhanced Productivity**: All tools accessible from one portal
