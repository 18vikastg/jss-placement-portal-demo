import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { authorizeRoles } from "../middlewares/roleAuth.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
 
const router = express.Router();

// Students can apply for jobs
router.route("/apply/:id").get(isAuthenticated, authorizeRoles('student'), applyJob);
// Students can get their applied jobs
router.route("/get").get(isAuthenticated, authorizeRoles('student'), getAppliedJobs);
// Recruiters can get applicants for their jobs
router.route("/:id/applicants").get(isAuthenticated, authorizeRoles('recruiter'), getApplicants);
// Recruiters can update application status
router.route("/status/:id/update").post(isAuthenticated, authorizeRoles('recruiter'), updateStatus);
 

export default router;

