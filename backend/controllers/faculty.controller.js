import { User } from "../models/user.model.js";
import { Faculty } from "../models/faculty.model.js";
import { Drive } from "../models/drive.model.js";
import { Application } from "../models/application.model.js";

// Get faculty dashboard data
export const getFacultyDashboard = async (req, res) => {
    try {
        const faculty = req.faculty;
        
        // Get student statistics
        const totalStudents = await User.countDocuments({ role: 'student' });
        const profileCompletedStudents = await User.countDocuments({ 
            role: 'student',
            'profile.profileCompletion': { $gte: 80 }
        });
        
        // Get department-wise filter if faculty is assigned to specific departments
        let departmentFilter = {};
        if (faculty.assignedDepartments.length > 0 && !faculty.assignedDepartments.includes('All')) {
            departmentFilter = {
                'profile.academicInfo.department': { $in: faculty.assignedDepartments }
            };
        }
        
        // Get recent applications
        const recentApplications = await Application.find()
            .populate({
                path: 'applicant',
                match: departmentFilter,
                select: 'fullName email profile.academicInfo'
            })
            .populate('job', 'title company')
            .sort({ createdAt: -1 })
            .limit(10);
        
        // Get active drives
        const activeDrives = await Drive.find({
            status: { $in: ['Published', 'Registration Open', 'Ongoing'] }
        })
            .populate('companyId', 'name logo')
            .sort({ 'schedule.driveDate': 1 })
            .limit(5);
        
        res.status(200).json({
            message: "Faculty dashboard data retrieved successfully",
            success: true,
            data: {
                statistics: {
                    totalStudents,
                    profileCompletedStudents,
                    profileCompletionRate: totalStudents > 0 ? Math.round((profileCompletedStudents / totalStudents) * 100) : 0,
                    activeDrives: activeDrives.length
                },
                recentApplications: recentApplications.filter(app => app.applicant),
                activeDrives,
                faculty: {
                    name: faculty.fullName,
                    department: faculty.department,
                    designation: faculty.designation,
                    permissions: faculty.permissions
                }
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching faculty dashboard",
            success: false
        });
    }
};

// Get all students with filters
export const getStudents = async (req, res) => {
    try {
        const faculty = req.faculty;
        const { 
            department, 
            cgpa, 
            profileCompletion, 
            graduationYear, 
            search,
            page = 1,
            limit = 20,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;
        
        // Build query
        let query = { role: 'student' };
        
        // Department filter based on faculty permissions
        if (faculty.assignedDepartments.length > 0 && !faculty.assignedDepartments.includes('All')) {
            query['profile.academicInfo.department'] = { $in: faculty.assignedDepartments };
        }
        
        // Additional filters
        if (department) {
            query['profile.academicInfo.department'] = department;
        }
        
        if (cgpa) {
            query['profile.academicInfo.cgpa'] = { $gte: parseFloat(cgpa) };
        }
        
        if (profileCompletion) {
            query['profile.profileCompletion'] = { $gte: parseInt(profileCompletion) };
        }
        
        if (graduationYear) {
            query['profile.academicInfo.graduationYear'] = parseInt(graduationYear);
        }
        
        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { 'profile.academicInfo.rollNumber': { $regex: search, $options: 'i' } }
            ];
        }
        
        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Sort configuration
        let sortConfig = {};
        sortConfig[sortBy] = sortOrder === 'desc' ? -1 : 1;
        
        const students = await User.find(query)
            .select('fullName email phoneNumber profile createdAt')
            .sort(sortConfig)
            .skip(skip)
            .limit(parseInt(limit));
        
        const totalStudents = await User.countDocuments(query);
        
        res.status(200).json({
            message: "Students retrieved successfully",
            success: true,
            data: {
                students,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(totalStudents / parseInt(limit)),
                    totalStudents,
                    hasNext: skip + students.length < totalStudents,
                    hasPrev: page > 1
                }
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching students",
            success: false
        });
    }
};

// Get single student profile
export const getStudentProfile = async (req, res) => {
    try {
        const { studentId } = req.params;
        
        const student = await User.findById(studentId)
            .select('-password')
            .populate('profile.documents');
        
        if (!student || student.role !== 'student') {
            return res.status(404).json({
                message: "Student not found",
                success: false
            });
        }
        
        // Get student's applications
        const applications = await Application.find({ applicant: studentId })
            .populate('job', 'title company location salary')
            .populate('company', 'name logo')
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            message: "Student profile retrieved successfully",
            success: true,
            data: {
                student,
                applications,
                applicationCount: applications.length
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching student profile",
            success: false
        });
    }
};

// Get applications overview
export const getApplicationsOverview = async (req, res) => {
    try {
        const faculty = req.faculty;
        const { status, company, drive, page = 1, limit = 20 } = req.query;
        
        // Build query for applications
        let applicationQuery = {};
        
        if (status) {
            applicationQuery.status = status;
        }
        
        if (company) {
            applicationQuery.company = company;
        }
        
        if (drive) {
            applicationQuery.job = drive;
        }
        
        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const applications = await Application.find(applicationQuery)
            .populate({
                path: 'applicant',
                select: 'fullName email profile.academicInfo profile.profileCompletion'
            })
            .populate('job', 'title company location')
            .populate('company', 'name logo')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));
        
        // Filter by department if faculty has restrictions
        let filteredApplications = applications;
        if (faculty.assignedDepartments.length > 0 && !faculty.assignedDepartments.includes('All')) {
            filteredApplications = applications.filter(app => 
                app.applicant && 
                faculty.assignedDepartments.includes(app.applicant.profile?.academicInfo?.department)
            );
        }
        
        const totalApplications = await Application.countDocuments(applicationQuery);
        
        // Get statistics
        const stats = await Application.aggregate([
            { $match: applicationQuery },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);
        
        res.status(200).json({
            message: "Applications overview retrieved successfully",
            success: true,
            data: {
                applications: filteredApplications,
                statistics: stats,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(totalApplications / parseInt(limit)),
                    totalApplications,
                    hasNext: skip + applications.length < totalApplications,
                    hasPrev: page > 1
                }
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching applications overview",
            success: false
        });
    }
};

// Generate department report
export const generateDepartmentReport = async (req, res) => {
    try {
        const faculty = req.faculty;
        const { department, academicYear } = req.query;
        
        // Check permission
        if (!faculty.permissions.canGenerateReports) {
            return res.status(403).json({
                message: "Access denied. Cannot generate reports.",
                success: false
            });
        }
        
        let matchQuery = { role: 'student' };
        
        if (department) {
            matchQuery['profile.academicInfo.department'] = department;
        }
        
        if (academicYear) {
            matchQuery['profile.academicInfo.graduationYear'] = parseInt(academicYear);
        }
        
        // Aggregate report data
        const reportData = await User.aggregate([
            { $match: matchQuery },
            {
                $group: {
                    _id: '$profile.academicInfo.department',
                    totalStudents: { $sum: 1 },
                    avgCGPA: { $avg: '$profile.academicInfo.cgpa' },
                    profileCompleted: {
                        $sum: {
                            $cond: [
                                { $gte: ['$profile.profileCompletion', 80] },
                                1,
                                0
                            ]
                        }
                    },
                    activeBacklogs: {
                        $sum: {
                            $cond: [
                                { $gt: ['$profile.academicInfo.activeBacklogs', 0] },
                                1,
                                0
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    department: '$_id',
                    totalStudents: 1,
                    avgCGPA: { $round: ['$avgCGPA', 2] },
                    profileCompletionRate: {
                        $round: [
                            { $multiply: [{ $divide: ['$profileCompleted', '$totalStudents'] }, 100] },
                            2
                        ]
                    },
                    studentsWithBacklogs: '$activeBacklogs'
                }
            }
        ]);
        
        res.status(200).json({
            message: "Department report generated successfully",
            success: true,
            data: {
                report: reportData,
                generatedAt: new Date(),
                generatedBy: faculty.fullName
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error generating department report",
            success: false
        });
    }
};
