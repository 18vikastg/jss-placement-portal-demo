import express from "express";
import { 
    getFacultyDashboard,
    getStudents,
    getStudentProfile,
    getApplicationsOverview,
    generateDepartmentReport
} from "../controllers/faculty.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { isFaculty, hasPermission } from "../middlewares/roleAuth.js";

const router = express.Router();

// Faculty dashboard
router.get("/dashboard", isAuthenticated, isFaculty, getFacultyDashboard);

// Student management
router.get("/students", isAuthenticated, isFaculty, hasPermission('canViewAllStudents'), getStudents);
router.get("/student/:studentId", isAuthenticated, isFaculty, hasPermission('canViewAllStudents'), getStudentProfile);

// Applications overview
router.get("/applications", isAuthenticated, isFaculty, hasPermission('canViewApplications'), getApplicationsOverview);

// Reports
router.get("/reports/department", isAuthenticated, isFaculty, hasPermission('canGenerateReports'), generateDepartmentReport);

export default router;
