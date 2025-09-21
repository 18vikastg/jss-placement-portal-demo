import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { authorizeRoles } from "../middlewares/roleAuth.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

// Only recruiters can post jobs
router.route("/post").post(isAuthenticated, authorizeRoles('recruiter'), postJob);
// Public route - anyone can view jobs (for homepage, etc.)
router.route("/get").get(getAllJobs);
// Only recruiters can get their posted jobs
router.route("/getadminjobs").get(isAuthenticated, authorizeRoles('recruiter'), getAdminJobs);
// Public route - anyone can view job details  
router.route("/get/:id").get(getJobById);

export default router;

