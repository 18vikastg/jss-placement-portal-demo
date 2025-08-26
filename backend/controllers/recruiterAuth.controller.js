import { Recruiter } from "../models/recruiter.model.js";
import { Company } from "../models/company.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Recruiter Registration
export const registerRecruiter = async (req, res) => {
    try {
        const { 
            fullname,  // Changed from fullName to match frontend
            fullName,  // Keep both for compatibility
            email, 
            phoneNumber, 
            password, 
            companyId,
            designation 
        } = req.body;
         
        // Use fullname from frontend or fullName if provided
        const name = fullname || fullName;
        
        if (!name || !email || !phoneNumber || !password) {
            return res.status(400).json({
                message: "Required fields are missing",
                success: false
            });
        }

        // Check if recruiter already exists
        const existingRecruiter = await Recruiter.findOne({ email });
        if (existingRecruiter) {
            return res.status(400).json({
                message: 'Recruiter already exists with this email.',
                success: false,
            });
        }

        // Verify company exists only if companyId is provided
        if (companyId) {
            const company = await Company.findById(companyId);
            if (!company) {
                return res.status(400).json({
                    message: 'Invalid company ID.',
                    success: false,
                });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const recruiter = new Recruiter({
            fullName: name,
            email,
            phoneNumber,
            password: hashedPassword,
            companyId: companyId || null,
            designation: designation || 'Recruiter',  // Default designation if not provided
            role: 'recruiter'
        });

        await recruiter.save();

        res.status(201).json({
            message: "Recruiter account created successfully",
            success: true,
            recruiter: {
                _id: recruiter._id,
                fullName: recruiter.fullName,
                email: recruiter.email,
                designation: recruiter.designation,
                companyId: recruiter.companyId
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

// Recruiter Login
export const loginRecruiter = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                success: false
            });
        }

        let recruiter = await Recruiter.findOne({ email }).populate('companyId');
        if (!recruiter) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, recruiter.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        if (!recruiter.isActive) {
            return res.status(403).json({
                message: "Your account is inactive. Please contact administrator.",
                success: false,
            });
        }

        const tokenData = {
            userId: recruiter._id,
            role: recruiter.role
        };
        
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Update last login
        recruiter.lastLogin = new Date();
        await recruiter.save();

        recruiter = {
            _id: recruiter._id,
            fullName: recruiter.fullName,
            email: recruiter.email,
            phoneNumber: recruiter.phoneNumber,
            role: recruiter.role,
            designation: recruiter.designation,
            companyId: recruiter.companyId,
            permissions: recruiter.permissions
        };

        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
            httpsOnly: true,
            sameSite: 'strict'
        }).json({
            message: `Welcome back ${recruiter.fullName}`,
            recruiter,
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

// Get Recruiter Profile
export const getRecruiterProfile = async (req, res) => {
    try {
        const recruiterId = req.id;
        const recruiter = await Recruiter.findById(recruiterId)
            .select('-password')
            .populate('companyId');
        
        if (!recruiter) {
            return res.status(404).json({
                message: "Recruiter not found",
                success: false
            });
        }

        return res.status(200).json({
            recruiter,
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

// Update Recruiter Profile
export const updateRecruiterProfile = async (req, res) => {
    try {
        const recruiterId = req.id;
        const { fullName, phoneNumber, designation, bio, linkedIn, experience } = req.body;

        const recruiter = await Recruiter.findById(recruiterId);
        if (!recruiter) {
            return res.status(404).json({
                message: "Recruiter not found",
                success: false
            });
        }

        // Update fields
        if (fullName) recruiter.fullName = fullName;
        if (phoneNumber) recruiter.phoneNumber = phoneNumber;
        if (designation) recruiter.designation = designation;
        if (bio) recruiter.profile.bio = bio;
        if (linkedIn) recruiter.profile.linkedIn = linkedIn;
        if (experience !== undefined) recruiter.profile.experience = experience;

        await recruiter.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            recruiter: recruiter,
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
