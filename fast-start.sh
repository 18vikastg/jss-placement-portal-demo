#!/bin/bash

# JSS Placement Portal - Core Services Only (Fast Start)
# This script starts Frontend + Backend quickly without AI dependencies

echo "⚡ JSS Placement Portal - Core Services (Fast Start)"
echo "=================================================="

# Colors for better output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to kill process on port
kill_port() {
    lsof -ti :$1 2>/dev/null | xargs kill -9 2>/dev/null || true
}

# Clean up existing processes
echo -e "${BLUE}[INFO]${NC} Cleaning up existing processes..."
kill_port 8001  # Backend
kill_port 5173  # Frontend

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check and install dependencies if needed
echo -e "${BLUE}[INFO]${NC} Checking dependencies..."

# Backend dependencies
cd placement-portal/backend
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}[INFO]${NC} Installing backend dependencies..."
    npm install
fi
cd "$SCRIPT_DIR"

# Frontend dependencies
cd placement-portal/frontend
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}[INFO]${NC} Installing frontend dependencies..."
    npm install
fi
cd "$SCRIPT_DIR"

# Create logs directory
mkdir -p logs

echo -e "${BLUE}[INFO]${NC} Starting Backend Server (Port 8001)..."
cd placement-portal/backend
nohup npm start > "$SCRIPT_DIR/logs/backend.log" 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > "$SCRIPT_DIR/logs/backend.pid"

echo -e "${BLUE}[INFO]${NC} Starting Frontend Server (Port 5173)..."
cd "$SCRIPT_DIR/placement-portal/frontend"
nohup npm run dev > "$SCRIPT_DIR/logs/frontend.log" 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > "$SCRIPT_DIR/logs/frontend.pid"

cd "$SCRIPT_DIR"

# Wait for services to start
echo -e "${BLUE}[INFO]${NC} Waiting for services to start..."
sleep 8

echo ""
echo -e "${CYAN}⚡ JSS PLACEMENT PORTAL - CORE SERVICES READY!${NC}"
echo "=============================================="
echo ""
echo -e "${GREEN}📱 Main Application:${NC} ${BLUE}http://localhost:5173${NC}"
echo -e "   Features: Job Portal, Portfolio Builder, Alumni Network"
echo ""
echo -e "${GREEN}🔧 Backend API:${NC} ${BLUE}http://localhost:8001${NC}"
echo -e "   Features: Authentication, Database, File Upload"
echo ""
echo -e "${YELLOW}👥 Test Account:${NC} patel@gmail.com / patel@gmail.com"
echo ""
echo -e "${CYAN}📋 Available Features:${NC}"
echo -e "   ✅ Job Search & Applications"
echo -e "   ✅ Professional Portfolio Builder (LinkFolio)"
echo -e "   ✅ Alumni Network & Messaging"
echo -e "   ✅ Profile Management"
echo -e "   ✅ Analytics Dashboard"
echo ""
echo -e "${BLUE}💡 Commands:${NC}"
echo -e "   Stop services: ${YELLOW}./stop-all-services.sh${NC}"
echo -e "   Full setup (with AI): ${YELLOW}./start-all-services.sh${NC}"
echo -e "   Check status: ${YELLOW}./check-status.sh${NC}"
echo ""
echo -e "${GREEN}🚀 Ready for development and testing!${NC}"
echo ""

# Keep script running
trap 'echo ""; echo "Stopping services..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; kill_port 8001; kill_port 5173; echo "Services stopped!"; exit 0' SIGINT SIGTERM

echo "Press Ctrl+C to stop all services"
while true; do
    sleep 10
done
