# 🚀 JSS Placement Portal - Quick Start Commands

## 📋 Available Scripts

### ⚡ Fast Start (Core Features Only)
```bash
./fast-start.sh
```
**What it does:**
- Starts Backend Server (Port 8001)
- Starts Frontend Development Server (Port 5173)  
- Quick startup without AI dependencies
- Best for development and core feature testing

### 🟢 Start All Services (Complete Setup)
```bash
./start-all-services.sh
```
**What it does:**
- Starts Backend Server (Port 8001)
- Starts Frontend Development Server (Port 5173)  
- Starts AI Resume Analyzer (Port 8501)
- Installs dependencies if needed
- Creates log files for monitoring
- Displays all running services with URLs

### 🔴 Stop All Services
```bash
./stop-all-services.sh
```
**What it does:**
- Stops all running services gracefully
- Cleans up all processes on used ports
- Removes PID files
- Verifies all services are stopped

### 📊 Check Service Status
```bash
./check-status.sh
```
**What it does:**
- Shows status of all services (running/stopped)
- Displays service URLs and process IDs
- Shows system resource usage
- Lists recent log activity

## 🌐 Service URLs

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | Main Application (React) |
| **Backend** | http://localhost:8001 | API Server (Node.js) |
| **AI Analyzer** | http://localhost:8501 | Resume Analysis (Streamlit) |

## 👥 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| **Student** | patel@gmail.com | patel@gmail.com |
| **Recruiter** | recruiter@company.com | recruiter123 |
| **Faculty** | faculty@jssateb.ac.in | faculty123 |
| **AI Admin** | admin | admin@resume-analyzer |

## 🎯 Key Features Available

✅ **Job Portal**: Search jobs, apply, track applications  
✅ **AI Resume Analysis**: Upload resume for AI-powered insights  
✅ **Portfolio Builder**: Create professional portfolios (LinkFolio)  
✅ **Alumni Network**: Connect with alumni, real-time messaging  
✅ **Analytics Dashboard**: Track progress and performance  
✅ **Preparation Hub**: Study materials and mock interviews  

## 📂 Log Files Location

```
logs/
├── backend.log        # Backend server logs
├── frontend.log       # Frontend development server logs
└── ai-analyzer.log    # AI Resume Analyzer logs
```

## 🛠️ Troubleshooting

### Common Issues:

**Port already in use:**
```bash
./stop-all-services.sh  # Stop all services first
./start-all-services.sh # Then restart
```

**Dependencies missing:**
```bash
# Backend
cd placement-portal/backend && npm install

# Frontend  
cd placement-portal/frontend && npm install

# AI Analyzer
cd ai-resume-analyser/App && pip install -r requirements.txt
```

**Service not responding:**
```bash
./check-status.sh  # Check what's running
# Kill specific process if needed
kill -9 <PID>
```

## 🚀 Quick Demo Flow

1. **Start all services:**
   ```bash
   ./start-all-services.sh
   ```

2. **Open main application:**
   - Go to http://localhost:5173
   - Login with: patel@gmail.com / patel@gmail.com

3. **Test key features:**
   - Click "Portfolio Builder" → Create portfolio
   - Go to "Jobs" → Browse and apply
   - Visit "Alumni Network" → Connect with alumni
   - Try "AI Resume Analyzer" → Upload resume at http://localhost:8501

4. **Stop when done:**
   ```bash
   ./stop-all-services.sh
   ```

## 📱 Mobile Testing

All services are mobile-responsive:
- Frontend: Responsive design works on all devices
- AI Analyzer: Mobile-friendly Streamlit interface
- Portfolio: Mobile-optimized portfolio display

---

**🎉 You're all set! Run `./start-all-services.sh` to begin!**
