// Test script to create a basic company for testing recruiter registration
import { Company } from './backend/models/company.model.js';
import connectDB from './backend/utils/db.js';

const createTestCompany = async () => {
    try {
        await connectDB();
        
        const company = new Company({
            name: "TechCorp Solutions",
            description: "Leading technology solutions provider",
            website: "https://techcorp.com",
            location: "Bangalore, India",
            logo: "default-logo.png"
        });
        
        const savedCompany = await company.save();
        console.log('Test company created:', savedCompany);
        console.log('Company ID:', savedCompany._id);
        
        process.exit(0);
    } catch (error) {
        console.error('Error creating company:', error);
        process.exit(1);
    }
};

createTestCompany();
