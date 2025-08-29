import { PreparationResource } from "../models/preparationResource.model.js";
import { UserProgress } from "../models/userProgress.model.js";
import { StudyPlan } from "../models/studyPlan.model.js";

// Get all preparation resources with filtering and search
export const getPreparationResources = async (req, res) => {
    try {
        const { 
            category, 
            subcategory, 
            type, 
            difficulty, 
            provider,
            search,
            page = 1,
            limit = 20,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;

        // Build filter object
        const filter = { isActive: true };
        
        if (category) filter.category = category;
        if (subcategory) filter.subcategory = subcategory;
        if (type) filter.type = type;
        if (difficulty) filter.difficulty = difficulty;
        if (provider) filter.provider = provider;

        // Search functionality
        if (search) {
            filter.$text = { $search: search };
        }

        // Calculate pagination
        const skip = (page - 1) * limit;
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Get resources with pagination
        const resources = await PreparationResource.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count for pagination
        const totalResources = await PreparationResource.countDocuments(filter);

        // If user is authenticated, get their progress
        let userProgress = {};
        if (req.id) {
            const progressData = await UserProgress.find({ userId: req.id });
            userProgress = progressData.reduce((acc, progress) => {
                acc[progress.resourceId] = progress;
                return acc;
            }, {});
        }

        res.status(200).json({
            success: true,
            resources,
            userProgress,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalResources / limit),
                totalResources,
                hasNextPage: page < Math.ceil(totalResources / limit),
                hasPrevPage: page > 1
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Get resource categories and subcategories
export const getResourceCategories = async (req, res) => {
    try {
        const categories = await PreparationResource.aggregate([
            { $match: { isActive: true } },
            {
                $group: {
                    _id: "$category",
                    subcategories: { $addToSet: "$subcategory" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.status(200).json({
            success: true,
            categories
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Update user progress for a resource
export const updateUserProgress = async (req, res) => {
    try {
        const { resourceId } = req.params;
        const {
            status,
            progressPercentage,
            timeSpent,
            notes,
            rating
        } = req.body;

        const updateData = {
            userId: req.id,
            resourceId,
            lastAccessedAt: new Date()
        };

        if (status !== undefined) updateData.status = status;
        if (progressPercentage !== undefined) updateData.progressPercentage = progressPercentage;
        if (timeSpent !== undefined) updateData.timeSpent = timeSpent;
        if (notes !== undefined) updateData.notes = notes;
        if (rating !== undefined) updateData.rating = rating;

        if (status === 'completed') {
            updateData.completedAt = new Date();
            updateData.progressPercentage = 100;
        }

        const progress = await UserProgress.findOneAndUpdate(
            { userId: req.id, resourceId },
            updateData,
            { upsert: true, new: true }
        );

        res.status(200).json({
            success: true,
            message: "Progress updated successfully",
            progress
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Toggle bookmark for a resource
export const toggleBookmark = async (req, res) => {
    try {
        const { resourceId } = req.params;

        const existingProgress = await UserProgress.findOne({
            userId: req.id,
            resourceId
        });

        let progress;
        if (existingProgress) {
            progress = await UserProgress.findOneAndUpdate(
                { userId: req.id, resourceId },
                { isBookmarked: !existingProgress.isBookmarked },
                { new: true }
            );
        } else {
            progress = await UserProgress.create({
                userId: req.id,
                resourceId,
                isBookmarked: true
            });
        }

        res.status(200).json({
            success: true,
            message: progress.isBookmarked ? "Resource bookmarked" : "Bookmark removed",
            isBookmarked: progress.isBookmarked
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Get user's bookmarked resources
export const getBookmarkedResources = async (req, res) => {
    try {
        const bookmarkedProgress = await UserProgress.find({
            userId: req.id,
            isBookmarked: true
        }).populate('resourceId');

        const bookmarkedResources = bookmarkedProgress
            .filter(progress => progress.resourceId)
            .map(progress => ({
                ...progress.resourceId.toObject(),
                userProgress: {
                    status: progress.status,
                    progressPercentage: progress.progressPercentage,
                    lastAccessedAt: progress.lastAccessedAt
                }
            }));

        res.status(200).json({
            success: true,
            bookmarkedResources
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Get user's dashboard with progress statistics
export const getUserDashboard = async (req, res) => {
    try {
        // Get user's overall progress statistics
        const progressStats = await UserProgress.aggregate([
            { $match: { userId: req.id } },
            {
                $group: {
                    _id: null,
                    totalResources: { $sum: 1 },
                    completedResources: {
                        $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] }
                    },
                    inProgressResources: {
                        $sum: { $cond: [{ $eq: ["$status", "in_progress"] }, 1, 0] }
                    },
                    totalTimeSpent: { $sum: "$timeSpent" },
                    averageRating: { $avg: "$rating" }
                }
            }
        ]);

        // Get progress by category
        const categoryProgress = await UserProgress.aggregate([
            { $match: { userId: req.id } },
            {
                $lookup: {
                    from: 'preparationresources',
                    localField: 'resourceId',
                    foreignField: '_id',
                    as: 'resource'
                }
            },
            { $unwind: '$resource' },
            {
                $group: {
                    _id: '$resource.category',
                    totalResources: { $sum: 1 },
                    completedResources: {
                        $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] }
                    }
                }
            }
        ]);

        // Get recently accessed resources
        const recentResources = await UserProgress.find({
            userId: req.id
        })
        .populate('resourceId')
        .sort({ lastAccessedAt: -1 })
        .limit(5);

        // Get study plan if exists
        const studyPlan = await StudyPlan.findOne({ userId: req.id });

        res.status(200).json({
            success: true,
            dashboard: {
                stats: progressStats[0] || {
                    totalResources: 0,
                    completedResources: 0,
                    inProgressResources: 0,
                    totalTimeSpent: 0,
                    averageRating: 0
                },
                categoryProgress,
                recentResources: recentResources.map(progress => ({
                    ...progress.resourceId.toObject(),
                    userProgress: {
                        status: progress.status,
                        progressPercentage: progress.progressPercentage,
                        lastAccessedAt: progress.lastAccessedAt
                    }
                })),
                studyPlan
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Create or update study plan
export const createStudyPlan = async (req, res) => {
    try {
        const {
            targetRole,
            targetCompanies,
            timelineWeeks,
            weeklyHours,
            focusAreas
        } = req.body;

        // Generate milestones and recommended resources based on focus areas
        const milestones = [];
        const recommendedResources = [];

        // Create weekly milestones
        for (let week = 1; week <= timelineWeeks; week++) {
            milestones.push({
                week,
                title: `Week ${week} Goals`,
                description: `Complete assigned resources and practice problems`
            });
        }

        const studyPlan = await StudyPlan.findOneAndUpdate(
            { userId: req.id },
            {
                targetRole,
                targetCompanies,
                timelineWeeks,
                weeklyHours,
                focusAreas,
                milestones,
                recommendedResources,
                lastUpdated: new Date()
            },
            { upsert: true, new: true }
        );

        res.status(200).json({
            success: true,
            message: "Study plan created successfully",
            studyPlan
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Get company-specific resources
export const getCompanyResources = async (req, res) => {
    try {
        const { company } = req.params;

        const resources = await PreparationResource.find({
            isActive: true,
            companySpecific: { $in: [company] }
        }).sort({ rating: -1 });

        res.status(200).json({
            success: true,
            company,
            resources
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
