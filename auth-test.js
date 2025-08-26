// Test Authentication Setup Script
// Run this in your browser console or use Postman

// 1. First, create a Faculty account
const registerFaculty = async () => {
    const facultyData = {
        fullName: "Dr. Rajesh Kumar",
        email: "rajesh.kumar@college.edu",
        phoneNumber: "9876543210",
        password: "faculty123",
        department: "Computer Science",
        designation: "Professor",
        employeeId: "EMP001"
    };

    try {
        const response = await fetch('http://localhost:8001/api/v1/auth/faculty/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(facultyData)
        });
        
        const result = await response.json();
        console.log('Faculty Registration:', result);
        return result;
    } catch (error) {
        console.error('Faculty Registration Error:', error);
    }
};

// 2. Then login as Faculty
const loginFaculty = async () => {
    const loginData = {
        email: "rajesh.kumar@college.edu",
        password: "faculty123"
    };

    try {
        const response = await fetch('http://localhost:8001/api/v1/auth/faculty/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
            credentials: 'include' // Important for cookies
        });
        
        const result = await response.json();
        console.log('Faculty Login:', result);
        return result;
    } catch (error) {
        console.error('Faculty Login Error:', error);
    }
};

// 3. Create a Recruiter account (need companyId first)
const registerRecruiter = async (companyId) => {
    const recruiterData = {
        fullName: "Priya Sharma",
        email: "priya.sharma@techcorp.com",
        phoneNumber: "9876543211",
        password: "recruiter123",
        companyId: companyId, // Get this from existing companies
        designation: "Senior HR Manager"
    };

    try {
        const response = await fetch('http://localhost:8001/api/v1/auth/recruiter/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recruiterData)
        });
        
        const result = await response.json();
        console.log('Recruiter Registration:', result);
        return result;
    } catch (error) {
        console.error('Recruiter Registration Error:', error);
    }
};

// 4. Login as Recruiter
const loginRecruiter = async () => {
    const loginData = {
        email: "priya.sharma@techcorp.com",
        password: "recruiter123"
    };

    try {
        const response = await fetch('http://localhost:8001/api/v1/auth/recruiter/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
            credentials: 'include' // Important for cookies
        });
        
        const result = await response.json();
        console.log('Recruiter Login:', result);
        return result;
    } catch (error) {
        console.error('Recruiter Login Error:', error);
    }
};

// 5. Get existing companies to use companyId for recruiter
const getCompanies = async () => {
    try {
        const response = await fetch('http://localhost:8001/api/v1/company/get');
        const result = await response.json();
        console.log('Companies:', result);
        return result;
    } catch (error) {
        console.error('Get Companies Error:', error);
    }
};

// Usage Instructions:
console.log(`
=== Authentication Setup Instructions ===

1. Register Faculty:
   await registerFaculty()

2. Login as Faculty:
   await loginFaculty()

3. Get Companies (to get companyId for recruiter):
   const companies = await getCompanies()

4. Register Recruiter (use companyId from step 3):
   await registerRecruiter("COMPANY_ID_HERE")

5. Login as Recruiter:
   await loginRecruiter()

=== Login Credentials ===

Faculty Login:
- Email: rajesh.kumar@college.edu
- Password: faculty123

Recruiter Login:
- Email: priya.sharma@techcorp.com  
- Password: recruiter123

Student Login (existing):
- Create via /api/v1/user/register
- Login via /api/v1/user/login
`);

export { registerFaculty, loginFaculty, registerRecruiter, loginRecruiter, getCompanies };
