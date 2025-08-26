import express from "express";
import {
    getPreparationResources,
    getResourceCategories,
    updateUserProgress,
    toggleBookmark,
    getBookmarkedResources,
    getUserDashboard,
    createStudyPlan,
    getCompanyResources
} from "../controllers/preparation.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Public routes
router.route("/resources").get(getPreparationResources);
router.route("/categories").get(getResourceCategories);
router.route("/company/:company").get(getCompanyResources);

// Protected routes (require authentication)
router.route("/progress/:resourceId").put(isAuthenticated, updateUserProgress);
router.route("/bookmark/:resourceId").put(isAuthenticated, toggleBookmark);
router.route("/bookmarks").get(isAuthenticated, getBookmarkedResources);
router.route("/dashboard").get(isAuthenticated, getUserDashboard);
router.route("/study-plan").post(isAuthenticated, createStudyPlan);

export default router;
