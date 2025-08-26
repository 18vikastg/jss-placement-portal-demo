import express from "express";
import { 
    loginRecruiter, 
    registerRecruiter, 
    getRecruiterProfile, 
    updateRecruiterProfile 
} from "../controllers/recruiterAuth.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(registerRecruiter);
router.route("/login").post(loginRecruiter);
router.route("/profile").get(isAuthenticated, getRecruiterProfile);
router.route("/profile/update").put(isAuthenticated, updateRecruiterProfile);

export default router;
