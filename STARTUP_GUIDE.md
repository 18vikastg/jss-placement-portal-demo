# 🚀 JSS Placement Portal - One-Command Startup

## 🎯 **Quick Start - Run Everything with One Command!**

```bash
cd /home/vikas/Desktop/jss-placement-portal
./start-all.sh
```

This single command will start ALL services:
- ✅ **Backend Server** (Port 8001)
- ✅ **Frontend Portal** (Port 5174) 
- ✅ **AI Career Coach** (Port 3001)
- ✅ **AI Resume Analyser** (Port 5001)

## 🌐 **Access Links After Startup:**

| Service | URL | Description |
|---------|-----|-------------|
| **Main Portal** | http://localhost:5174/ | Complete placement portal |
| **Preparation Hub** | http://localhost:5174/preparation | Study resources |
| **AI Career Guide** | http://localhost:3001/career-guide | Roadmap generator |
| **AI Resume Analyser** | http://localhost:5001/ | Resume analysis tool |

## ⚡ **Alternative Quick Start:**

For a simpler startup (no monitoring):
```bash
./quick-start.sh
```

## 🛑 **To Stop All Services:**

Press `Ctrl+C` in the terminal where `start-all.sh` is running, or:

```bash
pkill -f "npm run dev"
pkill -f "streamlit"
```

## 📋 **What Each Service Does:**

### 🏢 **Main Placement Portal** (Port 5174)
- Student dashboard and profile management
- Job applications and placement drives
- Preparation resources hub
- Company listings and job search

### 🤖 **AI Career Coach** (Port 3001)
- Career roadmap generation
- Personalized learning paths
- Skill development guidance
- Industry insights

### 📄 **AI Resume Analyser** (Port 5001)
- Resume scoring and analysis
- ATS optimization suggestions
- Skill gap identification
- Resume improvement recommendations

### 🔧 **Backend Server** (Port 8001)
- APIs for all frontend services
- Database connections
- Authentication and authorization
- Data management

## 🎊 **Features Available:**

✅ **Student Features:**
- Registration & Profile Management
- Job Browsing & Applications
- Preparation Resources (19 curated items)
- Progress Tracking & Analytics
- Mock Interviews & Practice Tests

✅ **AI-Powered Features:**
- Career Roadmap Generation
- Resume Analysis & Optimization
- Personalized Learning Paths
- Industry-specific Guidance

✅ **Advanced Features:**
- Company-specific Preparation
- ATS-friendly Resume Building
- Interview Preparation
- Skill Assessment Tools

## 📁 **Project Structure:**

```
jss-placement-portal/
├── start-all.sh          # 🚀 Main startup script
├── quick-start.sh         # ⚡ Simple startup script
├── placement-portal/
│   ├── backend/          # 🔧 Node.js/Express API
│   └── frontend/         # 🎨 React/Vite application
├── ai-career-coach/      # 🤖 Next.js career guidance
└── ai-resume-analyser/   # 📄 Streamlit resume tool
```

## 🔍 **Troubleshooting:**

### **If a service fails to start:**
1. Check the log files:
   - `placement-portal/backend.log`
   - `placement-portal/frontend.log`
   - `ai-career-coach.log`
   - `ai-resume-analyser.log`

2. Manually restart individual services:
   ```bash
   # Backend
   cd placement-portal/backend && npm run dev
   
   # Frontend  
   cd placement-portal/frontend && npm run dev
   
   # AI Career Coach
   cd ai-career-coach && npm run dev
   
   # AI Resume Analyser
   cd ai-resume-analyser && PORT=5001 ./start.sh
   ```

### **Port conflicts:**
The script automatically kills existing processes on required ports (8001, 5174, 3001, 5001).

### **Missing dependencies:**
Run `npm install` in each service directory if needed.

## 🎉 **Ready to Go!**

Just run `./start-all.sh` and everything will be ready in 1-2 minutes!

---

*Made with ❤️ for JSS Academy of Technical Education*
