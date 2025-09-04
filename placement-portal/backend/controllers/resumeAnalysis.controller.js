import { User } from "../models/user.model.js";
import ResumeAnalyserService from "../services/resumeAnalyser.service.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

const resumeAnalyser = new ResumeAnalyserService();

export const analyseResume = async (req, res) => {
    try {
        console.log('=== RESUME ANALYSIS START ===');
        const userId = req.id;
        
        if (!req.file) {
            return res.status(400).json({
                message: "No resume file uploaded",
                success: false
            });
        }

        console.log('User ID:', userId);
        console.log('File details:', {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size
        });

        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(req.file.mimetype)) {
            return res.status(400).json({
                message: "Invalid file type. Please upload PDF or Word document.",
                success: false
            });
        }

        // Get user details
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        console.log('Starting AI analysis for user:', user.fullname);

        // Analyse resume using AI service
        const analysisResult = await resumeAnalyser.analyseResume(
            req.file.buffer,
            req.file.originalname,
            userId
        );

        console.log('Analysis completed, score:', analysisResult.analysis_score);

        // Upload resume to cloudinary for storage
        let resumeUrl = null;
        try {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "auto",
                folder: "resumes"
            });
            resumeUrl = cloudResponse.secure_url;
            console.log('Resume uploaded to cloudinary:', resumeUrl);
        } catch (uploadError) {
            console.error('Cloudinary upload failed:', uploadError);
            // Continue without cloudinary upload
        }

        // Prepare analysis data for database
        const analysisData = {
            analysisId: `analysis_${userId}_${Date.now()}`,
            userId: userId,
            fileName: req.file.originalname,
            fileSize: req.file.size,
            resumeUrl: resumeUrl,
            extractedData: analysisResult.extracted_data,
            analysisScore: analysisResult.analysis_score,
            experienceLevel: analysisResult.experience_level,
            recommendations: analysisResult.recommendations,
            analysisDate: new Date(),
            fileInfo: analysisResult.file_info
        };

        // Update user profile with resume analysis
        if (!user.profile) {
            user.profile = {};
        }

        // Initialize resume_analysis array if it doesn't exist
        if (!user.profile.resume_analysis) {
            user.profile.resume_analysis = [];
        }

        // Add new analysis (keep last 5 analyses)
        user.profile.resume_analysis.unshift(analysisData);
        user.profile.resume_analysis = user.profile.resume_analysis.slice(0, 5);

        // Update latest resume info
        user.profile.latestResumeAnalysis = {
            score: analysisResult.analysis_score,
            level: analysisResult.experience_level,
            analyzedAt: new Date(),
            fileName: req.file.originalname
        };

        // Save updated user profile
        await user.save();

        console.log('Analysis saved to user profile');
        console.log('=== RESUME ANALYSIS END ===');

        // Return analysis results
        return res.status(200).json({
            message: "Resume analysed successfully",
            success: true,
            analysis: {
                score: analysisResult.analysis_score,
                level: analysisResult.experience_level,
                extractedData: analysisResult.extracted_data,
                recommendations: analysisResult.recommendations,
                fileInfo: analysisResult.file_info,
                analysisDate: analysisData.analysisDate
            }
        });

    } catch (error) {
        console.error('Resume analysis error:', error);
        return res.status(500).json({
            message: "Resume analysis failed",
            success: false,
            error: error.message
        });
    }
};

export const getResumeAnalysisHistory = async (req, res) => {
    try {
        const userId = req.id;
        
        const user = await User.findById(userId).select('profile.resume_analysis profile.latestResumeAnalysis');
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const analysisHistory = user.profile?.resume_analysis || [];
        const latestAnalysis = user.profile?.latestResumeAnalysis || null;

        return res.status(200).json({
            message: "Resume analysis history retrieved",
            success: true,
            data: {
                latestAnalysis,
                history: analysisHistory,
                totalAnalyses: analysisHistory.length
            }
        });

    } catch (error) {
        console.error('Get analysis history error:', error);
        return res.status(500).json({
            message: "Failed to retrieve analysis history",
            success: false,
            error: error.message
        });
    }
};

export const deleteAnalysis = async (req, res) => {
    try {
        const userId = req.id;
        const { analysisId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        if (!user.profile?.resume_analysis) {
            return res.status(404).json({
                message: "No analysis found",
                success: false
            });
        }

        // Remove analysis from array
        user.profile.resume_analysis = user.profile.resume_analysis.filter(
            analysis => analysis.analysisId !== analysisId
        );

        await user.save();

        return res.status(200).json({
            message: "Analysis deleted successfully",
            success: true
        });

    } catch (error) {
        console.error('Delete analysis error:', error);
        return res.status(500).json({
            message: "Failed to delete analysis",
            success: false,
            error: error.message
        });
    }
};

export const getAnalysisRecommendations = async (req, res) => {
    try {
        const userId = req.id;
        
        const user = await User.findById(userId).select('profile.resume_analysis profile.latestResumeAnalysis');
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const latestAnalysis = user.profile?.latestResumeAnalysis;
        const analysisHistory = user.profile?.resume_analysis || [];

        if (!latestAnalysis && analysisHistory.length === 0) {
            return res.status(404).json({
                message: "No resume analysis found. Please analyse your resume first.",
                success: false
            });
        }

        // Get latest recommendations
        const latestRecommendations = analysisHistory.length > 0 
            ? analysisHistory[0].recommendations 
            : [];

        // Generate skill improvement suggestions
        const skillSuggestions = generateSkillSuggestions(analysisHistory);

        return res.status(200).json({
            message: "Recommendations retrieved successfully",
            success: true,
            data: {
                currentScore: latestAnalysis?.score || 0,
                level: latestAnalysis?.level || 'Entry Level',
                recommendations: latestRecommendations,
                skillSuggestions: skillSuggestions,
                improvementAreas: generateImprovementAreas(latestAnalysis?.score || 0)
            }
        });

    } catch (error) {
        console.error('Get recommendations error:', error);
        return res.status(500).json({
            message: "Failed to retrieve recommendations",
            success: false,
            error: error.message
        });
    }
};

// Helper functions
function generateSkillSuggestions(analysisHistory) {
    if (analysisHistory.length === 0) return [];

    const latestAnalysis = analysisHistory[0];
    const currentSkills = latestAnalysis.extractedData?.skills || [];

    // Common in-demand skills
    const inDemandSkills = [
        'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git',
        'AWS', 'Docker', 'Machine Learning', 'Data Analysis',
        'Communication', 'Leadership', 'Problem Solving'
    ];

    // Filter out skills already present
    const suggestedSkills = inDemandSkills.filter(skill => 
        !currentSkills.some(currentSkill => 
            currentSkill.toLowerCase().includes(skill.toLowerCase())
        )
    );

    return suggestedSkills.slice(0, 8);
}

function generateImprovementAreas(score) {
    const areas = [];

    if (score < 30) {
        areas.push({
            area: "Basic Information",
            priority: "High",
            description: "Ensure your resume has complete contact information and personal details"
        });
    }

    if (score < 50) {
        areas.push({
            area: "Skills Section",
            priority: "High", 
            description: "Add more relevant technical and soft skills to your resume"
        });
    }

    if (score < 60) {
        areas.push({
            area: "Work Experience",
            priority: "Medium",
            description: "Include detailed work experience with achievements and metrics"
        });
    }

    if (score < 70) {
        areas.push({
            area: "Education & Certifications",
            priority: "Medium",
            description: "Add educational background and professional certifications"
        });
    }

    if (score < 80) {
        areas.push({
            area: "Projects & Portfolio",
            priority: "Low",
            description: "Include relevant projects and portfolio links"
        });
    }

    return areas;
}
