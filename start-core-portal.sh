#!/bin/bash

# JSS Placement Portal - Core Services One-Command Startup
# Starts the three main services: Frontend, Backend, and AI Career Coach

echo "🚀 JSS PLACEMENT PORTAL - CORE SERVICES STARTUP"
echo "==============================================="
echo ""

# Set project root
PROJECT_ROOT="/home/vikas/Desktop/jss-placement-portal"
cd "$PROJECT_ROOT"

# Create logs directory
mkdir -p logs

# Function to cleanup existing processes on ports
cleanup_port() {
    local port=$1
    local service_name=$2
    
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "⚠️  Cleaning up existing $service_name on port $port..."
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
        sleep 2
    fi
}

# Function to wait for service
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=20
    local attempt=1
    
    echo -n "⏳ Waiting for $service_name to be ready"
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" > /dev/null 2>&1; then
            echo " ✅"
            return 0
        fi
        echo -n "."
        sleep 2
        attempt=$((attempt + 1))
    done
    echo " ❌ Failed to start"
    return 1
}

echo "[STEP 1] Cleaning up existing processes..."
cleanup_port 8001 "Backend API"
cleanup_port 3001 "AI Career Coach" 
cleanup_port 5173 "Frontend"

echo ""
echo "[STEP 2] Starting Backend API Server (Port 8001)..."
cd "$PROJECT_ROOT/placement-portal/backend"
nohup node index.js > "$PROJECT_ROOT/logs/backend.log" 2>&1 &
BACKEND_PID=$!
echo "✅ Backend started with PID: $BACKEND_PID"

echo ""
echo "[STEP 3] Starting AI Career Coach (Port 3001)..."
cd "$PROJECT_ROOT/ai-career-coach"
nohup npm run dev > "$PROJECT_ROOT/logs/ai-career-coach.log" 2>&1 &
AI_CAREER_PID=$!
echo "✅ AI Career Coach started with PID: $AI_CAREER_PID"

echo ""
echo "[STEP 4] Starting Frontend Portal (Port 5173)..."
cd "$PROJECT_ROOT/placement-portal/frontend"
nohup npx vite > "$PROJECT_ROOT/logs/frontend.log" 2>&1 &
FRONTEND_PID=$!
echo "✅ Frontend started with PID: $FRONTEND_PID"

echo ""
echo "[STEP 5] Waiting for all services to be ready..."
echo "This may take 30-60 seconds..."
sleep 10

# Check each service
wait_for_service "http://localhost:8001" "Backend API"
wait_for_service "http://localhost:3001" "AI Career Coach"  
wait_for_service "http://localhost:5173" "Frontend Portal"

echo ""
echo "🎉 ALL CORE SERVICES STARTED SUCCESSFULLY!"
echo "=========================================="
echo ""
echo "🌐 MAIN PORTAL: http://localhost:5173"
echo "   📋 Complete placement portal with student dashboard"
echo ""
echo "🤖 AI CAREER COACH: http://localhost:3001"
echo "   📋 AI-powered career roadmaps and guidance"
echo ""
echo "🔧 BACKEND API: http://localhost:8001"
echo "   📋 Database and authentication services"
echo ""
echo "📊 SERVICE STATUS:"
echo "   ✅ Backend API (PID: $BACKEND_PID) - Port 8001"
echo "   ✅ AI Career Coach (PID: $AI_CAREER_PID) - Port 3001"
echo "   ✅ Frontend Portal (PID: $FRONTEND_PID) - Port 5173"
echo ""
echo "📁 LOG FILES:"
echo "   Backend: $PROJECT_ROOT/logs/backend.log"
echo "   AI Career Coach: $PROJECT_ROOT/logs/ai-career-coach.log"
echo "   Frontend: $PROJECT_ROOT/logs/frontend.log"
echo ""

# Save PIDs for cleanup
echo "$BACKEND_PID" > "$PROJECT_ROOT/logs/backend.pid"
echo "$AI_CAREER_PID" > "$PROJECT_ROOT/logs/ai-career.pid"
echo "$FRONTEND_PID" > "$PROJECT_ROOT/logs/frontend.pid"

echo "🛑 TO STOP ALL SERVICES:"
echo "   pkill -f 'node index.js|npm run dev|npx vite'"
echo "   Or kill PIDs: kill $BACKEND_PID $AI_CAREER_PID $FRONTEND_PID"
echo ""
echo "🚀 ALL SERVICES RUNNING IN BACKGROUND!"
echo "You can now close this terminal safely."
echo ""