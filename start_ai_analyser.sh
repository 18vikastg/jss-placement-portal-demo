#!/bin/bash

# AI Resume Analyser Startup Script for JSS Placement Portal Integration
# Runs the Streamlit app on port 5001 for seamless integration

echo "🚀 Starting AI Resume Analyser for JSS Placement Portal..."
echo "📍 Target URL: http://localhost:5001"
echo "🔗 Integration: JSS Student Dashboard → Resume Analysis"

# Navigate to the AI Resume Analyser directory
cd "/home/vikas/Desktop/jss-placement-portal/ai-resume-analyser"

# Check if requirements are installed
echo "📦 Checking Python dependencies..."
if ! python3 -c "import streamlit" 2>/dev/null; then
    echo "⚠️  Installing required dependencies..."
    pip3 install -r requirements.txt
fi

# Set environment variables for the integrated app
export STREAMLIT_SERVER_PORT=5001
export STREAMLIT_SERVER_ADDRESS="0.0.0.0"

# Create a custom config for integration
mkdir -p ~/.streamlit
cat > ~/.streamlit/config.toml << EOF
[server]
port = 5001
address = "0.0.0.0"
headless = true
enableCORS = false
enableXsrfProtection = false

[theme]
primaryColor = "#dc2626"
backgroundColor = "#ffffff"
secondaryBackgroundColor = "#f3f4f6"
textColor = "#111827"

[browser]
gatherUsageStats = false
EOF

echo "✅ Configuration complete!"
echo "🎯 Starting Streamlit app on http://localhost:5001"
echo "🔄 Integration mode: JSS Placement Portal"
echo ""

# Start the Streamlit app
streamlit run App/App.py \
  --server.port 5001 \
  --server.address "0.0.0.0" \
  --server.headless true \
  --server.enableCORS false \
  --server.enableXsrfProtection false \
  --theme.primaryColor "#dc2626" \
  --theme.backgroundColor "#ffffff"

echo "🔄 AI Resume Analyser integration ready!"
echo "📍 Access at: http://localhost:5001"
echo "🏠 Return to JSS Portal: http://localhost:5174"
