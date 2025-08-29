import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['recruiter'],
        default: 'recruiter'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: false  // Changed from true to false to allow signup without company
    },
    designation: {
        type: String,
        required: false,  // Changed from true to false to allow signup without designation
        default: 'Recruiter'
    },
    profile: {
        bio: { type: String },
        profilePhoto: { type: String },
        linkedIn: { type: String },
        experience: { type: Number }
    },
    permissions: {
        canCreateDrives: { type: Boolean, default: true },
        canViewApplications: { type: Boolean, default: true },
        canShortlistStudents: { type: Boolean, default: true },
        canUpdateResults: { type: Boolean, default: true },
        canManageCompany: { type: Boolean, default: false }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
    }
}, {
    timestamps: true
});

export const Recruiter = mongoose.model("Recruiter", recruiterSchema);
