# 🤖 AI Services Deployment Strategy

## 🎯 Overview
The JSS Placement Portal includes two AI services that need special deployment consideration:

1. **AI Resume Analyzer** (Python/Streamlit) - Port 8501
2. **AI Career Coach** (Next.js) - Port 3002

## 🚀 Deployment Options

### Option 1: Railway.app (Recommended for Python AI Services)

#### AI Resume Analyzer on Railway:

1. **Create Railway Account**: Sign up at [railway.app](https://railway.app)

2. **Deploy from GitHub**:
   ```bash
   # Connect your GitHub repository
   # Select the ai-resume-analyser folder as root directory
   ```

3. **Railway Configuration** (`railway.toml`):
   ```toml
   [build]
   builder = "NIXPACKS"
   buildCommand = "pip install -r requirements.txt && python -m spacy download en_core_web_sm"
   
   [deploy]
   startCommand = "streamlit run App.py --server.port $PORT --server.address 0.0.0.0"
   restartPolicyType = "ON_FAILURE"
   restartPolicyMaxRetries = 10
   ```

4. **Environment Variables on Railway**:
   ```env
   PORT=8501
   PYTHONPATH=/app
   STREAMLIT_SERVER_HEADLESS=true
   STREAMLIT_SERVER_ENABLE_CORS=true
   ```

#### Expected URL: `https://your-ai-resume-app.up.railway.app`

---

### Option 2: Render.com (Alternative for Python)

#### AI Resume Analyzer on Render:

1. **Create Render Account**: Sign up at [render.com](https://render.com)

2. **Create Web Service**:
   - Connect GitHub repository
   - Root Directory: `ai-resume-analyser`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt && python -m spacy download en_core_web_sm`
   - Start Command: `streamlit run App.py --server.port $PORT --server.address 0.0.0.0`

3. **Environment Variables**:
   ```env
   PYTHON_VERSION=3.11.5
   PORT=10000
   ```

#### Expected URL: `https://your-ai-resume-app.onrender.com`

---

### Option 3: Vercel (For AI Career Coach - Next.js Compatible)

#### AI Career Coach on Vercel:

1. **Deploy AI Career Coach**:
   ```bash
   cd ai-career-coach
   vercel --prod
   ```

2. **Vercel Configuration** (`vercel.json`):
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/next"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/$1"
       }
     ]
   }
   ```

#### Expected URL: `https://your-ai-career-coach.vercel.app`

---

## 🔄 Frontend Integration

After deploying AI services, update your frontend environment variables:

### Update `.env.production`:
```env
# Main Backend
VITE_API_BASE_URL=https://jss-placement-portal-demo.vercel.app

# AI Services
VITE_AI_RESUME_ANALYZER_URL=https://your-ai-resume-app.up.railway.app
VITE_AI_CAREER_COACH_URL=https://your-ai-career-coach.vercel.app
```

### Update Frontend Code:
```javascript
// In src/utils/aiConstants.js
export const AI_RESUME_ANALYZER_URL = import.meta.env.VITE_AI_RESUME_ANALYZER_URL || "http://localhost:8501";
export const AI_CAREER_COACH_URL = import.meta.env.VITE_AI_CAREER_COACH_URL || "http://localhost:3002";
```

---

## 📋 Deployment Commands Summary

### Quick Deploy All Services:

```bash
# 1. Deploy Main App to Vercel
vercel --prod

# 2. Deploy AI Resume Analyzer to Railway
# (via Railway dashboard - connect GitHub repo)

# 3. Deploy AI Career Coach to Vercel
cd ai-career-coach
vercel --prod

# 4. Update environment variables in all platforms
```

---

## 🧪 Testing Deployed AI Services

### Test AI Resume Analyzer:
```bash
curl https://your-ai-resume-app.up.railway.app
# Should return Streamlit interface
```

### Test AI Career Coach:
```bash
curl https://your-ai-career-coach.vercel.app
# Should return Next.js application
```

### Test Integration:
1. Upload resume on main portal
2. Verify AI analysis works
3. Test career guidance features

---

## 🔧 Service URLs Configuration

Update these in your main application:

### StudentDashboard.jsx:
```javascript
const AI_RESUME_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-ai-resume-app.up.railway.app'
  : 'http://localhost:8501';

const AI_CAREER_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-ai-career-coach.vercel.app' 
  : 'http://localhost:3002';
```

---

## 🎯 Final Architecture

After deployment, your architecture will be:

```
Frontend (Vercel)
├── Main Portal: https://jss-placement-portal-demo.vercel.app
├── Backend API: https://jss-placement-portal-demo.vercel.app/api
├── AI Resume: https://your-ai-resume-app.up.railway.app
└── AI Career: https://your-ai-career-coach.vercel.app
```

All services will be independently scalable and maintainable! 🚀

## 💡 Pro Tips

1. **Use Railway for Python**: Better Python support than Vercel
2. **Keep AI Services Separate**: Independent scaling and deployment
3. **Environment Variables**: Update all platforms after deployment
4. **Health Checks**: Implement `/health` endpoints for monitoring
5. **CORS Configuration**: Update CORS settings for all deployed URLs

Your AI services will be production-ready! 🎉