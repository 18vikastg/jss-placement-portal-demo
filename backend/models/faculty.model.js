import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
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
        enum: ['faculty'],
        default: 'faculty'
    },
    department: {
        type: String,
        required: true,
        enum: ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'Chemical', 'Other']
    },
    designation: {
        type: String,
        required: true,
        enum: ['Assistant Professor', 'Associate Professor', 'Professor', 'HOD', 'Dean', 'Placement Officer']
    },
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    experience: {
        type: Number, // years of experience
        default: 0
    },
    specialization: [{
        type: String
    }],
    profile: {
        bio: { type: String },
        profilePhoto: { type: String }
    },
    permissions: {
        canViewAllStudents: { type: Boolean, default: true },
        canViewApplications: { type: Boolean, default: true },
        canManageDrives: { type: Boolean, default: false }, // Only placement officers
        canGenerateReports: { type: Boolean, default: true }
    },
    assignedDepartments: [{
        type: String,
        enum: ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'Chemical', 'All']
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export const Faculty = mongoose.model("Faculty", facultySchema);
