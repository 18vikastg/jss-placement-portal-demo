// Role-based access control middleware
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
                message: `Access denied. Required roles: ${roles.join(', ')}. Your role: ${userRole}`,
                success: false
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
