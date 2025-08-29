import express from "express";
import { 
    getRecruiterDashboard,
    updateCompanyProfile,
    createDrive,
    getCompanyDrives,
    getDriveApplicants,
    updateApplicantStatus,
    bulkUpdateApplicants,
    publishDrive
} from "../controllers/recruiter.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { isRecruiter, hasPermission } from "../middlewares/roleAuth.js";

const router = express.Router();

// Recruiter dashboard
router.get("/dashboard", isAuthenticated, isRecruiter, getRecruiterDashboard);

// Company management
router.put("/company", isAuthenticated, isRecruiter, hasPermission('canManageCompany'), updateCompanyProfile);

// Drive management
router.post("/drive", isAuthenticated, isRecruiter, hasPermission('canCreateDrives'), createDrive);
router.get("/drives", isAuthenticated, isRecruiter, getCompanyDrives);
router.put("/drive/:driveId/publish", isAuthenticated, isRecruiter, publishDrive);

// Applicant management
router.get("/drive/:driveId/applicants", isAuthenticated, isRecruiter, hasPermission('canViewApplications'), getDriveApplicants);
router.put("/drive/:driveId/applicant", isAuthenticated, isRecruiter, hasPermission('canShortlistStudents'), updateApplicantStatus);
router.put("/drive/:driveId/applicants/bulk", isAuthenticated, isRecruiter, hasPermission('canShortlistStudents'), bulkUpdateApplicants);

export default router;
