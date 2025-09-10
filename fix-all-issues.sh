#!/bin/bash

echo "🔧 JSS PLACEMENT PORTAL - COMPLETE FIX SCRIPT"
echo "============================================="
echo ""

# Kill any existing processes
echo "🧹 Cleaning up existing processes..."
pkill -f "streamlit" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true

# Check backend status
echo "📦 Checking Backend Status..."
if curl -s http://localhost:8001/health > /dev/null 2>&1; then
    echo "✅ Backend is running on port 8001"
else
    echo "❌ Backend not running. Starting..."
    cd /home/vikas/Desktop/jss-placement-portal/placement-portal/backend
    npm start &
    sleep 3
    echo "✅ Backend started"
fi

# Check frontend status
echo "🎨 Checking Frontend Status..."
if curl -s http://localhost:5174 > /dev/null 2>&1; then
    echo "✅ Frontend is running on port 5174"
else
    echo "❌ Frontend not running. Starting..."
    cd /home/vikas/Desktop/jss-placement-portal/placement-portal/frontend
    npm run dev -- --port 5174 &
    sleep 3
    echo "✅ Frontend started"
fi

# Check AI Resume Analyzer
echo "📄 Checking AI Resume Analyzer..."
if curl -s http://localhost:5001 > /dev/null 2>&1; then
    echo "✅ AI Resume Analyzer is running on port 5001"
else
    echo "❌ AI Resume Analyzer not running. Starting..."
    cd /home/vikas/Desktop/jss-placement-portal/ai-resume-analyser
    python -m streamlit run App/App.py --server.port 5001 &
    sleep 5
    echo "✅ AI Resume Analyzer started"
fi

# Check AI Career Coach
echo "🤖 Checking AI Career Coach..."
if curl -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ AI Career Coach is running on port 3001"
else
    echo "❌ AI Career Coach not running. Starting..."
    cd /home/vikas/Desktop/jss-placement-portal/ai-career-coach
    npm run dev &
    sleep 3
    echo "✅ AI Career Coach started"
fi

# Seed preparation resources
echo "📚 Seeding Preparation Resources..."
cd /home/vikas/Desktop/jss-placement-portal/placement-portal/backend
node utils/seedPreparationData.js
echo "✅ Preparation resources seeded"

echo ""
echo "🎉 ALL SERVICES STATUS:"
echo "======================="

# Final status check
services=("Backend:8001" "Frontend:5174" "AI Resume Analyzer:5001" "AI Career Coach:3001")
for service in "${services[@]}"; do
    name=${service%:*}
    port=${service#*:}
    if curl -s http://localhost:$port > /dev/null 2>&1; then
        echo "✅ $name - http://localhost:$port"
    else
        echo "❌ $name - FAILED"
    fi
done

echo ""
echo "🚀 ACCESS YOUR SERVICES:"
echo "========================"
echo "• Main Portal: http://localhost:5174"
echo "• Backend API: http://localhost:8001"
echo "• AI Resume Analyzer: http://localhost:5001"
echo "• AI Career Coach: http://localhost:3001"
echo ""
echo "🎯 LINKFOLIO ACCESS:"
echo "==================="
echo "1. Go to http://localhost:5174"
echo "2. Login as Student"
echo "3. Look for purple 'LinkFolio Portfolio' button in Quick Actions"
echo "4. Click to create your professional portfolio!"
echo ""
echo "📋 PREP HUB ACCESS:"
echo "==================="
echo "1. Navigate to http://localhost:5174/preparation"
echo "2. Resources should now be available"
echo ""
echo "📄 AI RESUME ANALYZER ACCESS:"
echo "============================="
echo "1. Navigate to http://localhost:5001"
echo "2. Upload your resume for analysis"
