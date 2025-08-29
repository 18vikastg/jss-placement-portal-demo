import express from "express";
import { 
    logMockInterviewAction, 
    getMockInterviewAnalytics,
    getMockInterviewStats
} from "../controllers/mockInterview.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Student routes
router.route("/log").post(isAuthenticated, logMockInterviewAction);
router.route("/analytics").get(isAuthenticated, getMockInterviewAnalytics);

// Admin/Faculty routes (optional)
router.route("/stats").get(isAuthenticated, getMockInterviewStats);

export default router;
