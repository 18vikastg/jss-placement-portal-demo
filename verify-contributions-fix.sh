#!/bin/bash

echo "🔍 GITHUB CONTRIBUTIONS FIX VERIFICATION"
echo "========================================="
echo ""

echo "📧 Current Git Configuration:"
echo "Name: $(git config --global user.name)"
echo "Email: $(git config --global user.email)"
echo ""

echo "📊 Repository Configuration:"
echo "Repo Name: $(git config user.name)"
echo "Repo Email: $(git config user.email)"
echo ""

echo "🎯 SOLUTION STATUS:"
echo ""

# Check if email is set correctly
GLOBAL_EMAIL=$(git config --global user.email)
if [ "$GLOBAL_EMAIL" = "vikastg2000@gmail.com" ]; then
    echo "✅ Global email is correctly set to: $GLOBAL_EMAIL"
else
    echo "❌ Global email needs to be fixed. Current: $GLOBAL_EMAIL"
    echo "🔧 Run: git config --global user.email 'vikastg2000@gmail.com'"
fi

echo ""
echo "📋 IMPORTANT STEPS TO COMPLETE:"
echo ""
echo "1️⃣ Make sure vikastg2000@gmail.com is added and verified in your GitHub account:"
echo "   👉 Go to: https://github.com/settings/emails"
echo "   👉 Add vikastg2000@gmail.com if not already added"
echo "   👉 Verify the email address"
echo ""
echo "2️⃣ Future commits will now use the correct email"
echo ""
echo "3️⃣ GitHub contributions will show up within 24 hours for new commits"
echo ""
echo "🎉 After completing step 1, your contribution streak will be fixed!"
echo ""

# Show recent commits
echo "📝 Recent commits in this repository:"
git log --oneline -5 --pretty=format:"%h %an <%ae> %s" 2>/dev/null || echo "No git repository found"
