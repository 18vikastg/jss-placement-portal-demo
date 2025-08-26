import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
import {
    getStudentProfile,
    updatePersonalInfo,
    updateAcademicInfo,
    updateSkillsAndProjects,
    uploadDocument,
    updatePlacementPreferences,
    getProfileCompletionBreakdown
} from "../controllers/profile.controller.js";

const router = express.Router();

// Get complete student profile with completion calculation
router.route("/get").get(isAuthenticated, getStudentProfile);

// Get profile completion breakdown by sections
router.route("/completion").get(isAuthenticated, getProfileCompletionBreakdown);

// Update profile sections
router.route("/personal").put(isAuthenticated, updatePersonalInfo);
router.route("/academic").put(isAuthenticated, updateAcademicInfo);
router.route("/skills").put(isAuthenticated, updateSkillsAndProjects);
router.route("/preferences").put(isAuthenticated, updatePlacementPreferences);

// Document upload routes
router.route("/upload").post(isAuthenticated, singleUpload, uploadDocument);

export default router;
