#!/bin/bash

# AI Resume Analyzer Test Script
# Quick test to check if AI analyzer can start properly

echo "🤖 Testing AI Resume Analyzer..."
echo "================================"

cd /home/vikas/Desktop/jss-placement-portal/ai-resume-analyser/App

echo "📋 Checking dependencies..."

# Check Python
if command -v python3 &> /dev/null; then
    echo "✅ Python 3: $(python3 --version)"
else
    echo "❌ Python 3 not found"
    exit 1
fi

# Check Streamlit
if python3 -c "import streamlit" 2>/dev/null; then
    echo "✅ Streamlit: Available"
else
    echo "❌ Streamlit not installed"
    exit 1
fi

# Check other key dependencies
for module in pandas numpy plotly pymysql nltk; do
    if python3 -c "import $module" 2>/dev/null; then
        echo "✅ $module: Available"
    else
        echo "⚠️ $module: Not available"
    fi
done

echo ""
echo "🚀 Starting AI Resume Analyzer (5 second test)..."

# Start the service temporarily
timeout 10s python3 -m streamlit run App.py --server.port 8501 --server.headless true --server.address 0.0.0.0 &
sleep 5

# Test if it's accessible
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8501 | grep -q "200"; then
    echo "✅ AI Resume Analyzer started successfully!"
    echo "🌐 Available at: http://localhost:8501"
    
    # Kill the test instance
    pkill -f "streamlit run App.py" 2>/dev/null
    
    echo ""
    echo "🎯 Test Result: AI Resume Analyzer is working properly!"
    echo "💡 You can now use ./start-all-services.sh to launch all services"
else
    echo "❌ AI Resume Analyzer failed to start"
    echo "📝 Check the log file for more details"
    exit 1
fi

echo "================================"
echo "🎉 AI Test Complete!"
