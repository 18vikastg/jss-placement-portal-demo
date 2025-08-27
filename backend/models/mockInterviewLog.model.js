import mongoose from "mongoose";

const mockInterviewLogSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        required: true,
        enum: ['page_access', 'start_interview_clicked']
    },
    accessedAt: {
        type: Date,
        default: Date.now
    },
    userAgent: {
        type: String
    },
    ipAddress: {
        type: String
    },
    sessionId: {
        type: String
    }
}, {
    timestamps: true
});

// Index for better query performance
mockInterviewLogSchema.index({ studentId: 1, accessedAt: -1 });
mockInterviewLogSchema.index({ action: 1, accessedAt: -1 });

export const MockInterviewLog = mongoose.model("MockInterviewLog", mockInterviewLogSchema);
