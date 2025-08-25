import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { authorizeRoles } from "../middlewares/roleAuth.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

// Only recruiters can register companies
router.route("/register").post(isAuthenticated, authorizeRoles('recruiter'), registerCompany);
// Only recruiters can get their companies
router.route("/get").get(isAuthenticated, authorizeRoles('recruiter'), getCompany);
// All authenticated users can view company details
router.route("/get/:id").get(isAuthenticated, getCompanyById);
// Only recruiters can update their companies
router.route("/update/:id").put(isAuthenticated, authorizeRoles('recruiter'), singleUpload, updateCompany);

export default router;

