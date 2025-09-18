#!/bin/bash

# JSS Placement Portal - Quick Service Status Check
echo "🚀 JSS PLACEMENT PORTAL - SERVICE STATUS"
echo "========================================"

PROJECT_ROOT="/home/vikas/Desktop/jss-placement-portal"
cd "$PROJECT_ROOT"

# Function to check service status
check_service() {
    local port=$1
    local name=$2
    local url="http://localhost:$port"
    
    if curl -s "$url" > /dev/null 2>&1; then
        echo "✅ $name - RUNNING (Port $port)"
    else
        echo "❌ $name - NOT RUNNING (Port $port)"
    fi
}

echo ""
echo "Checking all services..."
echo ""

check_service 8001 "Backend API Server      "
check_service 5173 "Frontend Portal        "
check_service 3001 "AI Career Coach        "
check_service 8501 "AI Resume Analyzer     "

echo ""
echo "📊 ACCESS URLS:"
echo "   🌐 Main Portal: http://localhost:5173"
echo "   🔧 Backend API: http://localhost:8001"
echo "   🤖 AI Career Coach: http://localhost:3001"
echo "   🧠 AI Resume Analyzer: http://localhost:8501"
echo ""

# Check PID files
echo "📋 PROCESS STATUS:"
if [ -f "logs/backend.pid" ]; then
    backend_pid=$(cat logs/backend.pid)
    if ps -p $backend_pid > /dev/null 2>&1; then
        echo "   ✅ Backend (PID: $backend_pid)"
    else
        echo "   ❌ Backend (PID: $backend_pid - Not Running)"
    fi
else
    echo "   ❓ Backend (No PID file found)"
fi

if [ -f "logs/frontend.pid" ]; then
    frontend_pid=$(cat logs/frontend.pid)
    if ps -p $frontend_pid > /dev/null 2>&1; then
        echo "   ✅ Frontend (PID: $frontend_pid)"
    else
        echo "   ❌ Frontend (PID: $frontend_pid - Not Running)"
    fi
else
    echo "   ❓ Frontend (No PID file found)"
fi

if [ -f "logs/ai-career.pid" ]; then
    career_pid=$(cat logs/ai-career.pid)
    if ps -p $career_pid > /dev/null 2>&1; then
        echo "   ✅ AI Career Coach (PID: $career_pid)"
    else
        echo "   ❌ AI Career Coach (PID: $career_pid - Not Running)"
    fi
else
    echo "   ❓ AI Career Coach (No PID file found)"
fi

if [ -f "logs/ai-resume.pid" ]; then
    resume_pid=$(cat logs/ai-resume.pid)
    if ps -p $resume_pid > /dev/null 2>&1; then
        echo "   ✅ AI Resume Analyzer (PID: $resume_pid)"
    else
        echo "   ❌ AI Resume Analyzer (PID: $resume_pid - Not Running)"
    fi
else
    echo "   ❓ AI Resume Analyzer (No PID file found)"
fi

echo ""
echo "📁 LOG FILES AVAILABLE:"
echo "   Backend: logs/backend.log"
echo "   Frontend: logs/frontend.log"
echo "   AI Career Coach: logs/ai-career-coach.log"
echo "   AI Resume Analyzer: logs/ai-resume-analyzer.log"
echo ""
