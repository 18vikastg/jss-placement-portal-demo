import { seedPreparationResources } from "./utils/seedPreparationData.js";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";

dotenv.config({});

const runSeeder = async () => {
    try {
        await connectDB();
        console.log("🔗 Connected to database");
        
        await seedPreparationResources();
        
        console.log("✅ Seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};

runSeeder();
