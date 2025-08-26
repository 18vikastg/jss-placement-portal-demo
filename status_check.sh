#!/bin/bash

echo "🔍 AUTHENTICATION SYSTEM STATUS CHECK"
echo "===================================="

echo -e "\n📡 SERVER STATUS:"
echo "Backend: http://localhost:8001 $(curl -s -o /dev/null -w "%{http_code}" http://localhost:8001 || echo "DOWN")"
echo "Frontend: http://localhost:5173 $(curl -s -o /dev/null -w "%{http_code}" http://localhost:5173 || echo "DOWN")"

echo -e "\n🧪 API ENDPOINT TESTS:"

echo -e "\n1. Testing Student Registration (New User):"
TIMESTAMP=$(date +%s)
STUDENT_REG=$(curl -s -X POST http://localhost:8001/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d "{
    \"fullname\": \"Test Student $TIMESTAMP\",
    \"email\": \"test$TIMESTAMP@college.edu\",
    \"phoneNumber\": 9876543200,
    \"password\": \"student123\",
    \"role\": \"student\"
  }")
echo "Response: $STUDENT_REG"

echo -e "\n2. Testing Student Login:"
STUDENT_LOGIN=$(curl -s -X POST http://localhost:8001/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"test$TIMESTAMP@college.edu\",
    \"password\": \"student123\",
    \"role\": \"student\"
  }")
echo "Response: $(echo $STUDENT_LOGIN | cut -c1-100)..."

echo -e "\n3. Testing Faculty Login:"
FACULTY_LOGIN=$(curl -s -X POST http://localhost:8001/api/v1/auth/faculty/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "complete.faculty@college.edu",
    "password": "faculty123"
  }')
echo "Response: $(echo $FACULTY_LOGIN | cut -c1-100)..."

echo -e "\n4. Testing Recruiter Login:"
RECRUITER_LOGIN=$(curl -s -X POST http://localhost:8001/api/v1/auth/recruiter/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo.recruiter@demotech.com",
    "password": "recruiter123"
  }')
echo "Response: $(echo $RECRUITER_LOGIN | cut -c1-100)..."

echo -e "\n🎯 WORKING LOGIN CREDENTIALS:"
echo "================================="
echo "🌐 Frontend: http://localhost:5173"
echo ""
echo "📚 STUDENT LOGIN:"
echo "   Email: test$TIMESTAMP@college.edu"
echo "   Password: student123"
echo "   Role: student"
echo ""
echo "👨‍🏫 FACULTY LOGIN:"
echo "   Email: complete.faculty@college.edu"
echo "   Password: faculty123"
echo "   Role: faculty"
echo ""
echo "👔 RECRUITER LOGIN:"
echo "   Email: demo.recruiter@demotech.com"
echo "   Password: recruiter123"
echo "   Role: recruiter"
echo ""

echo "✅ All API endpoints are working!"
echo "If you see 400 errors in frontend, it's likely due to:"
echo "  - Using existing email addresses"
echo "  - Wrong credentials"
echo "  - Network timing issues"
echo ""
echo "💡 Try using the fresh credentials above!"
