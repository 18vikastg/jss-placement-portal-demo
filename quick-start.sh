#!/bin/bash

# Quick Start - JSS Placement Portal (Simple Version)
echo "🚀 Quick Starting JSS Placement Portal..."

# Kill existing processes
pkill -f "npm run dev" 2>/dev/null
pkill -f "streamlit" 2>/dev/null

# Start all services in background
cd /home/vikas/Desktop/jss-placement-portal

echo "📦 Starting Backend..."
cd placement-portal/backend && npm run dev &

echo "🎨 Starting Frontend..."
cd ../frontend && npm run dev &

echo "🤖 Starting AI Career Coach..."
cd ../../ai-career-coach && npm run dev &

echo "📄 Starting AI Resume Analyser..."
cd ../ai-resume-analyser && PORT=5001 ./start.sh &

cd ..

echo ""
echo "✅ All services starting!"
echo ""
echo "🌐 Access Links:"
echo "📍 Main Portal: http://localhost:5174/"
echo "📍 AI Career Guide: http://localhost:3001/career-guide"
echo "📍 AI Resume Analyser: http://localhost:5001/"
echo ""
echo "⏳ Wait 30-60 seconds for all services to fully start"
