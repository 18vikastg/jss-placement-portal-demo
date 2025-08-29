import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const createTestUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Check if test user already exists
        const existingUser = await User.findOne({ email: 'test@student.com' });
        if (existingUser) {
            console.log('Test user already exists');
            console.log('Email: test@student.com');
            console.log('Password: password123');
            process.exit(0);
        }

        // Create test user
        const hashedPassword = await bcrypt.hash('password123', 10);
        
        const testUser = await User.create({
            fullname: 'Test Student',
            email: 'test@student.com',
            phoneNumber: 1234567890,
            password: hashedPassword,
            role: 'student',
            profile: {
                bio: '',
                profilePhoto: '',
                skills: [],
                branch: '',
                semester: null,
                cgpa: null,
                university: 'JSS Academy of Technical Education',
                year: '',
                address: '',
                experiences: [],
                projects: [],
                certifications: [],
                socialLinks: {
                    github: '',
                    linkedin: '',
                    portfolio: ''
                }
            }
        });

        console.log('Test user created successfully!');
        console.log('Email: test@student.com');
        console.log('Password: password123');
        console.log('Role: student');
        console.log('You can now login with these credentials to test the profile update functionality.');
        
        process.exit(0);
    } catch (error) {
        console.error('Error creating test user:', error);
        process.exit(1);
    }
};

createTestUser();
