#!/bin/bash

# JSS Placement Portal - Quick Commands Reference
# All the commands you need in one place

echo "🚀 JSS PLACEMENT PORTAL - QUICK COMMANDS"
echo "========================================"
echo ""

echo "📋 MAIN COMMANDS:"
echo ""

echo "🟢 START ALL SERVICES (One Command):"
echo "   ./start-everything.sh"
echo ""

echo "🔴 STOP ALL SERVICES:"
echo "   ./stop-all-complete.sh"
echo ""

echo "📊 CHECK STATUS:"
echo "   curl -s http://localhost:5173 && echo '✅ Frontend Running'"
echo "   curl -s http://localhost:8001 && echo '✅ Backend Running'"
echo "   curl -s http://localhost:3001 && echo '✅ AI Career Coach Running'"
echo "   curl -s http://localhost:8501 && echo '✅ AI Resume Analyzer Running'"
echo ""

echo "🌐 ACCESS URLS:"
echo "   Frontend (Main Portal): http://localhost:5173"
echo "   Backend API:            http://localhost:8001"
echo "   AI Career Coach:        http://localhost:3001"
echo "   AI Resume Analyzer:     http://localhost:8501"
echo ""

echo "📁 LOG FILES:"
echo "   tail -f logs/backend.log"
echo "   tail -f logs/frontend.log"
echo "   tail -f logs/ai-career-coach.log"
echo "   tail -f logs/ai-resume-analyzer.log"
echo ""

echo "🧪 INDIVIDUAL SERVICE COMMANDS (if needed):"
echo ""

echo "Backend Only:"
echo "   cd placement-portal/backend && node index.js"
echo ""

echo "Frontend Only:"
echo "   cd placement-portal/frontend && npm run dev"
echo ""

echo "AI Career Coach Only:"
echo "   cd ai-career-coach && npm run dev"
echo ""

echo "AI Resume Analyzer Only:"
echo "   cd ai-resume-analyser && streamlit run App/App.py --server.port 8501"
echo ""

echo "👥 TEST ACCOUNTS:"
echo "   Student:    patel@gmail.com / patel@gmail.com"
echo "   Recruiter:  recruiter@company.com / recruiter123"
echo "   Faculty:    faculty@jssateb.ac.in / faculty123"
echo "   AI Admin:   admin / admin@resume-analyzer"
echo ""

echo "🔧 TROUBLESHOOTING:"
echo "   Check logs:     ls -la logs/"
echo "   Kill all:       pkill -f 'node|npm|streamlit'"
echo "   Check ports:    lsof -i :5173,:8001,:3001,:8501"
echo "   Full restart:   ./stop-all-complete.sh && sleep 5 && ./start-everything.sh"
echo ""

echo "🎯 MAIN FEATURES:"
echo "   ✅ Job Portal & Applications"
echo "   ✅ AI Resume Analysis & Career Recommendations"
echo "   ✅ AI Career Roadmap Generation"
echo "   ✅ Professional Portfolio Builder"
echo "   ✅ Alumni Network & Messaging"
echo "   ✅ Real-time Notifications"
echo ""

echo "💡 USAGE TIP:"
echo "   Run './start-everything.sh' and visit http://localhost:5173"
echo "   All 4 services will start automatically in the background!"
echo ""
