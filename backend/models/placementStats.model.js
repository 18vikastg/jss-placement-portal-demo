import mongoose from "mongoose";

const placementStatsSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
        unique: true
    },
    totalUGPlaced: {
        type: Number,
        required: true
    },
    totalPGPlaced: {
        type: Number,
        required: true
    },
    totalUGEligible: {
        type: Number,
        required: true
    },
    totalPGEligible: {
        type: Number,
        required: true
    },
    placementPercentageUG: {
        type: Number,
        required: true
    },
    placementPercentagePG: {
        type: Number,
        required: true
    },
    overallPlacementPercentage: {
        type: Number,
        required: true
    },
    medianPackageUG: {
        type: Number,
        required: true
    },
    medianPackagePG: {
        type: Number,
        required: true
    },
    averagePackage: {
        type: Number,
        required: true
    },
    highestPackage: {
        type: Number,
        required: true
    },
    lowestPackage: {
        type: Number,
        required: true
    },
    totalOffers: {
        type: Number,
        required: true
    },
    totalCompanies: {
        type: Number,
        required: true
    },
    topRecruiters: [{
        name: {
            type: String,
            required: true
        },
        domain: {
            type: String,
            required: true
        },
        logo: {
            type: String,
            default: null
        }
    }],
    departmentWiseStats: [{
        department: {
            type: String,
            required: true
        },
        totalStudents: {
            type: Number,
            required: true
        },
        studentsPlaced: {
            type: Number,
            required: true
        },
        placementPercentage: {
            type: Number,
            required: true
        },
        highestPackage: {
            type: Number,
            required: true
        },
        averagePackage: {
            type: Number,
            required: true
        }
    }],
    trainingActivities: [{
        type: String,
        required: true
    }],
    placementHighlights: [{
        type: String,
        required: true
    }],
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Compound index for efficient queries
placementStatsSchema.index({ year: -1, isActive: 1 });

export const PlacementStats = mongoose.model("PlacementStats", placementStatsSchema);
