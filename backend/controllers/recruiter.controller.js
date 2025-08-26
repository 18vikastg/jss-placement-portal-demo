import { Recruiter } from "../models/recruiter.model.js";
import { Company } from "../models/company.model.js";
import { Drive } from "../models/drive.model.js";
import { User } from "../models/user.model.js";
import { Application } from "../models/application.model.js";

// Get recruiter dashboard data
export const getRecruiterDashboard = async (req, res) => {
    try {
        const recruiter = req.recruiter;
        
        // Get company drives statistics
        const totalDrives = await Drive.countDocuments({ 
            companyId: recruiter.companyId._id 
        });
        
        const activeDrives = await Drive.countDocuments({ 
            companyId: recruiter.companyId._id,
            status: { $in: ['Published', 'Registration Open', 'Ongoing'] }
        });
        
        const completedDrives = await Drive.countDocuments({ 
            companyId: recruiter.companyId._id,
            status: 'Completed'
        });
        
        // Get total applications for company
        const totalApplications = await Drive.aggregate([
            { $match: { companyId: recruiter.companyId._id } },
            { $project: { applicantCount: { $size: '$applicants' } } },
            { $group: { _id: null, total: { $sum: '$applicantCount' } } }
        ]);
        
        // Get recent drives
        const recentDrives = await Drive.find({ 
            companyId: recruiter.companyId._id 
        })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('title jobRole status schedule applicants');
        
        // Get upcoming drives
        const upcomingDrives = await Drive.find({
            companyId: recruiter.companyId._id,
            'schedule.driveDate': { $gte: new Date() },
            status: { $in: ['Published', 'Registration Open'] }
        })
            .sort({ 'schedule.driveDate': 1 })
            .limit(3);
        
        res.status(200).json({
            message: "Recruiter dashboard data retrieved successfully",
            success: true,
            data: {
                statistics: {
                    totalDrives,
                    activeDrives,
                    completedDrives,
                    totalApplications: totalApplications[0]?.total || 0
                },
                recentDrives,
                upcomingDrives,
                company: recruiter.companyId,
                recruiter: {
                    name: recruiter.fullName,
                    designation: recruiter.designation,
                    permissions: recruiter.permissions
                }
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching recruiter dashboard",
            success: false
        });
    }
};

// Update company profile
export const updateCompanyProfile = async (req, res) => {
    try {
        const recruiter = req.recruiter;
        
        // Check permission
        if (!recruiter.permissions.canManageCompany) {
            return res.status(403).json({
                message: "Access denied. Cannot manage company profile.",
                success: false
            });
        }
        
        const {
            name,
            description,
            website,
            locations,
            industry,
            companySize,
            founded,
            details,
            contact,
            socialMedia
        } = req.body;
        
        const updatedCompany = await Company.findByIdAndUpdate(
            recruiter.companyId._id,
            {
                name,
                description,
                website,
                locations,
                industry,
                companySize,
                founded,
                details,
                contact,
                socialMedia
            },
            { new: true }
        );
        
        if (!updatedCompany) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        
        res.status(200).json({
            message: "Company profile updated successfully",
            success: true,
            data: updatedCompany
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error updating company profile",
            success: false
        });
    }
};

// Create new placement drive
export const createDrive = async (req, res) => {
    try {
        const recruiter = req.recruiter;
        
        // Check permission
        if (!recruiter.permissions.canCreateDrives) {
            return res.status(403).json({
                message: "Access denied. Cannot create drives.",
                success: false
            });
        }
        
        const {
            title,
            jobRole,
            description,
            requirements,
            package: packageInfo,
            process,
            schedule
        } = req.body;
        
        const newDrive = new Drive({
            companyId: recruiter.companyId._id,
            recruiterId: recruiter._id,
            title,
            jobRole,
            description,
            requirements,
            package: packageInfo,
            process,
            schedule,
            status: 'Draft'
        });
        
        await newDrive.save();
        
        res.status(201).json({
            message: "Placement drive created successfully",
            success: true,
            data: newDrive
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error creating placement drive",
            success: false
        });
    }
};

// Get company drives
export const getCompanyDrives = async (req, res) => {
    try {
        const recruiter = req.recruiter;
        const { status, page = 1, limit = 10 } = req.query;
        
        let query = { companyId: recruiter.companyId._id };
        
        if (status) {
            query.status = status;
        }
        
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const drives = await Drive.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .populate('recruiterId', 'fullName designation');
        
        const totalDrives = await Drive.countDocuments(query);
        
        res.status(200).json({
            message: "Company drives retrieved successfully",
            success: true,
            data: {
                drives,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(totalDrives / parseInt(limit)),
                    totalDrives,
                    hasNext: skip + drives.length < totalDrives,
                    hasPrev: page > 1
                }
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching company drives",
            success: false
        });
    }
};

// Get drive applicants
export const getDriveApplicants = async (req, res) => {
    try {
        const { driveId } = req.params;
        const { status, department, cgpa, page = 1, limit = 20 } = req.query;
        
        const drive = await Drive.findById(driveId);
        
        if (!drive) {
            return res.status(404).json({
                message: "Drive not found",
                success: false
            });
        }
        
        // Check if recruiter has access to this drive
        if (drive.companyId.toString() !== req.recruiter.companyId._id.toString()) {
            return res.status(403).json({
                message: "Access denied. You can only view your company's drives.",
                success: false
            });
        }
        
        let applicants = [...drive.applicants];
        
        // Apply filters
        if (status) {
            applicants = applicants.filter(app => app.status === status);
        }
        
        // Populate student details
        const populatedApplicants = await User.populate(applicants, {
            path: 'studentId',
            select: 'fullName email phoneNumber profile'
        });
        
        // Apply additional filters
        if (department) {
            populatedApplicants = populatedApplicants.filter(app => 
                app.studentId?.profile?.academicInfo?.department === department
            );
        }
        
        if (cgpa) {
            populatedApplicants = populatedApplicants.filter(app => 
                app.studentId?.profile?.academicInfo?.cgpa >= parseFloat(cgpa)
            );
        }
        
        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const paginatedApplicants = populatedApplicants.slice(skip, skip + parseInt(limit));
        
        res.status(200).json({
            message: "Drive applicants retrieved successfully",
            success: true,
            data: {
                drive: {
                    _id: drive._id,
                    title: drive.title,
                    jobRole: drive.jobRole,
                    status: drive.status
                },
                applicants: paginatedApplicants,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(populatedApplicants.length / parseInt(limit)),
                    totalApplicants: populatedApplicants.length,
                    hasNext: skip + paginatedApplicants.length < populatedApplicants.length,
                    hasPrev: page > 1
                },
                statistics: drive.statistics
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching drive applicants",
            success: false
        });
    }
};

// Update applicant status (shortlist/reject)
export const updateApplicantStatus = async (req, res) => {
    try {
        const { driveId } = req.params;
        const { studentId, status, feedback, round } = req.body;
        
        // Check permission
        if (!req.recruiter.permissions.canShortlistStudents) {
            return res.status(403).json({
                message: "Access denied. Cannot update applicant status.",
                success: false
            });
        }
        
        const drive = await Drive.findById(driveId);
        
        if (!drive) {
            return res.status(404).json({
                message: "Drive not found",
                success: false
            });
        }
        
        // Check company access
        if (drive.companyId.toString() !== req.recruiter.companyId._id.toString()) {
            return res.status(403).json({
                message: "Access denied. You can only manage your company's drives.",
                success: false
            });
        }
        
        // Find applicant
        const applicantIndex = drive.applicants.findIndex(
            app => app.studentId.toString() === studentId
        );
        
        if (applicantIndex === -1) {
            return res.status(404).json({
                message: "Applicant not found in this drive",
                success: false
            });
        }
        
        // Update applicant status
        drive.applicants[applicantIndex].status = status;
        
        // Add round result if provided
        if (round) {
            drive.applicants[applicantIndex].roundResults.push({
                round,
                status: status === 'Rejected' ? 'Fail' : 'Pass',
                feedback,
                date: new Date()
            });
        }
        
        await drive.save();
        
        res.status(200).json({
            message: "Applicant status updated successfully",
            success: true,
            data: drive.applicants[applicantIndex]
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error updating applicant status",
            success: false
        });
    }
};

// Bulk update applicant status
export const bulkUpdateApplicants = async (req, res) => {
    try {
        const { driveId } = req.params;
        const { applicants, status, feedback } = req.body; // applicants is array of studentIds
        
        // Check permission
        if (!req.recruiter.permissions.canShortlistStudents) {
            return res.status(403).json({
                message: "Access denied. Cannot update applicant status.",
                success: false
            });
        }
        
        const drive = await Drive.findById(driveId);
        
        if (!drive) {
            return res.status(404).json({
                message: "Drive not found",
                success: false
            });
        }
        
        // Check company access
        if (drive.companyId.toString() !== req.recruiter.companyId._id.toString()) {
            return res.status(403).json({
                message: "Access denied. You can only manage your company's drives.",
                success: false
            });
        }
        
        let updatedCount = 0;
        
        // Update multiple applicants
        applicants.forEach(studentId => {
            const applicantIndex = drive.applicants.findIndex(
                app => app.studentId.toString() === studentId
            );
            
            if (applicantIndex !== -1) {
                drive.applicants[applicantIndex].status = status;
                if (feedback) {
                    drive.applicants[applicantIndex].roundResults.push({
                        round: 'Bulk Update',
                        status: status === 'Rejected' ? 'Fail' : 'Pass',
                        feedback,
                        date: new Date()
                    });
                }
                updatedCount++;
            }
        });
        
        await drive.save();
        
        res.status(200).json({
            message: `${updatedCount} applicants updated successfully`,
            success: true,
            data: { updatedCount }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error bulk updating applicants",
            success: false
        });
    }
};

// Publish drive
export const publishDrive = async (req, res) => {
    try {
        const { driveId } = req.params;
        
        const drive = await Drive.findById(driveId);
        
        if (!drive) {
            return res.status(404).json({
                message: "Drive not found",
                success: false
            });
        }
        
        // Check company access
        if (drive.companyId.toString() !== req.recruiter.companyId._id.toString()) {
            return res.status(403).json({
                message: "Access denied. You can only manage your company's drives.",
                success: false
            });
        }
        
        drive.status = 'Published';
        await drive.save();
        
        res.status(200).json({
            message: "Drive published successfully",
            success: true,
            data: drive
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error publishing drive",
            success: false
        });
    }
};
