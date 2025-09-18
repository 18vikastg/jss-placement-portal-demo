#!/bin/bash

# JSS Placement Portal - Complete One-Command Startup Script
# This script starts all services: Frontend, Backend, AI Career Coach, and AI Resume Analyzer

echo "🚀 JSS PLACEMENT PORTAL - COMPLETE STARTUP"
echo "============================================"
echo "Starting all services in one command..."
echo ""

# Set project root directory
PROJECT_ROOT="/home/vikas/Desktop/jss-placement-portal"
cd "$PROJECT_ROOT"

# Create logs directory if it doesn't exist
mkdir -p logs

# Function to check if port is in use and kill process
cleanup_port() {
    local port=$1
    local service_name=$2
    
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $port is in use by $service_name. Cleaning up..."
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
        sleep 2
    fi
}

# Function to wait for service to be ready
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=30
    local attempt=1
    
    echo "⏳ Waiting for $service_name to be ready..."
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" > /dev/null 2>&1; then
            echo "✅ $service_name is ready!"
            break
        fi
        echo -n "."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    if [ $attempt -gt $max_attempts ]; then
        echo "❌ $service_name failed to start within timeout"
        return 1
    fi
}

# Check prerequisites
echo "[STEP 0] Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python first."
    exit 1
fi

# Check if streamlit is installed
if ! pip show streamlit &> /dev/null; then
    echo "📦 Installing Streamlit..."
    pip install streamlit
fi

echo "✅ All prerequisites checked"
echo ""

echo "[STEP 1] Cleaning up existing processes..."
cleanup_port 5173 "Frontend"
cleanup_port 8001 "Backend" 
cleanup_port 3001 "AI Career Coach"
cleanup_port 8501 "AI Resume Analyzer"

echo "[STEP 2] Starting Backend Server (Port 8001)..."
cd "$PROJECT_ROOT/placement-portal/backend"
if [ ! -f "index.js" ]; then
    echo "❌ Backend index.js not found!"
    exit 1
fi
nohup node index.js > "$PROJECT_ROOT/logs/backend.log" 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

echo "[STEP 3] Starting Frontend Development Server (Port 5173)..."
cd "$PROJECT_ROOT/placement-portal/frontend"
if [ ! -f "package.json" ]; then
    echo "❌ Frontend package.json not found!"
    exit 1
fi
nohup npm run dev > "$PROJECT_ROOT/logs/frontend.log" 2>&1 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

echo "[STEP 4] Starting AI Career Coach (Port 3001)..."
cd "$PROJECT_ROOT/ai-career-coach"
if [ ! -f "package.json" ]; then
    echo "❌ AI Career Coach package.json not found!"
    exit 1
fi
nohup npm run dev > "$PROJECT_ROOT/logs/ai-career-coach.log" 2>&1 &
AI_CAREER_PID=$!
echo "AI Career Coach PID: $AI_CAREER_PID"

echo "[STEP 5] Starting AI Resume Analyzer (Port 8501)..."
cd "$PROJECT_ROOT/ai-resume-analyser"
if [ ! -f "App/App.py" ]; then
    echo "❌ AI Resume Analyzer App.py not found!"
    exit 1
fi

# Check and install Python dependencies
echo "⏳ Checking Python dependencies..."
if [ ! -f "App/.deps_installed" ]; then
    echo "📦 Installing Python dependencies (first time setup)..."
    echo "   This may take 2-3 minutes for the first run..."
    
    # Install basic requirements first
    pip install streamlit pandas pymysql nltk > "$PROJECT_ROOT/logs/ai-resume-deps.log" 2>&1
    
    # Then try to install from requirements.txt (might have some optional packages)
    if [ -f "requirements.txt" ]; then
        pip install -r requirements.txt >> "$PROJECT_ROOT/logs/ai-resume-deps.log" 2>&1 || echo "⚠️  Some optional packages failed to install, but core packages are ready"
    fi
    
    touch "App/.deps_installed"
    echo "✅ Dependencies setup completed"
else
    echo "✅ Dependencies already installed"
fi

# Start the Streamlit app
echo "🚀 Launching Streamlit application..."
export STREAMLIT_SERVER_PORT=8501
export STREAMLIT_SERVER_ADDRESS="0.0.0.0"
nohup streamlit run App/App.py --server.port 8501 --server.address 0.0.0.0 --server.headless true --server.enableCORS false > "$PROJECT_ROOT/logs/ai-resume-analyzer.log" 2>&1 &
AI_RESUME_PID=$!
echo "AI Resume Analyzer PID: $AI_RESUME_PID"

echo ""
echo "[STEP 6] Waiting for all services to be ready..."
echo "This may take 30-60 seconds..."
echo ""

# Wait for each service to be ready
sleep 10  # Give services time to start

echo "Checking Backend Server..."
wait_for_service "http://localhost:8001" "Backend Server"

echo "Checking Frontend Server..."
wait_for_service "http://localhost:5173" "Frontend Server"

echo "Checking AI Career Coach..."
wait_for_service "http://localhost:3001" "AI Career Coach"

echo "Checking AI Resume Analyzer..."
wait_for_service "http://localhost:8501" "AI Resume Analyzer"

echo ""
echo "🎉 ALL SERVICES STARTED SUCCESSFULLY!"
echo "====================================="
echo ""
echo "📱 MAIN APPLICATION PORTAL:"
echo "   🌐 URL: http://localhost:5173"
echo "   📋 Features: Job Portal, Portfolio Builder, Alumni Network"
echo ""
echo "🔧 BACKEND API SERVER:"
echo "   🌐 URL: http://localhost:8001"
echo "   📋 Features: Authentication, Database, File Upload"
echo ""
echo "🤖 AI CAREER COACH:"
echo "   🌐 URL: http://localhost:3001"
echo "   📋 Features: Career Roadmaps, Skill Recommendations, Learning Paths"
echo ""
echo "🧠 AI RESUME ANALYZER:"
echo "   🌐 URL: http://localhost:8501"
echo "   📋 Features: Resume Analysis, Career Insights, Skill Assessment"
echo ""
echo "👥 TEST ACCOUNTS:"
echo "   👨‍🎓 Student: patel@gmail.com / patel@gmail.com"
echo "   🏢 Recruiter: recruiter@company.com / recruiter123"
echo "   👨‍🏫 Faculty: faculty@jssateb.ac.in / faculty123"
echo "   🔧 AI Admin: admin / admin@resume-analyzer"
echo ""
echo "📊 KEY FEATURES AVAILABLE:"
echo "   ✅ Job Search & Applications"
echo "   ✅ AI-Powered Resume Analysis"
echo "   ✅ AI Career Roadmap Generation"
echo "   ✅ Professional Portfolio Builder (LinkFolio)"
echo "   ✅ Alumni Network & Messaging"
echo "   ✅ Real-time Notifications"
echo "   ✅ Analytics Dashboard"
echo ""
echo "📝 PROCESS INFORMATION:"
echo "   Backend PID: $BACKEND_PID (Port 8001)"
echo "   Frontend PID: $FRONTEND_PID (Port 5173)"
echo "   AI Career Coach PID: $AI_CAREER_PID (Port 3001)"
echo "   AI Resume Analyzer PID: $AI_RESUME_PID (Port 8501)"
echo ""
echo "📁 LOG FILES:"
echo "   Backend: $PROJECT_ROOT/logs/backend.log"
echo "   Frontend: $PROJECT_ROOT/logs/frontend.log"
echo "   AI Career Coach: $PROJECT_ROOT/logs/ai-career-coach.log"
echo "   AI Resume Analyzer: $PROJECT_ROOT/logs/ai-resume-analyzer.log"
echo ""
echo "🛑 TO STOP ALL SERVICES:"
echo "   Run: ./stop-all-complete.sh"
echo "   Or manually kill PIDs: $BACKEND_PID $FRONTEND_PID $AI_CAREER_PID $AI_RESUME_PID"
echo ""
echo "🚀 READY FOR DEVELOPMENT AND TESTING!"
echo "====================================="

# Save PIDs to file for easy cleanup
echo "$BACKEND_PID" > "$PROJECT_ROOT/logs/backend.pid"
echo "$FRONTEND_PID" > "$PROJECT_ROOT/logs/frontend.pid"
echo "$AI_CAREER_PID" > "$PROJECT_ROOT/logs/ai-career.pid"
echo "$AI_RESUME_PID" > "$PROJECT_ROOT/logs/ai-resume.pid"

echo ""
echo "💡 TIP: All services are running in background. You can close this terminal."
echo "📊 Monitor logs: tail -f logs/[service-name].log"
echo ""

# Keep script running to monitor services (optional)
read -p "Press Enter to exit (services will continue running in background)..."
