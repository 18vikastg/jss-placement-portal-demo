import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    locations: [{
        city: { type: String },
        state: { type: String },
        country: { type: String },
        isHeadquarters: { type: Boolean, default: false }
    }],
    logo: {
        type: String // URL to company logo
    },
    industry: {
        type: String,
        required: true,
        enum: ['Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Consulting', 'E-commerce', 'Telecommunications', 'Other']
    },
    companySize: {
        type: String,
        enum: ['Startup (1-50)', 'Small (51-200)', 'Medium (201-1000)', 'Large (1000+)'],
        required: true
    },
    founded: {
        type: Number
    },
    details: {
        about: { type: String },
        mission: { type: String },
        vision: { type: String },
        values: [{ type: String }],
        culture: { type: String }
    },
    contact: {
        email: { type: String, required: true },
        phone: { type: String },
        address: { type: String },
        hrContact: {
            name: { type: String },
            email: { type: String },
            phone: { type: String }
        }
    },
    socialMedia: {
        linkedin: { type: String },
        twitter: { type: String },
        facebook: { type: String },
        instagram: { type: String }
    },
    placementHistory: {
        previousVisits: [{
            year: { type: Number },
            rolesOffered: [{ type: String }],
            studentsHired: { type: Number },
            averagePackage: { type: Number }
        }],
        totalStudentsHired: { type: Number, default: 0 },
        averageRating: { type: Number, min: 0, max: 5 }
    },
    verification: {
        isVerified: { type: Boolean, default: false },
        verifiedBy: { type: String },
        verificationDate: { type: Date },
        documents: [{
            type: { type: String },
            url: { type: String },
            uploadedAt: { type: Date, default: Date.now }
        }]
    },
    settings: {
        isActive: { type: Boolean, default: true },
        allowApplications: { type: Boolean, default: true },
        autoApproveApplications: { type: Boolean, default: false }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Company = mongoose.model("Company", companySchema);