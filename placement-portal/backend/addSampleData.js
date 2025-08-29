import mongoose from 'mongoose';
import { User } from './models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const addSampleProfileData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Find the test user
        const user = await User.findOne({ email: 'test@student.com' });
        if (!user) {
            console.log('Test user not found. Please run createTestUser.js first.');
            process.exit(1);
        }

        // Add comprehensive profile data - update existing fields only
        if (!user.profile) {
            user.profile = {};
        }
        
        // Update the simple profile fields that we added to the model
        user.profile.bio = 'Passionate Computer Science student with strong programming skills and experience in full-stack development. Enthusiastic about learning new technologies and contributing to innovative projects.';
        user.profile.branch = 'Computer Science and Engineering';
        user.profile.semester = 6;
        user.profile.cgpa = 8.5;
        user.profile.university = 'JSS Academy of Technical Education';
        user.profile.year = '2025';
        user.profile.address = 'Bangalore, Karnataka, India';
        
        user.profile.skills = [
            'JavaScript',
            'React.js',
            'Node.js',
            'MongoDB',
            'Express.js',
            'Python',
            'Java',
            'HTML/CSS',
            'Git',
            'Docker',
            'AWS',
            'MySQL'
        ];
        
        user.profile.experiences = [
            {
                id: 1,
                title: 'Full Stack Developer Intern',
                company: 'TechCorp Solutions',
                duration: 'June 2024 - August 2024',
                description: 'Developed and maintained web applications using React.js and Node.js. Collaborated with senior developers to implement new features and optimize application performance. Gained experience in database design and API development.'
            },
            {
                id: 2,
                title: 'Web Development Intern',
                company: 'StartupX',
                duration: 'January 2024 - March 2024',
                description: 'Built responsive web interfaces using modern front-end technologies. Participated in daily stand-ups and sprint planning sessions. Contributed to improving user experience and application accessibility.'
            }
        ];
        
        user.profile.projects = [
            {
                id: 1,
                title: 'College Placement Portal',
                description: 'Developed a comprehensive placement management system for colleges with features like job posting, application tracking, and student profile management. Implemented user authentication, real-time notifications, and advanced search functionality.',
                technologies: 'React.js, Node.js, MongoDB, Express.js, Socket.io',
                link: 'https://github.com/username/placement-portal'
            },
            {
                id: 2,
                title: 'E-Commerce Web Application',
                description: 'Built a full-featured e-commerce platform with shopping cart, payment integration, and order management. Implemented admin dashboard for inventory management and sales analytics.',
                technologies: 'React.js, Redux, Node.js, PostgreSQL, Stripe API',
                link: 'https://github.com/username/ecommerce-app'
            },
            {
                id: 3,
                title: 'Task Management System',
                description: 'Created a collaborative task management application with features like team collaboration, project tracking, and deadline reminders. Implemented real-time updates and email notifications.',
                technologies: 'Vue.js, Firebase, Node.js, Express.js',
                link: 'https://github.com/username/task-manager'
            }
        ];
        
        user.profile.certifications = [
            {
                id: 1,
                name: 'AWS Certified Solutions Architect',
                issuer: 'Amazon Web Services',
                date: 'March 2024'
            },
            {
                id: 2,
                name: 'Full Stack Web Development',
                issuer: 'freeCodeCamp',
                date: 'January 2024'
            },
            {
                id: 3,
                name: 'React - The Complete Guide',
                issuer: 'Udemy',
                date: 'December 2023'
            }
        ];
        
        if (!user.profile.socialLinks) {
            user.profile.socialLinks = {};
        }
        user.profile.socialLinks.github = 'https://github.com/testuser';
        user.profile.socialLinks.linkedin = 'https://linkedin.com/in/testuser';
        user.profile.socialLinks.portfolio = 'https://testuser.dev';

        await user.save();
        
        console.log('Sample profile data added successfully!');
        console.log('Profile includes:');
        console.log(`- Bio: ${user.profile.bio.substring(0, 50)}...`);
        console.log(`- Skills: ${user.profile.skills.length} skills`);
        console.log(`- Experiences: ${user.profile.experiences.length} experiences`);
        console.log(`- Projects: ${user.profile.projects.length} projects`);
        console.log(`- Certifications: ${user.profile.certifications.length} certifications`);
        console.log('\nYou can now login and test the resume generation with comprehensive data!');
        console.log('Login credentials:');
        console.log('Email: test@student.com');
        console.log('Password: password123');
        
        process.exit(0);
    } catch (error) {
        console.error('Error adding sample profile data:', error);
        process.exit(1);
    }
};

addSampleProfileData();
