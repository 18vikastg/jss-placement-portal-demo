import express from "express";
import { 
    analyseResume, 
    getResumeAnalysisHistory, 
    deleteAnalysis, 
    getAnalysisRecommendations 
} from "../controllers/resumeAnalysis.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

// Route to analyse a resume file
router.route("/analyse").post(
    isAuthenticated, 
    singleUpload, 
    analyseResume
);

// Route to get user's resume analysis history
router.route("/history").get(
    isAuthenticated, 
    getResumeAnalysisHistory
);

// Route to get analysis recommendations
router.route("/recommendations").get(
    isAuthenticated, 
    getAnalysisRecommendations
);

// Route to delete a specific analysis
router.route("/delete/:analysisId").delete(
    isAuthenticated, 
    deleteAnalysis
);

export default router;
