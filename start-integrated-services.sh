#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     JSS Placement Portal - Complete Services Startup      ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Function to check if port is in use
check_port() {
    lsof -i:$1 > /dev/null 2>&1
    return $?
}

# Kill processes on specific ports if they exist
echo -e "${YELLOW}🧹 Cleaning up existing processes...${NC}"
for port in 8001 5173 3001 5001; do
    if check_port $port; then
        echo -e "${YELLOW}   Stopping process on port $port${NC}"
        fuser -k $port/tcp 2>/dev/null
        sleep 1
    fi
done

echo -e "${GREEN}✅ Cleanup complete${NC}"
echo ""

# Start services in the background
echo -e "${BLUE}🚀 Starting all services...${NC}"
echo ""

# 1. Start Main Backend
echo -e "${GREEN}[1/4] Starting Main Backend (Port 8001)...${NC}"
cd /home/vikas/Desktop/Projects/jss-placement-portal/placement-portal/backend
node index.js > ../../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}   ✓ Backend PID: $BACKEND_PID${NC}"
sleep 3

# 2. Start Main Frontend
echo -e "${GREEN}[2/4] Starting Main Frontend (Port 5173)...${NC}"
cd /home/vikas/Desktop/Projects/jss-placement-portal/placement-portal/frontend
npm run dev > ../../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}   ✓ Frontend PID: $FRONTEND_PID${NC}"
sleep 3

# 3. Start AI Career Coach
echo -e "${GREEN}[3/4] Starting AI Career Coach (Port 3001)...${NC}"
cd /home/vikas/Desktop/Projects/jss-placement-portal/ai-career-coach
npm run dev > ../logs/ai-career-coach.log 2>&1 &
CAREER_COACH_PID=$!
echo -e "${GREEN}   ✓ AI Career Coach PID: $CAREER_COACH_PID${NC}"
sleep 5

# 4. Start AI Resume Analyzer (optional - manual start recommended)
echo -e "${YELLOW}[4/4] AI Resume Analyzer${NC}"
echo -e "${YELLOW}   ⚠️  The AI Resume Analyzer (Python/Streamlit) needs to be started manually:${NC}"
echo -e "${YELLOW}   📝 Run: cd ai-resume-analyser && streamlit run App/App.py --server.port 5001${NC}"
echo ""

# Create logs directory if it doesn't exist
mkdir -p /home/vikas/Desktop/Projects/jss-placement-portal/logs

# Save PIDs to file for cleanup later
echo "$BACKEND_PID" > /home/vikas/Desktop/Projects/jss-placement-portal/logs/pids.txt
echo "$FRONTEND_PID" >> /home/vikas/Desktop/Projects/jss-placement-portal/logs/pids.txt
echo "$CAREER_COACH_PID" >> /home/vikas/Desktop/Projects/jss-placement-portal/logs/pids.txt

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}           ✨ All Services Started Successfully! ✨${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}📍 Service URLs:${NC}"
echo -e "   ${GREEN}🌐 Main Portal:${NC}      http://localhost:5173"
echo -e "   ${GREEN}🔧 Backend API:${NC}      http://localhost:8001"
echo -e "   ${GREEN}🎯 Career Coach:${NC}     http://localhost:3001"
echo -e "   ${GREEN}📄 Resume Analyzer:${NC}  http://localhost:5001 ${YELLOW}(manual start)${NC}"
echo ""
echo -e "${BLUE}🔐 Login Credentials:${NC}"
echo -e "   ${GREEN}👨‍🎓 Student:${NC}"
echo -e "      Email:    vikastg2000@gmail.com"
echo -e "      Password: @Vikas123"
echo ""
echo -e "   ${GREEN}👨‍🏫 Faculty:${NC}"
echo -e "      Email:    faculty@jssateb.ac.in"
echo -e "      Password: faculty123"
echo ""
echo -e "   ${GREEN}👔 Recruiter:${NC}"
echo -e "      Email:    recruiter@company.com"
echo -e "      Password: recruiter123"
echo ""
echo -e "${BLUE}📋 Features Available:${NC}"
echo -e "   ✅ Job Portal & Applications"
echo -e "   ✅ Student Dashboard"
echo -e "   ✅ Mock Interviews"
echo -e "   ✅ Preparation Hub"
echo -e "   ✅ Career Guide & Roadmaps ${GREEN}(External - Port 3001)${NC}"
echo -e "   ✅ Resume Analysis ${YELLOW}(External - Port 5001)${NC}"
echo -e "   ✅ LinkFolio Networking"
echo -e "   ✅ Placement Analytics"
echo ""
echo -e "${YELLOW}📝 To view logs:${NC}"
echo -e "   Backend:       tail -f logs/backend.log"
echo -e "   Frontend:      tail -f logs/frontend.log"
echo -e "   Career Coach:  tail -f logs/ai-career-coach.log"
echo ""
echo -e "${YELLOW}🛑 To stop all services:${NC}"
echo -e "   Run: ./stop-all-services.sh"
echo ""
echo -e "${GREEN}✨ Portal is ready! Open http://localhost:5173 in your browser${NC}"
echo ""

# Wait for user to stop services
echo -e "${YELLOW}Press Ctrl+C to stop all services...${NC}"
wait
