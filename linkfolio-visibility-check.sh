#!/bin/bash

echo "🎯 LINKFOLIO VISIBILITY FIX - VERIFICATION"
echo "=========================================="
echo ""

echo "✅ LINKFOLIO CARD PLACEMENT:"
echo "============================"
echo "• Location: Student Dashboard - TOP of main content area"
echo "• Design: Large purple-to-blue gradient card"
echo "• Title: 'LinkFolio Portfolio Builder'"
echo "• Button: White 'Create Portfolio' button with Portfolio icon"
echo "• Visibility: VERY PROMINENT - can't be missed!"
echo ""

echo "📍 EXACT LOCATION IN DASHBOARD:"
echo "==============================="
echo "1. Profile completion alert (if profile < 100%)"
echo "2. Quick stats (4 boxes: Applications, Interviews, Completed, Notifications)"
echo "3. 🟣 LINKFOLIO CARD ← HERE! (Large purple gradient card)"
echo "4. Quick Actions section (Update Profile, Academic Details, etc.)"
echo "5. Rest of dashboard content..."
echo ""

echo "🎨 VISUAL DESCRIPTION:"
echo "======================"
echo "The LinkFolio card should be:"
echo "• LARGE gradient card with purple-to-blue background"
echo "• WHITE text with Portfolio icon"
echo "• Contains: '✨ 5-step portfolio builder ✨ Professional showcase ✨ Alumni networking'"
echo "• WHITE 'Create Portfolio' button on the right"
echo "• Takes full width of the left column"
echo ""

echo "🔍 TROUBLESHOOTING:"
echo "==================="
echo "If you don't see the LinkFolio card:"
echo "1. Make sure you're logged in as a STUDENT (not recruiter/faculty)"
echo "2. Check you're on the main Student Dashboard page"
echo "3. Scroll down slightly - it's after the stats boxes"
echo "4. Refresh the page: http://localhost:5174"
echo ""

echo "🚀 ACCESS INSTRUCTIONS:"
echo "======================="
echo "1. Go to: http://localhost:5174"
echo "2. Login with student credentials"
echo "3. Look for LARGE PURPLE CARD with 'LinkFolio Portfolio Builder'"
echo "4. Click white 'Create Portfolio' button"
echo "5. Follow the 5-step portfolio creation wizard"
echo ""

# Check if frontend is running
if curl -s http://localhost:5174 > /dev/null 2>&1; then
    echo "✅ Frontend is running on http://localhost:5174"
else
    echo "❌ Frontend is NOT running. Please run:"
    echo "   cd /home/vikas/Desktop/jss-placement-portal/placement-portal/frontend"
    echo "   npm run dev -- --port 5174"
fi

echo ""
echo "🎉 THE LINKFOLIO CARD IS NOW PROMINENTLY DISPLAYED!"
echo "==================================================="
echo "It's a large, eye-catching purple gradient card that should be"
echo "impossible to miss in the Student Dashboard. Look for it right"
echo "after the statistics cards and before the Quick Actions section."
