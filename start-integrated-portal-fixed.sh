#!/bin/bash

# JSS Placement Portal - Corrected Integrated Startup Script
# This script starts both the main placement portal and AI Career Coach system

echo "🚀 Starting JSS Placement Portal with AI Career Coach Integration..."
echo "================================================================="

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use"
        return 1
    else
        echo "✅ Port $1 is available"
        return 0
    fi
}

# Check if we're in the right directory
if [[ ! -d "placement-portal" ]] || [[ ! -d "ai-career-coach" ]]; then
    echo "❌ Error: Please run this script from the jss-placement-portal directory"
    echo "   Expected structure:"
    echo "   - placement-portal/"
    echo "   - ai-career-coach/"
    exit 1
fi

echo "📍 Current directory: $(pwd)"

# Kill any existing processes
echo "🧹 Cleaning up existing processes..."
pkill -f "npm run dev" 2>/dev/null || true
pkill -f "nodemon" 2>/dev/null || true
sleep 2

# Start Backend (Node.js) - Port 8001
echo ""
echo "🔧 Starting Backend on port 8001..."
cd "placement-portal/backend"
if check_port 8001; then
    echo "   📁 Directory: $(pwd)"
    npm run dev > backend.log 2>&1 &
    BACKEND_PID=$!
    echo "   ✅ Backend started with PID: $BACKEND_PID"
    sleep 3
    if kill -0 $BACKEND_PID 2>/dev/null; then
        echo "   ✅ Backend is running successfully"
    else
        echo "   ❌ Backend failed to start - check backend.log"
    fi
fi
cd ../..

# Start Frontend (Vite React) - Port 5173
echo ""
echo "🔧 Starting Frontend on port 5173..."
cd "placement-portal/frontend"
if check_port 5173; then
    echo "   📁 Directory: $(pwd)"
    npm run dev > frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo "   ✅ Frontend started with PID: $FRONTEND_PID"
    sleep 3
    if kill -0 $FRONTEND_PID 2>/dev/null; then
        echo "   ✅ Frontend is running successfully"
    else
        echo "   ❌ Frontend failed to start - check frontend.log"
    fi
fi
cd ../..

# Start AI Career Coach (Next.js) - Port 3001
echo ""
echo "🔧 Starting AI Career Coach on port 3001..."
cd "ai-career-coach"
if check_port 3001; then
    echo "   📁 Directory: $(pwd)"
    npm run dev > ai-career-coach.log 2>&1 &
    AI_PID=$!
    echo "   ✅ AI Career Coach started with PID: $AI_PID"
    sleep 5
    if kill -0 $AI_PID 2>/dev/null; then
        echo "   ✅ AI Career Coach is running successfully"
    else
        echo "   ❌ AI Career Coach failed to start - check ai-career-coach.log"
    fi
fi
cd ..

echo ""
echo "🎉 All services started successfully!"
echo "================================================================="
echo "📱 Access your applications:"
echo "   🌐 Main Placement Portal: http://localhost:5173"
echo "   🤖 AI Career Coach: http://localhost:3001"
echo "   🔧 Backend API: http://localhost:8001"
echo ""
echo "📋 Service Management:"
echo "   📊 View backend logs: tail -f placement-portal/backend/backend.log"
echo "   📊 View frontend logs: tail -f placement-portal/frontend/frontend.log"
echo "   📊 View AI logs: tail -f ai-career-coach/ai-career-coach.log"
echo "   🛑 Stop all: pkill -f 'npm run dev'"
echo "   🔍 Check status: ps aux | grep 'npm run dev'"
echo ""
echo "💡 The student dashboard now includes integrated AI Career Coach tools!"
echo "   Students can access all AI features directly from the main portal."

# Function to handle cleanup on script exit
cleanup() {
    echo ""
    echo "🛑 Shutting down services..."
    pkill -f "npm run dev"
    pkill -f "nodemon"
    echo "✅ All services stopped"
}

# Set trap to cleanup on script exit
trap cleanup EXIT

# Keep script running to monitor services
echo ""
echo "🔄 Monitoring services... (Press Ctrl+C to stop all services)"
echo "================================================================="

while true; do
    sleep 10
    
    # Check if services are still running
    if ! pgrep -f "npm run dev\|nodemon" > /dev/null; then
        echo "⚠️  No services detected running. Exiting..."
        break
    fi
done
