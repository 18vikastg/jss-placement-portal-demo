import mongoose from "mongoose";

const preparationResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Aptitude',
            'Coding & DSA', 
            'Mock Interviews',
            'Communication Skills',
            'Company Specific',
            'Career Growth & Resume'
        ]
    },
    subcategory: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Video', 'Article', 'Practice Test', 'Course', 'Tool', 'PDF', 'Website']
    },
    url: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    duration: {
        type: String // e.g., "2 hours", "10 weeks", "Self-paced"
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 4.0
    },
    tags: [{
        type: String
    }],
    estimatedTime: {
        type: String // e.g., "30 mins", "2 hours"
    },
    prerequisites: {
        type: String
    },
    learningOutcomes: [{
        type: String
    }],
    companySpecific: [{
        type: String // Company names for company-specific resources
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for search functionality
preparationResourceSchema.index({ title: 'text', description: 'text', tags: 'text' });

export const PreparationResource = mongoose.model("PreparationResource", preparationResourceSchema);
