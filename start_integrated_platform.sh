#!/bin/bash

# 🚀 JSS Placement Portal with PrepRoad AI Career Coach Integration
# Complete Startup Script

echo "🎯 Starting JSS Placement Portal + PrepRoad AI Career Coach Integration..."
echo "============================================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Check if all required directories exist
if [ ! -d "placement-portal/frontend" ]; then
    echo -e "${RED}❌ JSS Portal frontend directory not found!${NC}"
    exit 1
fi

if [ ! -d "placement-portal/backend" ]; then
    echo -e "${RED}❌ JSS Portal backend directory not found!${NC}"
    exit 1
fi

if [ ! -d "ai-resume-analyser" ]; then
    echo -e "${RED}❌ AI Resume Analyser directory not found!${NC}"
    exit 1
fi

if [ ! -d "preproad-ai-acarrier-coach" ]; then
    echo -e "${RED}❌ PrepRoad AI Career Coach directory not found!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All service directories found!${NC}"
echo ""

# Function to start services in background
start_service() {
    local service_name="$1"
    local command="$2"
    local port="$3"
    local color="$4"
    
    echo -e "${color}🚀 Starting $service_name on port $port...${NC}"
    eval "$command" &
    local pid=$!
    echo -e "${color}   ├─ PID: $pid${NC}"
    echo -e "${color}   └─ URL: http://localhost:$port${NC}"
    echo ""
}

# Start all services
echo -e "${BLUE}🎬 Starting all services...${NC}"
echo ""

# 1. JSS Backend (Node.js/Express)
start_service "JSS Backend API" \
    "cd placement-portal/backend && npm start" \
    "8001" \
    "${GREEN}"

# 2. JSS Frontend (React/Vite)
start_service "JSS Portal Frontend" \
    "cd placement-portal/frontend && npm run dev" \
    "5173" \
    "${BLUE}"

# 3. AI Resume Analyser (Python/Streamlit)
start_service "AI Resume Analyser" \
    "./start_ai_analyser.sh" \
    "5001" \
    "${YELLOW}"

# 4. PrepRoad AI Career Coach (Next.js)
start_service "PrepRoad AI Career Coach" \
    "cd preproad-ai-acarrier-coach && npm run dev" \
    "3000" \
    "${PURPLE}"

# Wait for services to start
echo -e "${CYAN}⏳ Waiting for services to initialize...${NC}"
sleep 10

echo ""
echo "🎉 JSS Placement Portal + PrepRoad AI Integration is now LIVE!"
echo "============================================================================"
echo -e "${GREEN}📍 Service URLs:${NC}"
echo -e "   🎓 JSS Portal:           ${BLUE}http://localhost:5173${NC}"
echo -e "   ⚙️  Backend API:          ${GREEN}http://localhost:8001${NC}"
echo -e "   🤖 AI Resume Analyser:   ${YELLOW}http://localhost:5001${NC}"
echo -e "   🚀 PrepRoad Career Coach: ${PURPLE}http://localhost:3000${NC}"
echo ""
echo -e "${CYAN}🎯 Integration Features:${NC}"
echo "   ✅ Student Dashboard with PrepRoad integration"
echo "   ✅ AI Career Guide & Roadmaps"
echo "   ✅ AI Resume Builder"
echo "   ✅ Interview Preparation Tools"
echo "   ✅ Cover Letter Generator"
echo "   ✅ AI Resume Analysis (Python)"
echo ""
echo -e "${YELLOW}⚡ Quick Start:${NC}"
echo "   1. Open JSS Portal: http://localhost:5173"
echo "   2. Login as a student"
echo "   3. Access PrepRoad features from dashboard"
echo "   4. Enjoy the complete career coaching platform!"
echo ""
echo -e "${RED}🛑 To stop all services: Press Ctrl+C${NC}"
echo ""

# Keep script running and show real-time status
while true; do
    echo -e "${CYAN}💡 All services running... $(date '+%H:%M:%S')${NC}"
    sleep 30
done
