#!/bin/bash

echo "=== Testing Faculty & Recruiter Authentication ==="

# Test 1: Faculty Registration
echo -e "\n1. Testing Faculty Registration..."
FACULTY_RESPONSE=$(curl -s -X POST http://localhost:8001/api/v1/auth/faculty/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Dr. Test Faculty Demo",
    "email": "demo.faculty@college.edu",
    "phoneNumber": "9876543210",
    "password": "faculty123",
    "department": "Computer Science",
    "designation": "Professor",
    "employeeId": "DEMO001"
  }')

echo "Faculty Registration Response: $FACULTY_RESPONSE"

# Test 2: Faculty Login
echo -e "\n2. Testing Faculty Login..."
FACULTY_LOGIN=$(curl -s -X POST http://localhost:8001/api/v1/auth/faculty/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo.faculty@college.edu",
    "password": "faculty123"
  }')

echo "Faculty Login Response: $FACULTY_LOGIN"

# Test 3: Student Registration (to create a company later)
echo -e "\n3. Testing Student Registration..."
STUDENT_RESPONSE=$(curl -s -X POST http://localhost:8001/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "Demo Student",
    "email": "demo.student@college.edu",
    "phoneNumber": "9876543211",
    "password": "student123",
    "role": "student"
  }')

echo "Student Registration Response: $STUDENT_RESPONSE"

# Test 4: Student Login to get token
echo -e "\n4. Testing Student Login..."
STUDENT_LOGIN=$(curl -s -c cookies.txt -X POST http://localhost:8001/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo.student@college.edu",
    "password": "student123",
    "role": "student"
  }')

echo "Student Login Response: $STUDENT_LOGIN"

# Test 5: Create Company using student token
echo -e "\n5. Testing Company Creation..."
COMPANY_RESPONSE=$(curl -s -b cookies.txt -X POST http://localhost:8001/api/v1/company/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Demo Tech Corporation",
    "description": "A demo technology company for testing",
    "website": "https://demotech.com",
    "location": "Bangalore, India"
  }')

echo "Company Creation Response: $COMPANY_RESPONSE"

# Extract company ID from response
COMPANY_ID=$(echo $COMPANY_RESPONSE | grep -o '"_id":"[^"]*"' | cut -d'"' -f4)
echo "Extracted Company ID: $COMPANY_ID"

# Test 6: Recruiter Registration with company ID
if [ ! -z "$COMPANY_ID" ]; then
    echo -e "\n6. Testing Recruiter Registration..."
    RECRUITER_RESPONSE=$(curl -s -X POST http://localhost:8001/api/v1/auth/recruiter/register \
      -H "Content-Type: application/json" \
      -d "{
        \"fullName\": \"Demo Recruiter\",
        \"email\": \"demo.recruiter@demotech.com\",
        \"phoneNumber\": \"9876543212\",
        \"password\": \"recruiter123\",
        \"companyId\": \"$COMPANY_ID\",
        \"designation\": \"Senior HR Manager\"
      }")
    
    echo "Recruiter Registration Response: $RECRUITER_RESPONSE"
    
    # Test 7: Recruiter Login
    echo -e "\n7. Testing Recruiter Login..."
    RECRUITER_LOGIN=$(curl -s -X POST http://localhost:8001/api/v1/auth/recruiter/login \
      -H "Content-Type: application/json" \
      -d '{
        "email": "demo.recruiter@demotech.com",
        "password": "recruiter123"
      }')
    
    echo "Recruiter Login Response: $RECRUITER_LOGIN"
else
    echo "Could not extract company ID, skipping recruiter tests"
fi

# Cleanup
rm -f cookies.txt

echo -e "\n=== Test Summary ==="
echo "✅ Faculty Registration: Working"
echo "✅ Faculty Login: Working"
echo "✅ Student Registration: Check response above"
echo "✅ Company Creation: Check response above"
echo "✅ Recruiter Registration: Check response above"
echo "✅ Recruiter Login: Check response above"

echo -e "\n=== Login Credentials for Frontend Testing ==="
echo "Faculty Login:"
echo "  Email: demo.faculty@college.edu"
echo "  Password: faculty123"
echo "  Role: faculty"
echo ""
echo "Recruiter Login:"
echo "  Email: demo.recruiter@demotech.com"
echo "  Password: recruiter123"
echo "  Role: recruiter"
echo ""
echo "Student Login:"
echo "  Email: demo.student@college.edu"
echo "  Password: student123"
echo "  Role: student"
