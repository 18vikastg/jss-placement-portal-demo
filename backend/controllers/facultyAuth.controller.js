import { Faculty } from "../models/faculty.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Faculty Registration
export const registerFaculty = async (req, res) => {
    try {
        const { 
            fullname,   // From signup form
            fullName,   // For compatibility
            email, 
            phoneNumber, 
            password, 
            department, 
            designation, 
            employeeId,
            experience,
            specialization 
        } = req.body;
         
        // Use fullname from frontend or fullName if provided
        const name = fullname || fullName;
        
        if (!name || !email || !phoneNumber || !password) {
            return res.status(400).json({
                message: "Required fields are missing",
                success: false
            });
        }

        // Check if faculty already exists
        const existingFaculty = await Faculty.findOne({ 
            $or: [{ email }, ...(employeeId ? [{ employeeId }] : [])]
        });
        
        if (existingFaculty) {
            return res.status(400).json({
                message: 'Faculty already exists with this email or employee ID.',
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const faculty = new Faculty({
            fullName: name,
            email,
            phoneNumber,
            password: hashedPassword,
            department: department || 'General',  // Default department
            designation: designation || 'Faculty',  // Default designation
            employeeId: employeeId || `FAC${Date.now()}`,  // Generate employeeId if not provided
            experience: experience || 0,
            specialization: specialization || [],
            role: 'faculty',
            assignedDepartments: [department || 'General'] // Initially assigned to their own department
        });

        await faculty.save();

        res.status(201).json({
            message: "Faculty account created successfully",
            success: true,
            faculty: {
                _id: faculty._id,
                fullName: faculty.fullName,
                email: faculty.email,
                department: faculty.department,
                designation: faculty.designation,
                employeeId: faculty.employeeId
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Faculty Login
export const loginFaculty = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                success: false
            });
        }

        let faculty = await Faculty.findOne({ email });
        if (!faculty) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, faculty.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        if (!faculty.isActive) {
            return res.status(403).json({
                message: "Your account is inactive. Please contact administrator.",
                success: false,
            });
        }

        const tokenData = {
            userId: faculty._id,
            role: faculty.role
        };
        
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

        faculty = {
            _id: faculty._id,
            fullName: faculty.fullName,
            email: faculty.email,
            phoneNumber: faculty.phoneNumber,
            role: faculty.role,
            department: faculty.department,
            designation: faculty.designation,
            employeeId: faculty.employeeId,
            permissions: faculty.permissions,
            assignedDepartments: faculty.assignedDepartments
        };

        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
            httpsOnly: true,
            sameSite: 'strict'
        }).json({
            message: `Welcome back ${faculty.fullName}`,
            faculty,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Get Faculty Profile
export const getFacultyProfile = async (req, res) => {
    try {
        const facultyId = req.id;
        const faculty = await Faculty.findById(facultyId).select('-password');
        
        if (!faculty) {
            return res.status(404).json({
                message: "Faculty not found",
                success: false
            });
        }

        return res.status(200).json({
            faculty,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Update Faculty Profile
export const updateFacultyProfile = async (req, res) => {
    try {
        const facultyId = req.id;
        const { fullName, phoneNumber, experience, specialization, bio } = req.body;

        const faculty = await Faculty.findById(facultyId);
        if (!faculty) {
            return res.status(404).json({
                message: "Faculty not found",
                success: false
            });
        }

        // Update fields
        if (fullName) faculty.fullName = fullName;
        if (phoneNumber) faculty.phoneNumber = phoneNumber;
        if (experience !== undefined) faculty.experience = experience;
        if (specialization) faculty.specialization = specialization;
        if (bio) faculty.profile.bio = bio;

        await faculty.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            faculty: faculty,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
