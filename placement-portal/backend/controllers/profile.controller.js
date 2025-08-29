import { User } from "../models/user.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Profile completion calculation logic
const calculateProfileCompletion = (user) => {
    let totalWeight = 0;
    let completedWeight = 0;
    
    // Section 1: Personal Information (20% weight)
    const personalRequiredFields = [
        user.profile?.personalInfo?.usn,
        user.profile?.personalInfo?.dateOfBirth,
        user.profile?.personalInfo?.address?.current,
        user.profile?.personalInfo?.gender
    ];
    const personalCompletionRate = personalRequiredFields.filter(field => field && field !== '').length / personalRequiredFields.length;
    totalWeight += 20;
    completedWeight += personalCompletionRate * 20;
    
    // Section 2: Academic Information (20% weight)
    const academicRequiredFields = [
        user.profile?.academicInfo?.department,
        user.profile?.academicInfo?.semester,
        user.profile?.academicInfo?.cgpa,
        user.profile?.academicInfo?.tenthMarks?.percentage,
        user.profile?.academicInfo?.twelfthMarks?.percentage
    ];
    const academicCompletionRate = academicRequiredFields.filter(field => field !== undefined && field !== null && field !== '').length / academicRequiredFields.length;
    totalWeight += 20;
    completedWeight += academicCompletionRate * 20;
    
    // Section 3: Skills & Projects (20% weight)
    const skillsHasContent = (
        (user.profile?.skillsAndProjects?.programmingLanguages?.length > 0) +
        (user.profile?.skillsAndProjects?.projects?.length > 0) +
        (user.profile?.skillsAndProjects?.frameworks?.length > 0)
    );
    const skillsCompletionRate = Math.min(skillsHasContent / 3, 1);
    totalWeight += 20;
    completedWeight += skillsCompletionRate * 20;
    
    // Section 4: Documents (20% weight)
    const documentsRequiredFields = [
        user.profile?.documents?.resume?.fileUrl,
        user.profile?.documents?.profilePicture?.fileUrl
    ];
    const documentsCompletionRate = documentsRequiredFields.filter(field => field && field !== '').length / documentsRequiredFields.length;
    totalWeight += 20;
    completedWeight += documentsCompletionRate * 20;
    
    // Section 5: Placement Preferences (20% weight)
    const preferencesRequiredFields = [
        user.profile?.placementPreferences?.interestedDomains?.length > 0,
        user.profile?.placementPreferences?.locationPreferences?.length > 0,
        user.profile?.placementPreferences?.expectedSalary?.min
    ];
    const preferencesCompletionRate = preferencesRequiredFields.filter(field => field).length / preferencesRequiredFields.length;
    totalWeight += 20;
    completedWeight += preferencesCompletionRate * 20;
    
    return Math.round(completedWeight);
};

// Get complete student profile
export const getStudentProfile = async (req, res) => {
    try {
        const userId = req.id; // From authentication middleware
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        
        // Calculate profile completion
        const completionPercentage = calculateProfileCompletion(user);
        
        // Update profile completion in database if changed
        if (user.profile.profileCompletion !== completionPercentage) {
            user.profile.profileCompletion = completionPercentage;
            user.profile.lastUpdated = new Date();
            await user.save();
        }
        
        return res.status(200).json({
            message: "Profile retrieved successfully",
            success: true,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile,
                profileCompletion: completionPercentage
            }
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Update personal information
export const updatePersonalInfo = async (req, res) => {
    try {
        const userId = req.id;
        const {
            usn,
            alternatePhone,
            currentAddress,
            permanentAddress,
            dateOfBirth,
            gender,
            bloodGroup,
            fatherName,
            motherName,
            guardianContact
        } = req.body;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        
        // Update personal information
        if (!user.profile.personalInfo) user.profile.personalInfo = {};
        if (!user.profile.personalInfo.address) user.profile.personalInfo.address = {};
        
        if (usn) user.profile.personalInfo.usn = usn;
        if (alternatePhone) user.profile.personalInfo.alternatePhone = alternatePhone;
        if (currentAddress) user.profile.personalInfo.address.current = currentAddress;
        if (permanentAddress) user.profile.personalInfo.address.permanent = permanentAddress;
        if (dateOfBirth) user.profile.personalInfo.dateOfBirth = new Date(dateOfBirth);
        if (gender) user.profile.personalInfo.gender = gender;
        if (bloodGroup) user.profile.personalInfo.bloodGroup = bloodGroup;
        if (fatherName) user.profile.personalInfo.fatherName = fatherName;
        if (motherName) user.profile.personalInfo.motherName = motherName;
        if (guardianContact) user.profile.personalInfo.guardianContact = guardianContact;
        
        // Recalculate profile completion
        user.profile.profileCompletion = calculateProfileCompletion(user);
        user.profile.lastUpdated = new Date();
        
        await user.save();
        
        return res.status(200).json({
            message: "Personal information updated successfully",
            success: true,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            }
        });
    } catch (error) {
        console.error("Error updating personal info:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Update academic information
export const updateAcademicInfo = async (req, res) => {
    try {
        const userId = req.id;
        const {
            department,
            batch,
            semester,
            cgpa,
            percentage,
            tenthPercentage,
            tenthBoard,
            tenthYear,
            twelfthPercentage,
            twelfthBoard,
            twelfthYear,
            backlogCount,
            backlogSubjects,
            achievements
        } = req.body;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        
        // Initialize academic info if not exists
        if (!user.profile.academicInfo) user.profile.academicInfo = {};
        if (!user.profile.academicInfo.tenthMarks) user.profile.academicInfo.tenthMarks = {};
        if (!user.profile.academicInfo.twelfthMarks) user.profile.academicInfo.twelfthMarks = {};
        if (!user.profile.academicInfo.backlogs) user.profile.academicInfo.backlogs = {};
        
        // Update academic information
        if (department) user.profile.academicInfo.department = department;
        if (batch) user.profile.academicInfo.batch = batch;
        if (semester) user.profile.academicInfo.semester = semester;
        if (cgpa) user.profile.academicInfo.cgpa = cgpa;
        if (percentage) user.profile.academicInfo.percentage = percentage;
        
        // 10th marks
        if (tenthPercentage) user.profile.academicInfo.tenthMarks.percentage = tenthPercentage;
        if (tenthBoard) user.profile.academicInfo.tenthMarks.board = tenthBoard;
        if (tenthYear) user.profile.academicInfo.tenthMarks.yearOfPassing = tenthYear;
        
        // 12th marks
        if (twelfthPercentage) user.profile.academicInfo.twelfthMarks.percentage = twelfthPercentage;
        if (twelfthBoard) user.profile.academicInfo.twelfthMarks.board = twelfthBoard;
        if (twelfthYear) user.profile.academicInfo.twelfthMarks.yearOfPassing = twelfthYear;
        
        // Backlogs
        if (backlogCount !== undefined) user.profile.academicInfo.backlogs.count = backlogCount;
        if (backlogSubjects) user.profile.academicInfo.backlogs.subjects = Array.isArray(backlogSubjects) ? backlogSubjects : backlogSubjects.split(',');
        
        // Achievements
        if (achievements) user.profile.academicInfo.achievements = Array.isArray(achievements) ? achievements : achievements.split(',');
        
        // Recalculate profile completion
        user.profile.profileCompletion = calculateProfileCompletion(user);
        user.profile.lastUpdated = new Date();
        
        await user.save();
        
        return res.status(200).json({
            message: "Academic information updated successfully",
            success: true,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            }
        });
    } catch (error) {
        console.error("Error updating academic info:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Update skills and projects
export const updateSkillsAndProjects = async (req, res) => {
    try {
        const userId = req.id;
        const {
            programmingLanguages,
            frameworks,
            databases,
            tools,
            certifications,
            projects
        } = req.body;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        
        // Initialize skills and projects if not exists
        if (!user.profile.skillsAndProjects) user.profile.skillsAndProjects = {};
        
        // Update skills
        if (programmingLanguages) {
            user.profile.skillsAndProjects.programmingLanguages = Array.isArray(programmingLanguages) 
                ? programmingLanguages 
                : programmingLanguages.split(',').map(skill => skill.trim());
        }
        if (frameworks) {
            user.profile.skillsAndProjects.frameworks = Array.isArray(frameworks) 
                ? frameworks 
                : frameworks.split(',').map(skill => skill.trim());
        }
        if (databases) {
            user.profile.skillsAndProjects.databases = Array.isArray(databases) 
                ? databases 
                : databases.split(',').map(skill => skill.trim());
        }
        if (tools) {
            user.profile.skillsAndProjects.tools = Array.isArray(tools) 
                ? tools 
                : tools.split(',').map(skill => skill.trim());
        }
        
        // Update certifications
        if (certifications) user.profile.skillsAndProjects.certifications = certifications;
        
        // Update projects
        if (projects) user.profile.skillsAndProjects.projects = projects;
        
        // Recalculate profile completion
        user.profile.profileCompletion = calculateProfileCompletion(user);
        user.profile.lastUpdated = new Date();
        
        await user.save();
        
        return res.status(200).json({
            message: "Skills and projects updated successfully",
            success: true,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            }
        });
    } catch (error) {
        console.error("Error updating skills and projects:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Upload documents (resume, profile picture, certificates)
export const uploadDocument = async (req, res) => {
    try {
        const userId = req.id;
        const { documentType } = req.body; // 'resume', 'profilePicture', 'certificate'
        const file = req.file;
        
        if (!file) {
            return res.status(400).json({
                message: "No file uploaded",
                success: false
            });
        }
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        
        // Upload to cloudinary
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        
        // Initialize documents if not exists
        if (!user.profile.documents) user.profile.documents = {};
        
        // Update document based on type
        switch (documentType) {
            case 'resume':
                user.profile.documents.resume = {
                    fileUrl: cloudResponse.secure_url,
                    fileName: file.originalname,
                    uploadDate: new Date()
                };
                break;
            case 'profilePicture':
                user.profile.documents.profilePicture = {
                    fileUrl: cloudResponse.secure_url,
                    fileName: file.originalname
                };
                user.profile.profilePhoto = cloudResponse.secure_url; // Keep legacy field
                break;
            case 'certificate':
                if (!user.profile.documents.certificates) user.profile.documents.certificates = [];
                user.profile.documents.certificates.push({
                    title: req.body.title || file.originalname,
                    type: req.body.certificateType || 'certificate',
                    fileUrl: cloudResponse.secure_url,
                    issuedBy: req.body.issuedBy,
                    issuedDate: req.body.issuedDate ? new Date(req.body.issuedDate) : undefined,
                    description: req.body.description
                });
                break;
            default:
                return res.status(400).json({
                    message: "Invalid document type",
                    success: false
                });
        }
        
        // Recalculate profile completion
        user.profile.profileCompletion = calculateProfileCompletion(user);
        user.profile.lastUpdated = new Date();
        
        await user.save();
        
        return res.status(200).json({
            message: `${documentType} uploaded successfully`,
            success: true,
            fileUrl: cloudResponse.secure_url,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            }
        });
    } catch (error) {
        console.error("Error uploading document:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Update placement preferences
export const updatePlacementPreferences = async (req, res) => {
    try {
        const userId = req.id;
        const {
            interestedDomains,
            jobTypes,
            locationPreferences,
            minSalary,
            maxSalary,
            workPreference,
            companySize
        } = req.body;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        
        // Initialize placement preferences if not exists
        if (!user.profile.placementPreferences) user.profile.placementPreferences = {};
        if (!user.profile.placementPreferences.expectedSalary) user.profile.placementPreferences.expectedSalary = {};
        
        // Update placement preferences
        if (interestedDomains) {
            user.profile.placementPreferences.interestedDomains = Array.isArray(interestedDomains) 
                ? interestedDomains 
                : interestedDomains.split(',').map(domain => domain.trim());
        }
        if (jobTypes) {
            user.profile.placementPreferences.jobTypes = Array.isArray(jobTypes) 
                ? jobTypes 
                : jobTypes.split(',').map(type => type.trim());
        }
        if (locationPreferences) {
            user.profile.placementPreferences.locationPreferences = Array.isArray(locationPreferences) 
                ? locationPreferences 
                : locationPreferences.split(',').map(location => location.trim());
        }
        if (minSalary) user.profile.placementPreferences.expectedSalary.min = minSalary;
        if (maxSalary) user.profile.placementPreferences.expectedSalary.max = maxSalary;
        if (workPreference) user.profile.placementPreferences.workPreference = workPreference;
        if (companySize) {
            user.profile.placementPreferences.companySize = Array.isArray(companySize) 
                ? companySize 
                : companySize.split(',').map(size => size.trim());
        }
        
        // Recalculate profile completion
        user.profile.profileCompletion = calculateProfileCompletion(user);
        user.profile.lastUpdated = new Date();
        
        await user.save();
        
        return res.status(200).json({
            message: "Placement preferences updated successfully",
            success: true,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            }
        });
    } catch (error) {
        console.error("Error updating placement preferences:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Get profile completion breakdown
export const getProfileCompletionBreakdown = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        
        // Calculate section-wise completion
        const personalRequiredFields = [
            user.profile?.personalInfo?.usn,
            user.profile?.personalInfo?.dateOfBirth,
            user.profile?.personalInfo?.address?.current,
            user.profile?.personalInfo?.gender
        ];
        const personalCompletion = (personalRequiredFields.filter(field => field && field !== '').length / personalRequiredFields.length) * 20;
        
        const academicRequiredFields = [
            user.profile?.academicInfo?.department,
            user.profile?.academicInfo?.semester,
            user.profile?.academicInfo?.cgpa,
            user.profile?.academicInfo?.tenthMarks?.percentage,
            user.profile?.academicInfo?.twelfthMarks?.percentage
        ];
        const academicCompletion = (academicRequiredFields.filter(field => field !== undefined && field !== null && field !== '').length / academicRequiredFields.length) * 20;
        
        const skillsHasContent = (
            (user.profile?.skillsAndProjects?.programmingLanguages?.length > 0) +
            (user.profile?.skillsAndProjects?.projects?.length > 0) +
            (user.profile?.skillsAndProjects?.frameworks?.length > 0)
        );
        const skillsCompletion = Math.min(skillsHasContent / 3, 1) * 20;
        
        const documentsRequiredFields = [
            user.profile?.documents?.resume?.fileUrl,
            user.profile?.documents?.profilePicture?.fileUrl
        ];
        const documentsCompletion = (documentsRequiredFields.filter(field => field && field !== '').length / documentsRequiredFields.length) * 20;
        
        const preferencesRequiredFields = [
            user.profile?.placementPreferences?.interestedDomains?.length > 0,
            user.profile?.placementPreferences?.locationPreferences?.length > 0,
            user.profile?.placementPreferences?.expectedSalary?.min
        ];
        const preferencesCompletion = (preferencesRequiredFields.filter(field => field).length / preferencesRequiredFields.length) * 20;
        
        const breakdown = {
            overall: Math.round(personalCompletion + academicCompletion + skillsCompletion + documentsCompletion + preferencesCompletion),
            sections: {
                personalInfo: Math.round(personalCompletion),
                academicInfo: Math.round(academicCompletion),
                skillsAndProjects: Math.round(skillsCompletion),
                documents: Math.round(documentsCompletion),
                placementPreferences: Math.round(preferencesCompletion)
            }
        };
        
        return res.status(200).json({
            message: "Profile completion breakdown retrieved successfully",
            success: true,
            completion: breakdown
        });
    } catch (error) {
        console.error("Error getting profile completion breakdown:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
