#!/bin/bash

# JSS Placement Portal - Stop All Services Script
# This script stops all running services: Frontend, Backend, and AI Resume Analyzer

echo "🛑 JSS Placement Portal - Stopping All Services"
echo "================================================"

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

# Function to check if a port is in use
port_in_use() {
    lsof -i :$1 >/dev/null 2>&1
}

# Function to kill process on port
kill_port() {
    if port_in_use $1; then
        print_status "Stopping service on port $1..."
        lsof -ti :$1 | xargs kill -9 2>/dev/null || true
        sleep 1
        if port_in_use $1; then
            print_warning "Force killing processes on port $1..."
            lsof -ti :$1 | xargs kill -9 2>/dev/null || true
        else
            print_success "Service on port $1 stopped"
        fi
    else
        print_status "No service running on port $1"
    fi
}

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

print_status "Stopping all JSS Placement Portal services..."

# Stop services using PID files if they exist
if [ -f "logs/backend.pid" ]; then
    BACKEND_PID=$(cat logs/backend.pid)
    print_status "Stopping Backend Server (PID: $BACKEND_PID)..."
    kill $BACKEND_PID 2>/dev/null || true
    rm -f logs/backend.pid
fi

if [ -f "logs/frontend.pid" ]; then
    FRONTEND_PID=$(cat logs/frontend.pid)
    print_status "Stopping Frontend Server (PID: $FRONTEND_PID)..."
    kill $FRONTEND_PID 2>/dev/null || true
    rm -f logs/frontend.pid
fi

if [ -f "logs/ai-analyzer.pid" ]; then
    AI_PID=$(cat logs/ai-analyzer.pid)
    print_status "Stopping AI Resume Analyzer (PID: $AI_PID)..."
    kill $AI_PID 2>/dev/null || true
    rm -f logs/ai-analyzer.pid
fi

# Kill any remaining processes on our ports
print_status "Cleaning up processes on ports..."
kill_port 8001  # Backend
kill_port 5173  # Frontend
kill_port 5174  # Frontend alternative
kill_port 5175  # Frontend alternative
kill_port 8501  # AI Resume Analyzer

# Kill any node processes related to our project
print_status "Cleaning up any remaining Node.js processes..."
pkill -f "npm.*start" 2>/dev/null || true
pkill -f "npm.*dev" 2>/dev/null || true
pkill -f "node.*server" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true

# Kill any Streamlit processes
print_status "Cleaning up Streamlit processes..."
pkill -f "streamlit" 2>/dev/null || true

# Wait a moment for cleanup
sleep 2

# Verify all services are stopped
echo ""
print_status "Verifying all services are stopped..."

if port_in_use 8001; then
    print_warning "Backend port 8001 still in use"
else
    print_success "✅ Backend stopped (Port 8001)"
fi

if port_in_use 5173; then
    print_warning "Frontend port 5173 still in use"
else
    print_success "✅ Frontend stopped (Port 5173)"
fi

if port_in_use 8501; then
    print_warning "AI Analyzer port 8501 still in use"
else
    print_success "✅ AI Resume Analyzer stopped (Port 8501)"
fi

echo ""
print_success "🎉 All JSS Placement Portal services have been stopped!"
echo ""
print_status "To start all services again, run: ./start-all-services.sh"
echo ""
