#!/bin/bash

# JSS Placement Portal - Integrated Startup Script
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

# Function to start a service in the background
start_service() {
    local service_name=$1
    local directory=$2
    local port=$3
    local command=$4
    
    echo ""
    echo "🔧 Starting $service_name on port $port..."
    echo "   Directory: $directory"
    echo "   Command: $command"
    
    if check_port $port; then
        # Use absolute path
        local abs_dir="/home/vikas/Desktop/jss-placement-portal/$directory"
        cd "$abs_dir"
        echo "   📁 Changed to directory: $(pwd)"
        
        # Start the service in background
        nohup $command > "${service_name,,}.log" 2>&1 &
        local pid=$!
        echo "   ✅ $service_name started with PID: $pid"
        echo "   📋 Logs: ${abs_dir}/${service_name,,}.log"
        
        # Wait a moment and check if service is still running
        sleep 3
        if kill -0 $pid 2>/dev/null; then
            echo "   ✅ $service_name is running successfully"
        else
            echo "   ❌ $service_name failed to start"
            echo "   📋 Check logs: cat ${abs_dir}/${service_name,,}.log"
            return 1
        fi
        
        # Return to original directory
        cd "/home/vikas/Desktop/jss-placement-portal"
    else
        echo "   ⏭️  Skipping $service_name (port already in use)"
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
echo "📂 Found directories:"
ls -la | grep "^d" | grep -E "(placement-portal|ai-career-coach)"

# Start Backend (Node.js) - Port 8000
start_service "Backend" "placement-portal/backend" 8000 "npm run dev"

# Start Frontend (Vite React) - Port 5174
start_service "Frontend" "placement-portal/frontend" 5174 "npm run dev"

# Start AI Career Coach (Next.js) - Port 3001
start_service "AI-Career-Coach" "ai-career-coach" 3001 "npm run dev"

echo ""
echo "🎉 All services started successfully!"
echo "================================================================="
echo "📱 Access your applications:"
echo "   🌐 Main Placement Portal: http://localhost:5174"
echo "   🤖 AI Career Coach: http://localhost:3001"
echo "   🔧 Backend API: http://localhost:8000"
echo ""
echo "📋 Service Management:"
echo "   📊 View logs: tail -f *.log"
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
    if ! pgrep -f "npm run dev" > /dev/null; then
        echo "⚠️  No services detected running. Exiting..."
        break
    fi
done
