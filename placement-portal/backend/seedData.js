import mongoose from 'mongoose';
import { seedPreparationResources } from './utils/seedPreparationData.js';

const databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jobportal', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("📦 MongoDB connected successfully");
        
        // Seed the preparation resources
        seedPreparationResources().then(() => {
            console.log("🎉 Database seeding completed!");
            process.exit(0);
        }).catch(error => {
            console.error("❌ Seeding failed:", error);
            process.exit(1);
        });
        
    }).catch((error) => {
        console.log("❌ MongoDB connection failed:", error);
        process.exit(1);
    });
};

databaseConnection();
