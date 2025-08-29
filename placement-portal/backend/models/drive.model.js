import mongoose from "mongoose";

const driveSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    jobRole: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        eligibleDepartments: [{
            type: String,
            enum: ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'Chemical']
        }],
        minimumCGPA: {
            type: Number,
            required: true,
            min: 0,
            max: 10
        },
        maximumBacklogs: {
            type: Number,
            default: 0
        },
        graduationYear: [{
            type: Number
        }],
        skillsRequired: [{
            type: String
        }],
        experienceRequired: {
            type: Number,
            default: 0
        }
    },
    package: {
        ctc: {
            type: Number,
            required: true
        },
        basePay: {
            type: Number
        },
        benefits: [{
            type: String
        }],
        bond: {
            duration: { type: Number }, // in months
            amount: { type: Number }
        }
    },
    process: {
        rounds: [{
            name: { type: String, required: true },
            type: { 
                type: String, 
                enum: ['Online Test', 'Technical Interview', 'HR Interview', 'Group Discussion', 'Presentation', 'Assignment'],
                required: true 
            },
            duration: { type: Number }, // in minutes
            description: { type: String }
        }],
        totalDuration: { type: String } // e.g., "2 days"
    },
    schedule: {
        registrationDeadline: {
            type: Date,
            required: true
        },
        driveDate: {
            type: Date,
            required: true
        },
        resultDate: {
            type: Date
        },
        venue: {
            type: String,
            default: 'Campus'
        }
    },
    status: {
        type: String,
        enum: ['Draft', 'Published', 'Registration Open', 'Registration Closed', 'Ongoing', 'Completed', 'Cancelled'],
        default: 'Draft'
    },
    applicants: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        appliedAt: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['Applied', 'Shortlisted', 'Round 1', 'Round 2', 'Round 3', 'Final Round', 'Selected', 'Rejected', 'Withdrawn'],
            default: 'Applied'
        },
        roundResults: [{
            round: { type: String },
            status: { type: String, enum: ['Pass', 'Fail', 'Pending'] },
            score: { type: Number },
            feedback: { type: String },
            date: { type: Date, default: Date.now }
        }],
        finalResult: {
            status: { type: String, enum: ['Selected', 'Rejected', 'Waitlisted'] },
            package: { type: Number },
            joiningDate: { type: Date },
            feedback: { type: String }
        }
    }],
    statistics: {
        totalApplications: { type: Number, default: 0 },
        shortlisted: { type: Number, default: 0 },
        selected: { type: Number, default: 0 },
        avgCGPA: { type: Number },
        departmentWise: [{
            department: { type: String },
            applied: { type: Number },
            selected: { type: Number }
        }]
    },
    settings: {
        autoShortlist: { type: Boolean, default: false },
        maxApplications: { type: Number },
        emailNotifications: { type: Boolean, default: true },
        allowWithdrawal: { type: Boolean, default: true }
    }
}, {
    timestamps: true
});

// Update statistics before saving
driveSchema.pre('save', function() {
    this.statistics.totalApplications = this.applicants.length;
    this.statistics.shortlisted = this.applicants.filter(app => 
        ['Shortlisted', 'Round 1', 'Round 2', 'Round 3', 'Final Round', 'Selected'].includes(app.status)
    ).length;
    this.statistics.selected = this.applicants.filter(app => app.status === 'Selected').length;
});

export const Drive = mongoose.model("Drive", driveSchema);
