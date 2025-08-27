import { MockInterviewLog } from "../models/mockInterviewLog.model.js";

// Log mock interview page access or actions
export const logMockInterviewAction = async (req, res) => {
    try {
        const { action } = req.body;
        const studentId = req.id; // From authentication middleware
        
        // Validate action
        const validActions = ['page_access', 'start_interview_clicked'];
        if (!validActions.includes(action)) {
            return res.status(400).json({
                message: "Invalid action type",
                success: false
            });
        }

        // Get additional metadata
        const userAgent = req.headers['user-agent'];
        const ipAddress = req.ip || req.connection.remoteAddress;
        const sessionId = req.sessionID;

        // Create log entry
        const logEntry = await MockInterviewLog.create({
            studentId,
            action,
            userAgent,
            ipAddress,
            sessionId
        });

        return res.status(200).json({
            message: "Action logged successfully",
            success: true,
            data: {
                action,
                timestamp: logEntry.accessedAt
            }
        });

    } catch (error) {
        console.log("Error logging mock interview action:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Get mock interview analytics for a student
export const getMockInterviewAnalytics = async (req, res) => {
    try {
        const studentId = req.id; // From authentication middleware

        // Get all logs for this student
        const logs = await MockInterviewLog.find({ studentId })
            .sort({ accessedAt: -1 })
            .limit(50);

        // Calculate analytics
        const analytics = {
            totalPageAccesses: logs.filter(log => log.action === 'page_access').length,
            totalStartClicks: logs.filter(log => log.action === 'start_interview_clicked').length,
            lastAccessed: logs.length > 0 ? logs[0].accessedAt : null,
            recentLogs: logs.slice(0, 10)
        };

        return res.status(200).json({
            message: "Analytics retrieved successfully",
            success: true,
            data: analytics
        });

    } catch (error) {
        console.log("Error fetching mock interview analytics:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Get mock interview statistics for admin/faculty (optional)
export const getMockInterviewStats = async (req, res) => {
    try {
        // Aggregate statistics
        const stats = await MockInterviewLog.aggregate([
            {
                $group: {
                    _id: {
                        action: "$action",
                        date: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$accessedAt"
                            }
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.date": -1 }
            },
            {
                $limit: 30
            }
        ]);

        // Get unique students who accessed
        const uniqueStudents = await MockInterviewLog.distinct("studentId");

        return res.status(200).json({
            message: "Statistics retrieved successfully",
            success: true,
            data: {
                dailyStats: stats,
                uniqueStudents: uniqueStudents.length,
                totalLogs: await MockInterviewLog.countDocuments()
            }
        });

    } catch (error) {
        console.log("Error fetching mock interview statistics:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
