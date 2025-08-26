import mongoose from "mongoose";

const studyPlanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    targetRole: {
        type: String,
        required: true
    },
    targetCompanies: [{
        type: String
    }],
    timelineWeeks: {
        type: Number,
        required: true,
        min: 1,
        max: 52
    },
    weeklyHours: {
        type: Number,
        required: true,
        min: 1,
        max: 40
    },
    focusAreas: [{
        category: {
            type: String,
            required: true
        },
        priority: {
            type: String,
            enum: ['High', 'Medium', 'Low'],
            required: true
        },
        allocatedHours: {
            type: Number,
            required: true
        }
    }],
    milestones: [{
        week: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        completedDate: {
            type: Date
        }
    }],
    recommendedResources: [{
        resourceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PreparationResource'
        },
        week: {
            type: Number
        },
        priority: {
            type: String,
            enum: ['Must Complete', 'Recommended', 'Optional']
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export const StudyPlan = mongoose.model("StudyPlan", studyPlanSchema);
