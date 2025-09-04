import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const createPatelUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Check if patel user already exists
        const existingUser = await User.findOne({ email: 'patel@gmail.com' });
        if (existingUser) {
            console.log('Patel user already exists');
            console.log('Email: patel@gmail.com');
            console.log('Role:', existingUser.role);
            console.log('Password: patel@gmail.com (same as email)');
            await mongoose.connection.close();
            process.exit(0);
        }

        // Create patel user
        const hashedPassword = await bcrypt.hash('patel@gmail.com', 10);
        
        const patelUser = await User.create({
            fullname: 'Patel User',
            email: 'patel@gmail.com',
            phoneNumber: 9876543210,
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

        console.log('Patel user created successfully!');
        console.log('Email: patel@gmail.com');
        console.log('Password: patel@gmail.com');
        console.log('Role: student');
        
        await mongoose.connection.close();
        console.log('Database connection closed');
        
    } catch (error) {
        console.error('Error creating user:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
};

createPatelUser();
