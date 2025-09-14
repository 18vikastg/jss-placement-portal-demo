#!/bin/bash

# JSS Placement Portal - Help & Commands Guide

echo "🎓 JSS Placement Portal - Available Commands"
echo "=============================================="
echo ""

# Colors for better output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${CYAN}📋 AVAILABLE SCRIPTS:${NC}"
echo ""

echo -e "${GREEN}🔧 Setup Scripts:${NC}"
echo -e "   ${BLUE}./complete-setup.sh${NC}     - Complete project setup from scratch"
echo -e "                              Installs all dependencies, configures environment"
echo ""

echo -e "${GREEN}🚀 Launch Scripts:${NC}"
echo -e "   ${BLUE}./fast-start.sh${NC}         - Quick start (Frontend + Backend)"
echo -e "                              ⚡ Starts in ~10 seconds"
echo -e "   ${BLUE}./start-all-services.sh${NC} - Complete setup with AI features"
echo -e "                              🤖 Starts in ~2 minutes"
echo ""

echo -e "${GREEN}🛑 Control Scripts:${NC}"
echo -e "   ${BLUE}./stop-all-services.sh${NC}  - Stop all running services"
echo -e "   ${BLUE}./check-status.sh${NC}       - Check service status and health"
echo ""

echo -e "${GREEN}📖 Information:${NC}"
echo -e "   ${BLUE}./help.sh${NC}               - Show this help guide"
echo -e "   ${BLUE}./test-ai-analyzer.sh${NC}   - Test AI Resume Analyzer functionality"
echo ""

echo -e "${CYAN}🌐 ACCESS URLS (after starting):${NC}"
echo ""
echo -e "${YELLOW}📱 Main Application:${NC}     ${BLUE}http://localhost:5173${NC}"
echo -e "   Features: Job Portal, Portfolio Builder, Alumni Network"
echo ""
echo -e "${YELLOW}🔧 Backend API:${NC}          ${BLUE}http://localhost:8001${NC}"
echo -e "   Features: Authentication, Database, File Upload"
echo ""
echo -e "${YELLOW}🤖 AI Resume Analyzer:${NC}   ${BLUE}http://localhost:8501${NC}"
echo -e "   Features: Resume Analysis, Career Insights (only with start-all-services.sh)"
echo ""

echo -e "${CYAN}👥 TEST ACCOUNTS:${NC}"
echo ""
echo -e "${YELLOW}Student Login:${NC}    patel@gmail.com / patel@gmail.com"
echo -e "${YELLOW}Recruiter Login:${NC}  recruiter@company.com / recruiter123"
echo -e "${YELLOW}Faculty Login:${NC}    faculty@jssateb.ac.in / faculty123"
echo -e "${YELLOW}AI Admin Login:${NC}   admin / admin@resume-analyzer"
echo ""

echo -e "${CYAN}🔄 TYPICAL WORKFLOW:${NC}"
echo ""
echo -e "${PURPLE}First Time Setup:${NC}"
echo -e "1. ${BLUE}./complete-setup.sh${NC}    # Install everything (one time only)"
echo -e "2. ${BLUE}./fast-start.sh${NC}        # Start the application"
echo -e "3. Open ${BLUE}http://localhost:5173${NC} in your browser"
echo -e "4. Login with test account and explore features"
echo -e "5. ${BLUE}./stop-all-services.sh${NC} # Stop when done"
echo ""

echo -e "${PURPLE}Daily Development:${NC}"
echo -e "1. ${BLUE}./fast-start.sh${NC}        # Quick start for development"
echo -e "2. Make your changes"
echo -e "3. ${BLUE}./stop-all-services.sh${NC} # Stop when done"
echo ""

echo -e "${PURPLE}Full Testing:${NC}"
echo -e "1. ${BLUE}./start-all-services.sh${NC} # Start with AI features"
echo -e "2. Test all features including AI resume analysis"
echo -e "3. ${BLUE}./stop-all-services.sh${NC}  # Stop when done"
echo ""

echo -e "${CYAN}📋 KEY FEATURES:${NC}"
echo ""
echo -e "✅ Complete MERN Stack Job Portal"
echo -e "✅ AI-Powered Resume Analysis & Recommendations"
echo -e "✅ Professional Portfolio Builder (LinkFolio)"
echo -e "✅ Real-time Alumni Network & Messaging"
echo -e "✅ Comprehensive Analytics Dashboard"
echo -e "✅ Mobile-Responsive Design"
echo -e "✅ Production-Ready Security & Performance"
echo ""

echo -e "${CYAN}🛠️ TECH STACK:${NC}"
echo ""
echo -e "Frontend:  React 18, Vite, Tailwind CSS, Redux Toolkit"
echo -e "Backend:   Node.js, Express, MongoDB, JWT Authentication"
echo -e "AI:        Python, Streamlit, spaCy, NLTK, Machine Learning"
echo -e "Deploy:    Vercel, MongoDB Atlas, Cloudinary"
echo ""

echo -e "${GREEN}🎯 Ready to get started? Run:${NC} ${BLUE}./complete-setup.sh${NC}"
echo ""
