import mongoose from 'mongoose';
import { Company } from './models/company.model.js';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jobportal');

const createTestCompany = async () => {
    try {
        const company = new Company({
            name: "Test Tech Corp",
            description: "A test technology company",
            industry: "Technology",
            companySize: "1000-5000",
            foundedYear: 2020,
            headquarters: {
                city: "Bangalore",
                state: "Karnataka", 
                country: "India"
            },
            website: "https://testtech.com",
            userId: new mongoose.Types.ObjectId() // Random user ID
        });

        const savedCompany = await company.save();
        console.log('Test company created:', savedCompany._id);
        return savedCompany._id;
    } catch (error) {
        console.error('Error creating company:', error);
    } finally {
        mongoose.connection.close();
    }
};

createTestCompany();
