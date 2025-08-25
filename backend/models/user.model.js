import mongoose from "mongoose";

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
        skills:[{type:String}],
        resume:{type:String}, // URL to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, 
        profilePhoto:{
            type:String,
            default:""
        },
        // Faculty specific fields
        department:{type:String}, // For faculty
        designation:{type:String}, // Professor, Associate Professor, etc.
        employeeId:{type:String}, // Faculty employee ID
        // Student specific fields
        studentId:{type:String}, // Student ID
        batch:{type:String}, // Graduation year
        branch:{type:String}, // Engineering branch
        cgpa:{type:Number}, // CGPA
        semester:{type:Number} // Current semester
    },
},{timestamps:true});
export const User = mongoose.model('User', userSchema);