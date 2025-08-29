import mongoose from 'mongoose';
import { User } from './models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const addDataToUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Find your actual user
        const user = await User.findOne({ email: 'vikastg2000@gmail.com' });
        if (!user) {
            console.log('User not found');
            process.exit(1);
        }

        console.log('Adding comprehensive data to your user profile...');

        // Add comprehensive data
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
            'Machine Learning'
        ];

        user.profile.experiences = [
            {
                id: 1,
                title: 'Full Stack Developer Intern',
                company: 'Tech Solutions Pvt Ltd',
                duration: 'June 2024 - August 2024',
                description: 'Developed web applications using MERN stack. Worked on user authentication, API integration, and database optimization. Collaborated with team to deliver high-quality software solutions.'
            },
            {
                id: 2,
                title: 'Web Development Intern',
                company: 'Digital Innovation Lab',
                duration: 'January 2024 - March 2024',
                description: 'Built responsive web interfaces using React.js and Tailwind CSS. Implemented modern UI/UX designs and optimized application performance for better user experience.'
            }
        ];

        user.profile.projects = [
            {
                id: 1,
                title: 'JSS Placement Portal',
                description: 'Comprehensive college placement management system with job posting, application tracking, student profiles, and AI-powered analytics. Features include real-time notifications, advanced search, and admin dashboard.',
                technologies: 'React.js, Node.js, MongoDB, Express.js, JWT, Cloudinary',
                link: 'https://github.com/18vikastg/jss-placement-portal'
            },
            {
                id: 2,
                title: 'E-Commerce Platform',
                description: 'Full-featured online shopping platform with cart management, payment gateway integration, order tracking, and inventory management. Includes admin panel for product and user management.',
                technologies: 'React.js, Redux, Node.js, PostgreSQL, Stripe API, AWS',
                link: 'https://github.com/vikas/ecommerce-app'
            },
            {
                id: 3,
                title: 'AI Chat Application',
                description: 'Real-time chat application with AI-powered chatbot integration. Features include group chats, file sharing, emoji support, and intelligent message suggestions.',
                technologies: 'Socket.io, React.js, Firebase, OpenAI API, Material-UI',
                link: 'https://github.com/vikas/ai-chat-app'
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
                name: 'Full Stack Web Development Certification',
                issuer: 'freeCodeCamp',
                date: 'February 2024'
            },
            {
                id: 3,
                name: 'MongoDB Certified Developer',
                issuer: 'MongoDB University',
                date: 'January 2024'
            },
            {
                id: 4,
                name: 'Google Cloud Platform Fundamentals',
                issuer: 'Google Cloud',
                date: 'December 2023'
            }
        ];

        if (!user.profile.socialLinks) {
            user.profile.socialLinks = {};
        }
        user.profile.socialLinks.github = 'https://github.com/18vikastg';
        user.profile.socialLinks.linkedin = 'https://linkedin.com/in/vikastg';
        user.profile.socialLinks.portfolio = 'https://vikastg.dev';

        await user.save();
        
        console.log('✅ Data added successfully!');
        console.log('📊 Profile now includes:');
        console.log(`   - Skills: ${user.profile.skills.length} items`);
        console.log(`   - Experiences: ${user.profile.experiences.length} items`);
        console.log(`   - Projects: ${user.profile.projects.length} items`);
        console.log(`   - Certifications: ${user.profile.certifications.length} items`);
        console.log('🎯 Resume generation will now include ALL sections!');
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

addDataToUser();
