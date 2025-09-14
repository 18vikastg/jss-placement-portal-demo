#!/bin/bash

# JSS Placement Portal - Service Status Check Script
# This script checks the status of all services

echo "📊 JSS Placement Portal - Service Status Check"
echo "==============================================="

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to check if a port is in use
port_in_use() {
    lsof -i :$1 >/dev/null 2>&1
}

# Function to get process info for port
get_process_info() {
    lsof -ti :$1 2>/dev/null | head -1
}

# Function to check service health
check_service() {
    local port=$1
    local name=$2
    local url=$3
    
    if port_in_use $port; then
        local pid=$(get_process_info $port)
        if curl -s "$url" >/dev/null 2>&1; then
            echo -e "   ${GREEN}✅ $name${NC} - Running (PID: $pid) - ${BLUE}$url${NC}"
        else
            echo -e "   ${YELLOW}⚠️  $name${NC} - Port occupied but service not responding (PID: $pid)"
        fi
    else
        echo -e "   ${RED}❌ $name${NC} - Not running"
    fi
}

echo ""
echo -e "${CYAN}🔍 Checking Service Status...${NC}"
echo ""

# Check Backend Server
check_service 8001 "Backend Server (Node.js/Express)" "http://localhost:8001"

# Check Frontend Server
check_service 5173 "Frontend Server (React/Vite)" "http://localhost:5173"

# Check AI Resume Analyzer
check_service 8501 "AI Resume Analyzer (Streamlit)" "http://localhost:8501"

echo ""

# Check for any other common development ports
echo -e "${BLUE}📋 Other Development Ports:${NC}"
for port in 3000 3001 5174 5175 8000 8080; do
    if port_in_use $port; then
        local pid=$(get_process_info $port)
        echo -e "   ${YELLOW}ℹ️  Port $port${NC} - In use (PID: $pid)"
    fi
done

echo ""

# Show system resource usage
echo -e "${BLUE}💻 System Resource Usage:${NC}"
echo -e "   Memory: $(free -h | awk '/^Mem:/ { print $3 "/" $2 " (" int($3/$2 * 100) "% used)" }')"
echo -e "   CPU Load: $(uptime | awk -F'load average:' '{ print $2 }' | sed 's/^[ \t]*//')"

echo ""

# Check if log files exist and show recent activity
if [ -d "logs" ]; then
    echo -e "${BLUE}📁 Recent Log Activity:${NC}"
    
    if [ -f "logs/backend.log" ]; then
        echo -e "   Backend: $(tail -1 logs/backend.log 2>/dev/null | cut -c1-80)..."
    fi
    
    if [ -f "logs/frontend.log" ]; then
        echo -e "   Frontend: $(tail -1 logs/frontend.log 2>/dev/null | cut -c1-80)..."
    fi
    
    if [ -f "logs/ai-analyzer.log" ]; then
        echo -e "   AI Analyzer: $(tail -1 logs/ai-analyzer.log 2>/dev/null | cut -c1-80)..."
    fi
fi

echo ""

# Show running Node.js and Python processes related to our project
echo -e "${BLUE}🔧 Related Processes:${NC}"
echo -e "${YELLOW}Node.js processes:${NC}"
ps aux | grep -E "(node|npm)" | grep -v grep | head -5 | awk '{print "   " $2 " - " $11 " " $12 " " $13}'

echo -e "${YELLOW}Python/Streamlit processes:${NC}"
ps aux | grep -E "(python|streamlit)" | grep -v grep | head -5 | awk '{print "   " $2 " - " $11 " " $12 " " $13}'

echo ""
echo -e "${CYAN}💡 Quick Commands:${NC}"
echo -e "   Start all services: ${GREEN}./start-all-services.sh${NC}"
echo -e "   Stop all services:  ${RED}./stop-all-services.sh${NC}"
echo -e "   Check status:       ${BLUE}./check-status.sh${NC}"

echo ""
