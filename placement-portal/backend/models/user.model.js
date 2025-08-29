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
// Enhanced Profile Schema with proper validation
    profile:{
        bio:{type:String},
        profilePhoto:{
            type:String,
            default:""
        },
        // Simple fields for basic profile (compatibility with existing frontend)
        skills: {
            type: [String],
            default: [],
            validate: {
                validator: function(arr) {
                    return Array.isArray(arr);
                },
                message: 'Skills must be an array of strings'
            }
        },
        branch: { type: String },
        semester: { type: Number },
        cgpa: { type: Number },
        university: { type: String, default: 'JSS Academy of Technical Education' },
        year: { type: String },
        address: { type: String },
        dateOfBirth: { type: Date },
        resume: { type: String },
        resumeOriginalName: { type: String },
        
        // Advanced structured fields with proper validation
        experiences: {
            type: [{
                title: { 
                    type: String, 
                    required: function() { return this.parent().length > 0; },
                    trim: true 
                },
                company: { 
                    type: String, 
                    required: function() { return this.parent().length > 0; },
                    trim: true 
                },
                duration: { type: String, trim: true },
                description: { type: String, trim: true },
                id: { type: Number }
            }],
            default: [],
            validate: {
                validator: function(arr) {
                    return Array.isArray(arr);
                },
                message: 'Experiences must be an array'
            }
        },
        
        projects: {
            type: [{
                title: { 
                    type: String, 
                    required: function() { return this.parent().length > 0; },
                    trim: true 
                },
                description: { 
                    type: String, 
                    required: function() { return this.parent().length > 0; },
                    trim: true 
                },
                technologies: { type: String, trim: true },
                link: { type: String, trim: true },
                id: { type: Number }
            }],
            default: [],
            validate: {
                validator: function(arr) {
                    return Array.isArray(arr);
                },
                message: 'Projects must be an array'
            }
        },
        
        certifications: {
            type: [{
                name: { 
                    type: String, 
                    required: function() { return this.parent().length > 0; },
                    trim: true 
                },
                issuer: { type: String, trim: true },
                date: { type: String, trim: true },
                id: { type: Number }
            }],
            default: [],
            validate: {
                validator: function(arr) {
                    return Array.isArray(arr);
                },
                message: 'Certifications must be an array'
            }
        },
        
        socialLinks: {
            type: {
                github: { type: String, trim: true, default: '' },
                linkedin: { type: String, trim: true, default: '' },
                portfolio: { type: String, trim: true, default: '' }
            },
            default: function() {
                return {
                    github: '',
                    linkedin: '',
                    portfolio: ''
                };
            }
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

// Mongoose middleware for data validation and sanitization
userSchema.pre('save', function(next) {
    console.log('Pre-save middleware triggered');
    
    // Ensure profile exists
    if (!this.profile) {
        this.profile = {};
    }
    
    // Sanitize and validate arrays
    const arrayFields = ['skills', 'experiences', 'projects', 'certifications'];
    
    arrayFields.forEach(field => {
        if (this.profile[field] === undefined || this.profile[field] === null) {
            this.profile[field] = [];
        }
        
        if (!Array.isArray(this.profile[field])) {
            console.log(`Warning: ${field} is not an array, converting to empty array`);
            this.profile[field] = [];
        }
        
        // Remove empty/invalid entries
        if (field === 'skills') {
            this.profile[field] = this.profile[field].filter(skill => 
                skill && typeof skill === 'string' && skill.trim().length > 0
            );
        } else {
            this.profile[field] = this.profile[field].filter(item => 
                item && typeof item === 'object' && 
                ((field === 'experiences' && item.title && item.company) ||
                 (field === 'projects' && item.title && item.description) ||
                 (field === 'certifications' && item.name))
            );
        }
    });
    
    // Ensure socialLinks is an object
    if (!this.profile.socialLinks || typeof this.profile.socialLinks !== 'object') {
        this.profile.socialLinks = {
            github: '',
            linkedin: '',
            portfolio: ''
        };
    }
    
    console.log('Pre-save validation complete:', {
        skills: this.profile.skills?.length || 0,
        experiences: this.profile.experiences?.length || 0,
        projects: this.profile.projects?.length || 0,
        certifications: this.profile.certifications?.length || 0
    });
    
    next();
});

export const User = mongoose.model('User', userSchema);