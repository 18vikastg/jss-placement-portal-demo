import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const resetPassword = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jobportal');
        console.log('✅ Connected to MongoDB');

        // Find the user
        const user = await User.findOne({ email: 'vikastg2000@gmail.com' });
        
        if (!user) {
            console.log('❌ User not found with email: vikastg2000@gmail.com');
            console.log('📝 Creating new user...');
            
            // Create new user with the password
            const hashedPassword = await bcrypt.hash('@Vikas123', 10);
            
            const newUser = await User.create({
                fullname: 'Vikas TG',
                email: 'vikastg2000@gmail.com',
                phoneNumber: 9876543210,
                password: hashedPassword,
                role: 'student',
                profile: {
                    bio: 'Computer Science Student',
                    profilePhoto: '',
                    skills: [],
                    resume: '',
                    resumeOriginalName: '',
                    company: null
                }
            });
            
            console.log('✅ New user created successfully!');
            console.log('📧 Email: vikastg2000@gmail.com');
            console.log('🔑 Password: @Vikas123');
            console.log('👤 Role: student');
        } else {
            console.log('✅ User found!');
            console.log('Current user:', {
                email: user.email,
                fullname: user.fullname,
                role: user.role
            });
            
            // Hash the new password
            const hashedPassword = await bcrypt.hash('@Vikas123', 10);
            
            // Update the password
            user.password = hashedPassword;
            await user.save();
            
            console.log('✅ Password updated successfully!');
            console.log('📧 Email: vikastg2000@gmail.com');
            console.log('🔑 Password: @Vikas123');
            console.log('👤 Role: student');
        }
        
        // Verify the password works
        const updatedUser = await User.findOne({ email: 'vikastg2000@gmail.com' });
        const isMatch = await bcrypt.compare('@Vikas123', updatedUser.password);
        console.log('\n🔍 Password verification:', isMatch ? '✅ SUCCESS' : '❌ FAILED');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

resetPassword();
