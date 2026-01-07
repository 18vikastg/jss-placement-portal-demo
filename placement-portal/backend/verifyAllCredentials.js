import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './models/user.model.js';
import { Faculty } from './models/faculty.model.js';
import { Recruiter } from './models/recruiter.model.js';
import dotenv from 'dotenv';

dotenv.config();

const verifyAllCredentials = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jobportal');
        console.log('✅ Connected to MongoDB\n');

        console.log('═══════════════════════════════════════════════════════');
        console.log('           🔐 ALL LOGIN CREDENTIALS VERIFIED           ');
        console.log('═══════════════════════════════════════════════════════\n');

        // 1. Check Student
        console.log('1️⃣  🎓 STUDENT LOGIN');
        console.log('   ─────────────────────────────────');
        const student = await User.findOne({ email: 'vikastg2000@gmail.com' });
        if (student) {
            const isMatch = await bcrypt.compare('@Vikas123', student.password);
            console.log('   📧 Email:    vikastg2000@gmail.com');
            console.log('   🔑 Password: @Vikas123');
            console.log('   👤 Role:     student');
            console.log('   ✅ Status:   ' + (isMatch ? '✅ WORKING' : '❌ PASSWORD MISMATCH'));
            console.log('   👨‍🎓 Name:     ' + student.fullname);
        } else {
            console.log('   ❌ Student account not found!\n');
        }

        // 2. Check Faculty
        console.log('\n2️⃣  👨‍🏫 FACULTY LOGIN');
        console.log('   ─────────────────────────────────');
        const faculty = await Faculty.findOne({ email: 'faculty@jssateb.ac.in' });
        if (faculty) {
            const isMatch = await bcrypt.compare('faculty123', faculty.password);
            console.log('   📧 Email:    faculty@jssateb.ac.in');
            console.log('   🔑 Password: faculty123');
            console.log('   👤 Role:     faculty');
            console.log('   ✅ Status:   ' + (isMatch ? '✅ WORKING' : '❌ PASSWORD MISMATCH'));
            console.log('   👨‍🏫 Name:     ' + faculty.fullName);
        } else {
            console.log('   ❌ Faculty account not found!');
            console.log('   💡 Creating faculty account...');
            
            const hashedPassword = await bcrypt.hash('faculty123', 10);
            const newFaculty = await Faculty.create({
                fullName: 'Dr. Faculty JSS',
                email: 'faculty@jssateb.ac.in',
                phoneNumber: '9876543210',
                password: hashedPassword,
                department: 'Computer Science',
                designation: 'Professor',
                employeeId: 'FAC001'
            });
            console.log('   ✅ Faculty account created successfully!');
        }

        // 3. Check Recruiter
        console.log('\n3️⃣  🏢 RECRUITER LOGIN');
        console.log('   ─────────────────────────────────');
        const recruiter = await Recruiter.findOne({ email: 'recruiter@company.com' });
        if (recruiter) {
            const isMatch = await bcrypt.compare('recruiter123', recruiter.password);
            console.log('   📧 Email:    recruiter@company.com');
            console.log('   🔑 Password: recruiter123');
            console.log('   👤 Role:     recruiter');
            console.log('   ✅ Status:   ' + (isMatch ? '✅ WORKING' : '❌ PASSWORD MISMATCH'));
            console.log('   👔 Name:     ' + recruiter.fullName);
        } else {
            console.log('   ❌ Recruiter account not found!');
            console.log('   💡 Creating recruiter account...');
            
            const hashedPassword = await bcrypt.hash('recruiter123', 10);
            const newRecruiter = await Recruiter.create({
                fullName: 'HR Recruiter',
                email: 'recruiter@company.com',
                phoneNumber: '9876543211',
                password: hashedPassword,
                designation: 'Senior HR Manager'
            });
            console.log('   ✅ Recruiter account created successfully!');
        }

        console.log('\n═══════════════════════════════════════════════════════');
        console.log('                     ✅ ALL SET!                       ');
        console.log('═══════════════════════════════════════════════════════');
        console.log('\n🌐 You can now login at: http://localhost:5173/login\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

verifyAllCredentials();
