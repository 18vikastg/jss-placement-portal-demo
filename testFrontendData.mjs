// Test frontend data transmission to backend
import axios from 'axios';

const testProfileUpdate = async () => {
    try {
        console.log('=== TESTING FRONTEND DATA TRANSMISSION ===');

        // Simulate exactly what the frontend sends
        const profileData = {
            fullname: 'Frontend Test User',
            email: 'frontendtest@jss.edu',
            phoneNumber: '9876543210',
            bio: 'This is a test bio from frontend',
            address: 'Test Address, Bangalore',
            branch: 'Computer Science Engineering',
            semester: '7',
            cgpa: '8.5',
            university: 'JSS Academy of Technical Education',
            year: '2024',
            skills: ['JavaScript', 'React.js', 'Node.js', 'MongoDB'],
            experiences: [
                {
                    title: 'Frontend Developer',
                    company: 'Test Company',
                    duration: 'June 2023 - Present',
                    description: 'Working on frontend development'
                }
            ],
            projects: [
                {
                    title: 'Test Project',
                    description: 'This is a test project description',
                    technologies: 'React, Node.js',
                    link: 'https://github.com/test/project'
                }
            ],
            certifications: [
                {
                    name: 'Test Certification',
                    issuer: 'Test Institute',
                    date: 'June 2023'
                }
            ],
            socialLinks: {
                github: 'https://github.com/testuser',
                linkedin: 'https://linkedin.com/in/testuser',
                portfolio: 'https://testuser.dev'
            }
        };

        console.log('Profile data to send:', profileData);

        // Create FormData exactly like frontend does
        const formData = new FormData();
        
        Object.keys(profileData).forEach(key => {
            if (key === 'socialLinks') {
                const socialLinksJson = JSON.stringify(profileData.socialLinks);
                formData.append('socialLinks', socialLinksJson);
                console.log('Added socialLinks as JSON:', socialLinksJson);
            } else if (Array.isArray(profileData[key])) {
                const arrayJson = JSON.stringify(profileData[key]);
                formData.append(key, arrayJson);
                console.log(`Added array ${key} as JSON:`, arrayJson);
            } else if (profileData[key] !== null && profileData[key] !== '' && profileData[key] !== undefined) {
                formData.append(key, profileData[key]);
                console.log(`Added ${key}:`, profileData[key]);
            }
        });

        console.log('\nSending request to backend...');

        const response = await axios.post('http://localhost:8001/api/v1/user/profile/enhanced-update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Cookie': 'token=your-test-token' // You would need a valid token
            }
        });

        console.log('Response received:', response.data);

    } catch (error) {
        if (error.response) {
            console.log('Backend error response:', error.response.data);
            console.log('Status:', error.response.status);
        } else {
            console.log('Request error:', error.message);
        }
    }
};

// Run test
testProfileUpdate();
