import express from "express";
import { 
    getLatestPlacementStats, 
    getPlacementStatsByYear, 
    getAvailableYears, 
    getPlacementTrends,
    upsertPlacementStats 
} from "../controllers/placementStats.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Public routes
router.route("/latest").get(getLatestPlacementStats);
router.route("/year/:year").get(getPlacementStatsByYear);
router.route("/years").get(getAvailableYears);
router.route("/trends").get(getPlacementTrends);

// Admin routes (protected)
router.route("/admin/upsert").post(isAuthenticated, upsertPlacementStats);

export default router;
