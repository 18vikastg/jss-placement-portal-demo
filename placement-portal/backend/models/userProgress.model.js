import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resourceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PreparationResource',
        required: true
    },
    status: {
        type: String,
        enum: ['not_started', 'in_progress', 'completed'],
        default: 'not_started'
    },
    progressPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    timeSpent: {
        type: Number, // in minutes
        default: 0
    },
    lastAccessedAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date
    },
    notes: {
        type: String
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    isBookmarked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Compound index for user progress tracking
userProgressSchema.index({ userId: 1, resourceId: 1 }, { unique: true });

export const UserProgress = mongoose.model("UserProgress", userProgressSchema);
