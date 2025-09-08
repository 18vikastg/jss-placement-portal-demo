#!/bin/bash

# JSS Placement Portal - Master Startup Script
# This script starts all services: Backend, Frontend, AI Career Coach, and AI Resume Analyser

echo "🚀 JSS PLACEMENT PORTAL - STARTING ALL SERVICES"
echo "================================================="
echo ""

# Function to check if a port is in use
check_port() {
    lsof -i :$1 >/dev/null 2>&1
    return $?
}

# Function to wait for a service to start
wait_for_service() {
    local url=$1
    local name=$2
    local max_attempts=30
    local attempt=1
    
    echo "⏳ Waiting for $name to start..."
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" >/dev/null 2>&1; then
            echo "✅ $name is ready!"
            return 0
        fi
        sleep 2
        attempt=$((attempt + 1))
    done
    echo "❌ $name failed to start after $max_attempts attempts"
    return 1
}

# Clean up function
cleanup() {
    echo ""
    echo "🛑 Shutting down all services..."
    pkill -f "npm run dev" 2>/dev/null
    pkill -f "streamlit" 2>/dev/null
    pkill -f "next dev" 2>/dev/null
    pkill -f "nodemon" 2>/dev/null
    echo "✅ All services stopped"
    exit 0
}

# Set up trap for cleanup on script termination
trap cleanup SIGINT SIGTERM

# Check if required directories exist
if [ ! -d "placement-portal/backend" ]; then
    echo "❌ Backend directory not found!"
    exit 1
fi

if [ ! -d "placement-portal/frontend" ]; then
    echo "❌ Frontend directory not found!"
    exit 1
fi

if [ ! -d "ai-career-coach" ]; then
    echo "❌ AI Career Coach directory not found!"
    exit 1
fi

if [ ! -d "ai-resume-analyser" ]; then
    echo "❌ AI Resume Analyser directory not found!"
    exit 1
fi

echo "📁 All required directories found"
echo ""

# Kill any existing processes on our ports
echo "🧹 Cleaning up existing processes..."
pkill -f "npm run dev" 2>/dev/null || echo "No npm processes to kill"
pkill -f "streamlit" 2>/dev/null || echo "No streamlit processes to kill"
pkill -f "next dev" 2>/dev/null || echo "No next dev processes to kill"

# Kill processes on specific ports
for port in 8001 5174 3001 5001; do
    if check_port $port; then
        echo "🔧 Killing process on port $port..."
        lsof -ti:$port | xargs kill -9 2>/dev/null || echo "No process found on port $port"
    fi
done

sleep 2
echo ""

# Start Backend Server (Port 8001)
echo "1️⃣ Starting Backend Server..."
cd placement-portal/backend
if [ ! -f "package.json" ]; then
    echo "❌ Backend package.json not found!"
    exit 1
fi

npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ../..
echo "📦 Backend starting (PID: $BACKEND_PID) - Logs: placement-portal/backend.log"

# Start Frontend Server (Port 5174)
echo ""
echo "2️⃣ Starting Frontend Server..."
cd placement-portal/frontend
if [ ! -f "package.json" ]; then
    echo "❌ Frontend package.json not found!"
    exit 1
fi

npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ../..
echo "🎨 Frontend starting (PID: $FRONTEND_PID) - Logs: placement-portal/frontend.log"

# Start AI Career Coach (Port 3001)
echo ""
echo "3️⃣ Starting AI Career Coach..."
cd ai-career-coach
if [ ! -f "package.json" ]; then
    echo "❌ AI Career Coach package.json not found!"
    exit 1
fi

npm run dev > ../ai-career-coach.log 2>&1 &
CAREER_COACH_PID=$!
cd ..
echo "🤖 AI Career Coach starting (PID: $CAREER_COACH_PID) - Logs: ai-career-coach.log"

# Start AI Resume Analyser (Port 5001)
echo ""
echo "4️⃣ Starting AI Resume Analyser..."
cd ai-resume-analyser
if [ ! -f "start.sh" ]; then
    echo "❌ AI Resume Analyser start.sh not found!"
    exit 1
fi

export PORT=5001
chmod +x start.sh
./start.sh > ../ai-resume-analyser.log 2>&1 &
RESUME_ANALYSER_PID=$!
cd ..
echo "📄 AI Resume Analyser starting (PID: $RESUME_ANALYSER_PID) - Logs: ai-resume-analyser.log"

echo ""
echo "⏳ Waiting for all services to start..."
echo ""

# Wait for services to start
sleep 10

# Check each service
echo "🔍 CHECKING ALL SERVICES..."
echo ""

# Backend check
if wait_for_service "http://localhost:8001/api/v1/preparation/resources" "Backend API"; then
    BACKEND_STATUS="✅ Running"
else
    BACKEND_STATUS="❌ Failed"
fi

# Frontend check
if wait_for_service "http://localhost:5174" "Frontend Portal"; then
    FRONTEND_STATUS="✅ Running"
else
    FRONTEND_STATUS="❌ Failed"
fi

# AI Career Coach check
if wait_for_service "http://localhost:3001" "AI Career Coach"; then
    CAREER_COACH_STATUS="✅ Running"
else
    CAREER_COACH_STATUS="❌ Failed"
fi

# AI Resume Analyser check
if wait_for_service "http://localhost:5001" "AI Resume Analyser"; then
    RESUME_ANALYSER_STATUS="✅ Running"
else
    RESUME_ANALYSER_STATUS="❌ Failed"
fi

# Display final status
echo ""
echo "🎉 JSS PLACEMENT PORTAL - ALL SERVICES STATUS"
echo "=============================================="
echo ""
echo "📦 Backend Server (8001):      $BACKEND_STATUS"
echo "🎨 Frontend Portal (5174):     $FRONTEND_STATUS"
echo "🤖 AI Career Coach (3001):     $CAREER_COACH_STATUS"
echo "📄 AI Resume Analyser (5001):  $RESUME_ANALYSER_STATUS"
echo ""
echo "🌐 ACCESS LINKS:"
echo "──────────────────────────────────────────────"
echo "📍 Main Portal:         http://localhost:5174/"
echo "📍 Preparation Hub:     http://localhost:5174/preparation"
echo "📍 AI Career Guide:     http://localhost:3001/career-guide"
echo "📍 AI Resume Analyser:  http://localhost:5001/"
echo ""
echo "🔧 BACKEND APIs:"
echo "──────────────────────────────────────────────"
echo "📍 Preparation API:     http://localhost:8001/api/v1/preparation/resources"
echo "📍 Jobs API:            http://localhost:8001/api/v1/job/get"
echo "📍 Companies API:       http://localhost:8001/api/v1/company/get"
echo ""
echo "📋 LOG FILES:"
echo "──────────────────────────────────────────────"
echo "📄 Backend:             placement-portal/backend.log"
echo "📄 Frontend:            placement-portal/frontend.log"
echo "📄 AI Career Coach:     ai-career-coach.log"
echo "📄 AI Resume Analyser:  ai-resume-analyser.log"
echo ""
echo "🎯 FEATURES AVAILABLE:"
echo "──────────────────────────────────────────────"
echo "✅ Student Dashboard & Profile Management"
echo "✅ Job Applications & Placement Drives"
echo "✅ Preparation Resources (19 curated items)"
echo "✅ AI Career Roadmap Generation"
echo "✅ AI Resume Analysis & Optimization"
echo "✅ Company-specific Preparation"
echo "✅ Mock Interviews & Practice Tests"
echo "✅ Progress Tracking & Analytics"
echo ""
echo "💡 To stop all services: Press Ctrl+C"
echo "💡 To view logs: tail -f [log-file-name]"
echo ""
echo "🚀 ALL SERVICES ARE READY! Happy coding! 🎉"

# Keep the script running
while true; do
    sleep 30
    # Check if all processes are still running
    if ! kill -0 $BACKEND_PID 2>/dev/null; then
        echo "⚠️  Backend process died, restarting..."
        cd placement-portal/backend
        npm run dev > ../backend.log 2>&1 &
        BACKEND_PID=$!
        cd ../..
    fi
    
    if ! kill -0 $FRONTEND_PID 2>/dev/null; then
        echo "⚠️  Frontend process died, restarting..."
        cd placement-portal/frontend
        npm run dev > ../frontend.log 2>&1 &
        FRONTEND_PID=$!
        cd ../..
    fi
    
    if ! kill -0 $CAREER_COACH_PID 2>/dev/null; then
        echo "⚠️  AI Career Coach process died, restarting..."
        cd ai-career-coach
        npm run dev > ../ai-career-coach.log 2>&1 &
        CAREER_COACH_PID=$!
        cd ..
    fi
    
    if ! kill -0 $RESUME_ANALYSER_PID 2>/dev/null; then
        echo "⚠️  AI Resume Analyser process died, restarting..."
        cd ai-resume-analyser
        export PORT=5001
        ./start.sh > ../ai-resume-analyser.log 2>&1 &
        RESUME_ANALYSER_PID=$!
        cd ..
    fi
done
