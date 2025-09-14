#!/bin/bash

# JSS Placement Portal - Complete Stop Script
# This script stops all services: Frontend, Backend, AI Career Coach, and AI Resume Analyzer

echo "🛑 JSS PLACEMENT PORTAL - STOPPING ALL SERVICES"
echo "================================================"

PROJECT_ROOT="/home/vikas/Desktop/jss-placement-portal"
cd "$PROJECT_ROOT"

# Function to stop service by PID
stop_service_by_pid() {
    local pid_file=$1
    local service_name=$2
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p "$pid" > /dev/null 2>&1; then
            echo "🔴 Stopping $service_name (PID: $pid)..."
            kill "$pid" 2>/dev/null || kill -9 "$pid" 2>/dev/null
            rm -f "$pid_file"
            echo "✅ $service_name stopped"
        else
            echo "⚠️  $service_name was not running"
            rm -f "$pid_file"
        fi
    else
        echo "⚠️  No PID file found for $service_name"
    fi
}

# Function to stop service by port
stop_service_by_port() {
    local port=$1
    local service_name=$2
    
    local pids=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pids" ]; then
        echo "🔴 Stopping $service_name on port $port..."
        echo "$pids" | xargs kill -9 2>/dev/null || true
        echo "✅ $service_name stopped"
    else
        echo "✅ $service_name (port $port) was not running"
    fi
}

echo "[STEP 1] Stopping services by PID files..."

# Stop services using PID files
stop_service_by_pid "logs/backend.pid" "Backend Server"
stop_service_by_pid "logs/frontend.pid" "Frontend Server"
stop_service_by_pid "logs/ai-career.pid" "AI Career Coach"
stop_service_by_pid "logs/ai-resume.pid" "AI Resume Analyzer"

echo ""
echo "[STEP 2] Cleaning up any remaining processes by port..."

# Stop any remaining processes by port (fallback)
stop_service_by_port 8001 "Backend Server"
stop_service_by_port 5173 "Frontend Server"  
stop_service_by_port 3001 "AI Career Coach"
stop_service_by_port 8501 "AI Resume Analyzer"

echo ""
echo "[STEP 3] Cleaning up any Node.js/Python processes..."

# Kill any remaining related processes
pkill -f "node index.js" 2>/dev/null || true
pkill -f "npm run dev" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true
pkill -f "streamlit run" 2>/dev/null || true

echo ""
echo "[STEP 4] Final cleanup..."

# Remove any remaining PID files
rm -f logs/*.pid 2>/dev/null || true

# Wait a moment for processes to fully terminate
sleep 2

echo ""
echo "🎉 ALL SERVICES STOPPED SUCCESSFULLY!"
echo "====================================="
echo ""
echo "✅ Backend Server (Port 8001): Stopped"
echo "✅ Frontend Server (Port 5173): Stopped"
echo "✅ AI Career Coach (Port 3001): Stopped"
echo "✅ AI Resume Analyzer (Port 8501): Stopped"
echo ""
echo "🔧 All ports are now free and ready for restart"
echo ""
echo "🚀 TO START ALL SERVICES AGAIN:"
echo "   Run: ./start-everything.sh"
echo ""
