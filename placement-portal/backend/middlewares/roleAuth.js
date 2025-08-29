import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Faculty } from "../models/faculty.model.js";
import { Recruiter } from "../models/recruiter.model.js";

// Enhanced role-based access control middleware
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.id) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        // Get user role from the request (set by isAuthenticated middleware)
        const userRole = req.user?.role;

        if (!userRole) {
            return res.status(403).json({
                message: "User role not found",
                success: false
            });
        }

        if (!roles.includes(userRole)) {
            return res.status(403).json({
                message: "Access denied. Insufficient permissions.",
                success: false
            });
        }

        next();
    };
};

// Faculty-specific middleware
export const isFaculty = async (req, res, next) => {
    try {
        if (req.user?.role !== 'faculty') {
            return res.status(403).json({
                message: "Access denied. Faculty role required.",
                success: false,
            });
        }
        
        const faculty = await Faculty.findById(req.id);
        if (!faculty || !faculty.isActive) {
            return res.status(403).json({
                message: "Faculty account not found or inactive",
                success: false,
            });
        }
        
        req.faculty = faculty;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Faculty authorization failed",
            success: false,
        });
    }
};

// Recruiter-specific middleware
export const isRecruiter = async (req, res, next) => {
    try {
        if (req.user?.role !== 'recruiter') {
            return res.status(403).json({
                message: "Access denied. Recruiter role required.",
                success: false,
            });
        }
        
        const recruiter = await Recruiter.findById(req.id).populate('companyId');
        if (!recruiter || !recruiter.isActive) {
            return res.status(403).json({
                message: "Recruiter account not found or inactive",
                success: false,
            });
        }
        
        req.recruiter = recruiter;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Recruiter authorization failed",
            success: false,
        });
    }
};

// Student-specific middleware (enhanced)
export const isStudent = async (req, res, next) => {
    try {
        if (req.user?.role !== 'student') {
            return res.status(403).json({
                message: "Access denied. Student role required.",
                success: false,
            });
        }
        
        const student = await User.findById(req.id);
        if (!student) {
            return res.status(403).json({
                message: "Student account not found",
                success: false,
            });
        }
        
        req.student = student;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Student authorization failed",
            success: false,
        });
    }
};

// Permission-based middleware
export const hasPermission = (permission) => {
    return (req, res, next) => {
        let hasAccess = false;
        
        if (req.faculty && req.faculty.permissions[permission]) {
            hasAccess = true;
        } else if (req.recruiter && req.recruiter.permissions[permission]) {
            hasAccess = true;
        }
        
        if (!hasAccess) {
            return res.status(403).json({
                message: `Access denied. Missing permission: ${permission}`,
                success: false,
            });
        }
        
        next();
    };
};

// Specific role middlewares
export const authorizeStudent = authorizeRoles('student');
export const authorizeFaculty = authorizeRoles('faculty');
export const authorizeRecruiter = authorizeRoles('recruiter');
export const authorizeStudentOrFaculty = authorizeRoles('student', 'faculty');
export const authorizeFacultyOrRecruiter = authorizeRoles('faculty', 'recruiter');
export const authorizeAll = authorizeRoles('student', 'faculty', 'recruiter');
