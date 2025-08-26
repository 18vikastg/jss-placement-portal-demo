import mongoose from "mongoose";

// Project Schema for detailed project information
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String }],
    githubLink: { type: String },
    liveLink: { type: String },
    duration: { type: String }, // e.g., "3 months"
    role: { type: String } // e.g., "Full Stack Developer"
});

// Document Schema for certificates and documents
const documentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['certificate', 'internship', 'training', 'achievement'], required: true },
    fileUrl: { type: String, required: true },
    issuedBy: { type: String },
    issuedDate: { type: Date },
    description: { type: String }
});

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['student','faculty','recruiter'],
        required:true
    },
    profile:{
        bio:{type:String},
        profilePhoto:{
            type:String,
            default:""
        },
        // Profile completion tracking
        profileCompletion: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },
        lastUpdated: {
            type: Date,
            default: Date.now
        },
        
        // Personal Information (20% weight)
        personalInfo: {
            usn: { type: String }, // University Seat Number
            alternatePhone: { type: String },
            address: {
                permanent: { type: String },
                current: { type: String }
            },
            dateOfBirth: { type: Date },
            gender: { type: String, enum: ['Male', 'Female', 'Other'] },
            bloodGroup: { type: String },
            fatherName: { type: String },
            motherName: { type: String },
            guardianContact: { type: String }
        },
        
        // Academic Information (20% weight)
        academicInfo: {
            department: { type: String }, // CSE, ECE, etc.
            batch: { type: String }, // Graduation year
            semester: { type: Number },
            cgpa: { type: Number },
            percentage: { type: Number },
            tenthMarks: { 
                percentage: { type: Number },
                board: { type: String },
                yearOfPassing: { type: Number }
            },
            twelfthMarks: {
                percentage: { type: Number },
                board: { type: String },
                yearOfPassing: { type: Number }
            },
            backlogs: {
                count: { type: Number, default: 0 },
                subjects: [{ type: String }]
            },
            achievements: [{ type: String }]
        },
        
        // Skills & Projects (20% weight)
        skillsAndProjects: {
            programmingLanguages: [{ type: String }],
            frameworks: [{ type: String }],
            databases: [{ type: String }],
            tools: [{ type: String }],
            certifications: [{
                name: { type: String },
                provider: { type: String },
                completionDate: { type: Date },
                certificateUrl: { type: String }
            }],
            projects: [projectSchema]
        },
        
        // Documents (20% weight)
        documents: {
            resume: {
                fileUrl: { type: String },
                fileName: { type: String },
                uploadDate: { type: Date }
            },
            profilePicture: {
                fileUrl: { type: String },
                fileName: { type: String }
            },
            certificates: [documentSchema],
            internships: [{
                company: { type: String },
                position: { type: String },
                duration: { type: String },
                description: { type: String },
                certificateUrl: { type: String },
                startDate: { type: Date },
                endDate: { type: Date }
            }]
        },
        
        // Placement Preferences (20% weight)
        placementPreferences: {
            interestedDomains: [{ 
                type: String,
                enum: ['Software Development', 'Data Science', 'AI/ML', 'Cybersecurity', 'Cloud Computing', 'Mobile Development', 'DevOps', 'Product Management', 'Consulting', 'Finance', 'Analytics', 'Other']
            }],
            jobTypes: [{
                type: String,
                enum: ['Full-time', 'Internship', 'Part-time', 'Contract']
            }],
            locationPreferences: [{ type: String }],
            expectedSalary: {
                min: { type: Number },
                max: { type: Number },
                currency: { type: String, default: 'INR' }
            },
            workPreference: {
                type: String,
                enum: ['On-site', 'Remote', 'Hybrid', 'No Preference']
            },
            companySize: [{
                type: String,
                enum: ['Startup', 'Mid-size', 'Large Enterprise', 'MNC']
            }]
        },
        
        // For non-student roles
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'},
        designation:{type:String}, // For faculty/recruiters
        employeeId:{type:String} // For faculty
    }
},{timestamps:true});

export const User = mongoose.model('User', userSchema);