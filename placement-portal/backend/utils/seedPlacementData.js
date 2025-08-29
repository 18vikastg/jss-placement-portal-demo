import mongoose from "mongoose";
import { PlacementStats } from "../models/placementStats.model.js";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const placementData = [
    {
        year: 2023,
        totalUGPlaced: 385,
        totalPGPlaced: 45,
        totalUGEligible: 450,
        totalPGEligible: 50,
        placementPercentageUG: 85.6,
        placementPercentagePG: 90.0,
        overallPlacementPercentage: 86.0,
        medianPackageUG: 5.2,
        medianPackagePG: 8.5,
        averagePackage: 6.8,
        highestPackage: 43.17,
        lowestPackage: 3.2,
        totalOffers: 456,
        totalCompanies: 125,
        topRecruiters: [
            { name: "TCS", domain: "IT Services" },
            { name: "Infosys", domain: "IT Services" },
            { name: "Wipro", domain: "IT Services" },
            { name: "Accenture", domain: "Consulting" },
            { name: "Cognizant", domain: "IT Services" },
            { name: "IBM", domain: "Technology" },
            { name: "Microsoft", domain: "Technology" },
            { name: "Amazon", domain: "E-commerce/Cloud" },
            { name: "Deloitte", domain: "Consulting" },
            { name: "Capgemini", domain: "Consulting" },
            { name: "HCL Technologies", domain: "IT Services" },
            { name: "Tech Mahindra", domain: "IT Services" },
            { name: "L&T Infotech", domain: "IT Services" },
            { name: "Mindtree", domain: "IT Services" },
            { name: "Oracle", domain: "Software" },
            { name: "SAP Labs", domain: "Enterprise Software" },
            { name: "VMware", domain: "Cloud Infrastructure" },
            { name: "Cisco", domain: "Networking" },
            { name: "Intel", domain: "Semiconductors" },
            { name: "Qualcomm", domain: "Telecommunications" }
        ],
        departmentWiseStats: [
            {
                department: "Computer Science and Engineering",
                totalStudents: 120,
                studentsPlaced: 108,
                placementPercentage: 90.0,
                highestPackage: 43.17,
                averagePackage: 8.2
            },
            {
                department: "Information Science and Engineering",
                totalStudents: 90,
                studentsPlaced: 81,
                placementPercentage: 90.0,
                highestPackage: 28.5,
                averagePackage: 7.8
            },
            {
                department: "Electronics and Communication Engineering",
                totalStudents: 80,
                studentsPlaced: 68,
                placementPercentage: 85.0,
                highestPackage: 18.5,
                averagePackage: 6.2
            },
            {
                department: "Mechanical Engineering",
                totalStudents: 80,
                studentsPlaced: 64,
                placementPercentage: 80.0,
                highestPackage: 12.5,
                averagePackage: 5.8
            },
            {
                department: "Electronics and Instrumentation Engineering",
                totalStudents: 40,
                studentsPlaced: 32,
                placementPercentage: 80.0,
                highestPackage: 15.2,
                averagePackage: 6.0
            },
            {
                department: "Civil Engineering",
                totalStudents: 40,
                studentsPlaced: 32,
                placementPercentage: 80.0,
                highestPackage: 8.5,
                averagePackage: 4.8
            }
        ],
        trainingActivities: [
            "Aptitude and Reasoning Training",
            "Technical Interview Preparation",
            "Group Discussion Training",
            "Soft Skills Development",
            "Communication Skills Enhancement",
            "Mock Interviews with Industry Experts",
            "Resume Building Workshops",
            "Industry-oriented Technical Training",
            "Personality Development Programs",
            "Leadership Skills Training",
            "Pre-placement Talk Sessions",
            "Career Guidance and Counseling",
            "Industrial Visits and Exposure",
            "Guest Lectures by Industry Professionals",
            "Coding and Programming Contests",
            "Project-based Learning Initiatives"
        ],
        placementHighlights: [
            "Record highest package of ₹43.17 LPA achieved",
            "Overall placement percentage improved to 86%",
            "125+ companies participated in placement drives",
            "456 total offers received by students",
            "Strong industry partnerships established",
            "100% placement assistance provided",
            "Dedicated Training & Placement Cell support",
            "Industry-aligned curriculum and training",
            "Regular skill enhancement programs",
            "Alumni network support for placements"
        ]
    },
    {
        year: 2022,
        totalUGPlaced: 360,
        totalPGPlaced: 42,
        totalUGEligible: 440,
        totalPGEligible: 48,
        placementPercentageUG: 81.8,
        placementPercentagePG: 87.5,
        overallPlacementPercentage: 82.4,
        medianPackageUG: 4.8,
        medianPackagePG: 7.8,
        averagePackage: 6.2,
        highestPackage: 32.5,
        lowestPackage: 3.0,
        totalOffers: 425,
        totalCompanies: 110,
        topRecruiters: [
            { name: "TCS", domain: "IT Services" },
            { name: "Infosys", domain: "IT Services" },
            { name: "Wipro", domain: "IT Services" },
            { name: "Accenture", domain: "Consulting" },
            { name: "Cognizant", domain: "IT Services" },
            { name: "IBM", domain: "Technology" },
            { name: "Capgemini", domain: "Consulting" },
            { name: "HCL Technologies", domain: "IT Services" },
            { name: "Tech Mahindra", domain: "IT Services" },
            { name: "L&T Infotech", domain: "IT Services" }
        ],
        departmentWiseStats: [
            {
                department: "Computer Science and Engineering",
                totalStudents: 118,
                studentsPlaced: 103,
                placementPercentage: 87.3,
                highestPackage: 32.5,
                averagePackage: 7.8
            },
            {
                department: "Information Science and Engineering",
                totalStudents: 88,
                studentsPlaced: 76,
                placementPercentage: 86.4,
                highestPackage: 24.5,
                averagePackage: 7.2
            }
        ],
        trainingActivities: [
            "Aptitude and Reasoning Training",
            "Technical Interview Preparation",
            "Group Discussion Training",
            "Soft Skills Development",
            "Mock Interviews with Industry Experts",
            "Resume Building Workshops",
            "Industry-oriented Technical Training",
            "Personality Development Programs"
        ],
        placementHighlights: [
            "Highest package of ₹32.5 LPA achieved",
            "Overall placement percentage of 82.4%",
            "110+ companies participated",
            "425 total offers received",
            "Strong industry partnerships"
        ]
    }
];

const seedPlacementData = async () => {
    try {
        await connectDB();
        
        // Clear existing data
        await PlacementStats.deleteMany({});
        console.log('Existing placement data cleared');
        
        // Insert new data
        await PlacementStats.insertMany(placementData);
        console.log('Placement data seeded successfully');
        
        console.log(`Seeded ${placementData.length} years of placement statistics`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding placement data:', error);
        process.exit(1);
    }
};

seedPlacementData();
