import mongoose from 'mongoose';
import { User } from './models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const checkUserData = async () => {
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

        console.log('Current user profile data:');
        console.log('Basic Info:', {
            fullname: user.fullname,
            email: user.email,
            bio: user.profile?.bio,
            branch: user.profile?.branch,
            semester: user.profile?.semester,
            cgpa: user.profile?.cgpa
        });
        
        console.log('Skills:', user.profile?.skills);
        console.log('Skills type:', typeof user.profile?.skills);
        console.log('Skills length:', user.profile?.skills?.length);
        
        console.log('Experiences:', user.profile?.experiences);
        console.log('Experiences type:', typeof user.profile?.experiences);
        console.log('Experiences length:', user.profile?.experiences?.length);
        
        console.log('Projects:', user.profile?.projects);
        console.log('Projects type:', typeof user.profile?.projects);
        console.log('Projects length:', user.profile?.projects?.length);
        
        console.log('Certifications:', user.profile?.certifications);
        console.log('Certifications type:', typeof user.profile?.certifications);
        console.log('Certifications length:', user.profile?.certifications?.length);
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkUserData();
