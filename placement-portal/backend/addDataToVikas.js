import mongoose from 'mongoose';
import { User } from './models/user.model.js';

const addDataToYourUser = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/jobportal');
        console.log('Connected to MongoDB');

        // Find your user by email
        const user = await User.findOne({ email: 'vikastg2000@gmail.com' });
        if (!user) {
            console.log('User not found!');
            return;
        }

        console.log('Found user:', user.fullname);

        // Add comprehensive sample data to your profile
        user.profile.skills = [
            'JavaScript',
            'React.js',
            'Node.js',
            'Express.js',
            'MongoDB',
            'Python',
            'Machine Learning',
            'HTML/CSS',
            'Git',
            'Docker',
            'AWS',
            'Redux'
        ];

        user.profile.experiences = [
            {
                title: 'Full Stack Developer Intern',
                company: 'TechCorp Solutions',
                duration: 'June 2023 - August 2023',
                description: 'Developed and maintained web applications using MERN stack. Collaborated with cross-functional teams to deliver high-quality software solutions. Improved application performance by 30% through code optimization.'
            },
            {
                title: 'Frontend Developer',
                company: 'StartupXYZ',
                duration: 'January 2023 - May 2023',
                description: 'Built responsive user interfaces using React.js and Tailwind CSS. Integrated RESTful APIs and implemented state management using Redux. Enhanced user experience through intuitive design patterns.'
            }
        ];

        user.profile.projects = [
            {
                title: 'Job Portal Platform',
                description: 'Developed a comprehensive job portal using MERN stack with features like user authentication, job posting, application tracking, and resume generation. Implemented role-based access control and real-time notifications.',
                technologies: 'MongoDB, Express.js, React.js, Node.js, JWT, Cloudinary',
                link: 'https://github.com/vikastg/job-portal'
            },
            {
                title: 'E-commerce Website',
                description: 'Built a full-featured e-commerce platform with shopping cart, payment integration, order management, and admin dashboard. Implemented secure payment processing and inventory management.',
                technologies: 'React.js, Node.js, Stripe API, MongoDB, Redis',
                link: 'https://github.com/vikastg/ecommerce'
            },
            {
                title: 'Machine Learning Stock Predictor',
                description: 'Developed a machine learning model to predict stock prices using historical data and technical indicators. Built a web interface for users to visualize predictions and trends.',
                technologies: 'Python, TensorFlow, Pandas, Flask, Chart.js',
                link: 'https://github.com/vikastg/stock-predictor'
            }
        ];

        user.profile.certifications = [
            {
                name: 'AWS Certified Cloud Practitioner',
                issuer: 'Amazon Web Services',
                date: 'September 2023'
            },
            {
                name: 'MongoDB Developer Certification',
                issuer: 'MongoDB University',
                date: 'July 2023'
            },
            {
                name: 'React Developer Certification',
                issuer: 'Coursera',
                date: 'May 2023'
            }
        ];

        await user.save();

        console.log('✅ Sample data added to your profile successfully!');
        console.log('Profile now includes:');
        console.log('- Skills:', user.profile.skills.length);
        console.log('- Experiences:', user.profile.experiences.length);
        console.log('- Projects:', user.profile.projects.length);
        console.log('- Certifications:', user.profile.certifications.length);
        console.log('\nNow you can test resume generation with comprehensive data!');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Database disconnected');
    }
};

addDataToYourUser();
