#!/bin/bash

# JSS Placement Portal - Complete System Startup Script
# This script starts all services: Frontend, Backend, and AI Resume Analyzer

echo "🎓 JSS Placement Portal - Starting All Services"
echo "=================================================="

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${PURPLE}[STEP]${NC} $1"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if a port is in use
port_in_use() {
    lsof -i :$1 >/dev/null 2>&1
}

# Function to kill process on port
kill_port() {
    if port_in_use $1; then
        print_warning "Port $1 is in use. Killing existing process..."
        lsof -ti :$1 | xargs kill -9 2>/dev/null || true
        sleep 2
    fi
}

# Function to wait for service to be ready
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=30
    local attempt=1
    
    print_status "Waiting for $service_name to be ready..."
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" >/dev/null 2>&1; then
            print_success "$service_name is ready!"
            return 0
        fi
        echo -n "."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    print_error "$service_name failed to start within expected time"
    return 1
}

# Check prerequisites
print_step "1. Checking Prerequisites"

if ! command_exists node; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

if ! command_exists npm; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

if ! command_exists python3; then
    print_error "Python 3 is not installed. Please install Python 3.11+ first."
    exit 1
fi

if ! command_exists pip; then
    print_error "pip is not installed. Please install pip first."
    exit 1
fi

print_success "All prerequisites are installed"

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

print_status "Working directory: $SCRIPT_DIR"

# Clean up any existing processes on our ports
print_step "2. Cleaning Up Existing Processes"
kill_port 8001  # Backend
kill_port 5173  # Frontend
kill_port 5174  # Frontend alternative
kill_port 5175  # Frontend alternative
kill_port 8501  # AI Resume Analyzer

# Check if directories exist
print_step "3. Verifying Project Structure"

if [ ! -d "placement-portal/backend" ]; then
    print_error "Backend directory not found!"
    exit 1
fi

if [ ! -d "placement-portal/frontend" ]; then
    print_error "Frontend directory not found!"
    exit 1
fi

if [ ! -d "ai-resume-analyser/App" ]; then
    print_error "AI Resume Analyzer directory not found!"
    exit 1
fi

print_success "Project structure verified"

# Install dependencies if needed
print_step "4. Installing Dependencies (if needed)"

# Backend dependencies
print_status "Checking backend dependencies..."
cd placement-portal/backend
if [ ! -d "node_modules" ]; then
    print_status "Installing backend dependencies..."
    npm install
fi
cd "$SCRIPT_DIR"

# Frontend dependencies
print_status "Checking frontend dependencies..."
cd placement-portal/frontend
if [ ! -d "node_modules" ]; then
    print_status "Installing frontend dependencies..."
    npm install
fi
cd "$SCRIPT_DIR"

# AI dependencies
print_status "Checking AI Resume Analyzer dependencies..."
cd ai-resume-analyser/App
if [ ! -f ".deps_installed" ]; then
    print_status "Installing AI dependencies..."
    pip install -r requirements.txt
    python -m spacy download en_core_web_sm
    touch .deps_installed
fi
cd "$SCRIPT_DIR"

print_success "All dependencies verified"

# Create log directory
mkdir -p logs

# Start Backend Server
print_step "5. Starting Backend Server (Port 8001)"
cd placement-portal/backend
print_status "Starting Node.js/Express backend..."
nohup npm start > "$SCRIPT_DIR/logs/backend.log" 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > "$SCRIPT_DIR/logs/backend.pid"
cd "$SCRIPT_DIR"

# Wait for backend to be ready
if wait_for_service "http://localhost:8001" "Backend Server"; then
    print_success "✅ Backend Server is running on http://localhost:8001"
else
    print_error "❌ Backend Server failed to start"
    exit 1
fi

# Start Frontend Development Server
print_step "6. Starting Frontend Development Server (Port 5173)"
cd placement-portal/frontend
print_status "Starting React/Vite frontend..."
nohup npm run dev > "$SCRIPT_DIR/logs/frontend.log" 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > "$SCRIPT_DIR/logs/frontend.pid"
cd "$SCRIPT_DIR"

# Wait for frontend to be ready
sleep 5  # Give Vite some time to start
if wait_for_service "http://localhost:5173" "Frontend Server"; then
    print_success "✅ Frontend Server is running on http://localhost:5173"
else
    print_error "❌ Frontend Server failed to start"
fi

# Start AI Resume Analyzer
print_step "7. Starting AI Resume Analyzer (Port 8501)"
cd ai-resume-analyser/App
print_status "Starting Streamlit AI dashboard..."
nohup python3 -m streamlit run App.py --server.port 8501 --server.headless true --server.address 0.0.0.0 > "$SCRIPT_DIR/logs/ai-analyzer.log" 2>&1 &
AI_PID=$!
echo $AI_PID > "$SCRIPT_DIR/logs/ai-analyzer.pid"
cd "$SCRIPT_DIR"

# Wait for AI service to be ready
if wait_for_service "http://localhost:8501" "AI Resume Analyzer"; then
    print_success "✅ AI Resume Analyzer is running on http://localhost:8501"
else
    print_warning "⚠️  AI Resume Analyzer may take longer to start"
fi

# Display running services
print_step "8. Service Status Summary"
echo ""
echo -e "${CYAN}🎉 JSS PLACEMENT PORTAL - ALL SERVICES RUNNING!${NC}"
echo "==============================================="
echo ""
echo -e "${GREEN}📱 Main Application (Frontend):${NC}"
echo -e "   🌐 URL: ${BLUE}http://localhost:5173${NC}"
echo -e "   📋 Features: Portfolio Builder, Job Portal, Alumni Network"
echo ""
echo -e "${GREEN}🔧 Backend API Server:${NC}"
echo -e "   🌐 URL: ${BLUE}http://localhost:8001${NC}"
echo -e "   📋 Features: Authentication, Database, File Upload"
echo ""
echo -e "${GREEN}🤖 AI Resume Analyzer:${NC}"
echo -e "   🌐 URL: ${BLUE}http://localhost:8501${NC}"
echo -e "   📋 Features: Resume Analysis, Career Insights, AI Recommendations"
echo ""
echo -e "${YELLOW}👥 Test Accounts:${NC}"
echo -e "   👨‍🎓 ${CYAN}Student:${NC} patel@gmail.com / patel@gmail.com"
echo -e "   🏢 ${CYAN}Recruiter:${NC} recruiter@company.com / recruiter123"
echo -e "   👨‍🏫 ${CYAN}Faculty:${NC} faculty@jssateb.ac.in / faculty123"
echo -e "   🔧 ${CYAN}AI Admin:${NC} admin / admin@resume-analyzer"
echo ""
echo -e "${PURPLE}📊 Key Features Available:${NC}"
echo -e "   ✅ Job Search & Applications"
echo -e "   ✅ AI-Powered Resume Analysis"
echo -e "   ✅ Professional Portfolio Builder (LinkFolio)"
echo -e "   ✅ Alumni Network & Messaging"
echo -e "   ✅ Real-time Notifications"
echo -e "   ✅ Analytics Dashboard"
echo ""
echo -e "${BLUE}📝 Process Information:${NC}"
echo -e "   Backend PID: $BACKEND_PID (Port 8001)"
echo -e "   Frontend PID: $FRONTEND_PID (Port 5173)"
echo -e "   AI Analyzer PID: $AI_PID (Port 8501)"
echo ""
echo -e "${GREEN}📁 Log Files:${NC}"
echo -e "   Backend: $SCRIPT_DIR/logs/backend.log"
echo -e "   Frontend: $SCRIPT_DIR/logs/frontend.log"
echo -e "   AI Analyzer: $SCRIPT_DIR/logs/ai-analyzer.log"
echo ""
echo -e "${YELLOW}🛑 To Stop All Services:${NC} Run ./stop-all-services.sh"
echo ""
echo -e "${CYAN}🚀 Ready for Development and Testing!${NC}"
echo "==============================================="

# Keep script running to monitor services
print_status "Monitoring services... Press Ctrl+C to stop all services"

# Trap Ctrl+C to cleanup
cleanup() {
    echo ""
    print_warning "Shutting down all services..."
    
    if [ -f "$SCRIPT_DIR/logs/backend.pid" ]; then
        kill $(cat "$SCRIPT_DIR/logs/backend.pid") 2>/dev/null || true
        rm -f "$SCRIPT_DIR/logs/backend.pid"
    fi
    
    if [ -f "$SCRIPT_DIR/logs/frontend.pid" ]; then
        kill $(cat "$SCRIPT_DIR/logs/frontend.pid") 2>/dev/null || true
        rm -f "$SCRIPT_DIR/logs/frontend.pid"
    fi
    
    if [ -f "$SCRIPT_DIR/logs/ai-analyzer.pid" ]; then
        kill $(cat "$SCRIPT_DIR/logs/ai-analyzer.pid") 2>/dev/null || true
        rm -f "$SCRIPT_DIR/logs/ai-analyzer.pid"
    fi
    
    # Kill any remaining processes on our ports
    kill_port 8001
    kill_port 5173
    kill_port 8501
    
    print_success "All services stopped successfully!"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Monitor services and keep script alive
while true; do
    sleep 10
    
    # Check if services are still running
    if ! port_in_use 8001; then
        print_error "Backend server stopped unexpectedly!"
    fi
    
    if ! port_in_use 5173; then
        print_error "Frontend server stopped unexpectedly!"
    fi
    
    if ! port_in_use 8501; then
        print_warning "AI Resume Analyzer may have stopped"
    fi
done
