import { PlacementStats } from "../models/placementStats.model.js";

// Get latest placement statistics
export const getLatestPlacementStats = async (req, res) => {
    try {
        const latestStats = await PlacementStats.findOne({ isActive: true })
            .sort({ year: -1 })
            .lean();

        if (!latestStats) {
            return res.status(404).json({
                message: "No placement statistics found",
                success: false
            });
        }

        res.status(200).json({
            message: "Placement statistics retrieved successfully",
            success: true,
            data: latestStats
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Get placement statistics by year
export const getPlacementStatsByYear = async (req, res) => {
    try {
        const { year } = req.params;
        
        const stats = await PlacementStats.findOne({ 
            year: parseInt(year), 
            isActive: true 
        }).lean();

        if (!stats) {
            return res.status(404).json({
                message: `No placement statistics found for year ${year}`,
                success: false
            });
        }

        res.status(200).json({
            message: "Placement statistics retrieved successfully",
            success: true,
            data: stats
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Get all available years
export const getAvailableYears = async (req, res) => {
    try {
        const years = await PlacementStats.find({ isActive: true })
            .select('year')
            .sort({ year: -1 })
            .lean();

        res.status(200).json({
            message: "Available years retrieved successfully",
            success: true,
            data: years.map(item => item.year)
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Get placement trends (multiple years comparison)
export const getPlacementTrends = async (req, res) => {
    try {
        const trends = await PlacementStats.find({ isActive: true })
            .select('year overallPlacementPercentage highestPackage averagePackage totalCompanies totalOffers')
            .sort({ year: -1 })
            .limit(5)
            .lean();

        res.status(200).json({
            message: "Placement trends retrieved successfully",
            success: true,
            data: trends
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Admin: Create/Update placement statistics
export const upsertPlacementStats = async (req, res) => {
    try {
        const {
            year,
            totalUGPlaced,
            totalPGPlaced,
            totalUGEligible,
            totalPGEligible,
            placementPercentageUG,
            placementPercentagePG,
            overallPlacementPercentage,
            medianPackageUG,
            medianPackagePG,
            averagePackage,
            highestPackage,
            lowestPackage,
            totalOffers,
            totalCompanies,
            topRecruiters,
            departmentWiseStats,
            trainingActivities,
            placementHighlights
        } = req.body;

        const existingStats = await PlacementStats.findOne({ year });

        if (existingStats) {
            // Update existing record
            const updatedStats = await PlacementStats.findOneAndUpdate(
                { year },
                {
                    totalUGPlaced,
                    totalPGPlaced,
                    totalUGEligible,
                    totalPGEligible,
                    placementPercentageUG,
                    placementPercentagePG,
                    overallPlacementPercentage,
                    medianPackageUG,
                    medianPackagePG,
                    averagePackage,
                    highestPackage,
                    lowestPackage,
                    totalOffers,
                    totalCompanies,
                    topRecruiters,
                    departmentWiseStats,
                    trainingActivities,
                    placementHighlights,
                    lastUpdated: new Date()
                },
                { new: true }
            );

            return res.status(200).json({
                message: "Placement statistics updated successfully",
                success: true,
                data: updatedStats
            });
        } else {
            // Create new record
            const newStats = await PlacementStats.create({
                year,
                totalUGPlaced,
                totalPGPlaced,
                totalUGEligible,
                totalPGEligible,
                placementPercentageUG,
                placementPercentagePG,
                overallPlacementPercentage,
                medianPackageUG,
                medianPackagePG,
                averagePackage,
                highestPackage,
                lowestPackage,
                totalOffers,
                totalCompanies,
                topRecruiters,
                departmentWiseStats,
                trainingActivities,
                placementHighlights
            });

            return res.status(201).json({
                message: "Placement statistics created successfully",
                success: true,
                data: newStats
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
