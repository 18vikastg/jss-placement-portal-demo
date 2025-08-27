import mongoose from 'mongoose';
import { PreparationResource } from '../models/preparationResource.model.js';
import { preparationResources } from './seedPreparationData.js';

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jobportal';

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB successfully!');

        // Clear existing resources
        console.log('🧹 Clearing existing preparation resources...');
        await PreparationResource.deleteMany({});
        console.log('✅ Existing resources cleared!');
        
        // Insert new resources
        console.log('📥 Inserting new preparation resources...');
        await PreparationResource.insertMany(preparationResources);
        
        console.log("✅ Preparation resources seeded successfully!");
        console.log(`📊 Inserted ${preparationResources.length} resources`);
        
        // Log category breakdown
        const categoryBreakdown = preparationResources.reduce((acc, resource) => {
            acc[resource.category] = (acc[resource.category] || 0) + 1;
            return acc;
        }, {});
        
        console.log("📈 Category breakdown:", categoryBreakdown);
        
        // Show some sample resources
        console.log("\n🔍 Sample resources with updated URLs:");
        const sampleResources = preparationResources.slice(0, 5);
        sampleResources.forEach(resource => {
            console.log(`- ${resource.title} → ${resource.url}`);
        });
        
    } catch (error) {
        console.error("❌ Error seeding preparation resources:", error);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log('🔒 Database connection closed');
        process.exit(0);
    }
};

// Run the seeding
seedDatabase();
