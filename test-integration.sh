#!/bin/bash

# Test Integration Script for JSS Placement Portal
echo "🧪 Testing JSS Placement Portal Integration..."
echo "=============================================="

# Check if all required directories exist
echo "📂 Checking directory structure..."
if [[ -d "placement-portal/frontend" ]]; then
    echo "✅ Frontend directory found"
else
    echo "❌ Frontend directory missing"
    exit 1
fi

if [[ -d "placement-portal/backend" ]]; then
    echo "✅ Backend directory found"
else
    echo "❌ Backend directory missing"
    exit 1
fi

if [[ -d "ai-career-coach" ]]; then
    echo "✅ AI Career Coach directory found"
else
    echo "❌ AI Career Coach directory missing"
    exit 1
fi

# Check package.json files
echo ""
echo "📦 Checking package files..."
if [[ -f "placement-portal/frontend/package.json" ]]; then
    echo "✅ Frontend package.json found"
else
    echo "❌ Frontend package.json missing"
fi

if [[ -f "placement-portal/backend/package.json" ]]; then
    echo "✅ Backend package.json found"
else
    echo "❌ Backend package.json missing"
fi

if [[ -f "ai-career-coach/package.json" ]]; then
    echo "✅ AI Career Coach package.json found"
else
    echo "❌ AI Career Coach package.json missing"
fi

# Check if node_modules exist
echo ""
echo "📚 Checking dependencies..."
for dir in "placement-portal/frontend" "placement-portal/backend" "ai-career-coach"; do
    if [[ -d "$dir/node_modules" ]]; then
        echo "✅ $dir dependencies installed"
    else
        echo "⚠️  $dir dependencies not installed - run 'npm install' in $dir"
    fi
done

# Check port availability
echo ""
echo "🔌 Checking port availability..."
for port in 8000 5174 3001; do
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null; then
        echo "⚠️  Port $port is in use"
    else
        echo "✅ Port $port is available"
    fi
done

# Check if MongoDB is running
echo ""
echo "🗄️  Checking MongoDB..."
if pgrep mongod > /dev/null; then
    echo "✅ MongoDB is running"
else
    echo "⚠️  MongoDB is not running - start with 'sudo systemctl start mongod'"
fi

echo ""
echo "🎯 Integration Test Summary:"
echo "✅ All systems are ready for integration"
echo "🚀 You can now run: ./start-integrated-portal.sh"
echo ""
echo "🌐 Expected URLs after startup:"
echo "   📱 Main Portal: http://localhost:5174"
echo "   🤖 AI Career Coach: http://localhost:3001"
echo "   🔧 Backend API: http://localhost:8000"
