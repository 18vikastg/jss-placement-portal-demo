#!/bin/bash

# JSS Placement Portal - AI Resume Analyzer Standalone Startup
echo "🧠 STARTING AI RESUME ANALYZER"
echo "==============================="

# Set project root
PROJECT_ROOT="/home/vikas/Desktop/jss-placement-portal"
cd "$PROJECT_ROOT"

# Create logs directory
mkdir -p logs

# Go to AI Resume Analyzer directory
cd "$PROJECT_ROOT/ai-resume-analyser"

# Check if App.py exists
if [ ! -f "App/App.py" ]; then
    echo "❌ AI Resume Analyzer App.py not found!"
    exit 1
fi

# Check Python installation
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python first."
    exit 1
fi

# Install Streamlit if not installed
echo "📦 Checking Streamlit installation..."
if ! pip show streamlit &> /dev/null; then
    echo "Installing Streamlit..."
    pip install streamlit
fi

# Check and install dependencies
echo "📦 Installing/Checking dependencies..."
echo "   Installing core packages: streamlit, pandas, pymysql..."
pip install streamlit pandas pymysql > /dev/null 2>&1

# Try to install additional packages if available
if [ -f "requirements.txt" ]; then
    echo "   Installing additional packages from requirements.txt (optional)..."
    pip install -r requirements.txt > /dev/null 2>&1 || echo "   ⚠️  Some optional packages skipped"
fi

echo "✅ Core dependencies ready"

# Set environment variables
export STREAMLIT_SERVER_PORT=8501
export STREAMLIT_SERVER_ADDRESS="0.0.0.0"

echo ""
echo "🚀 Starting AI Resume Analyzer on http://localhost:8501"
echo "⏳ Please wait, this may take a moment..."
echo ""

# Start Streamlit
streamlit run App/App.py \
  --server.port 8501 \
  --server.address 0.0.0.0 \
  --server.headless false \
  --server.enableCORS false \
  --server.enableXsrfProtection false

echo ""
echo "✅ AI Resume Analyzer is running!"
echo "🌐 Access at: http://localhost:8501"
