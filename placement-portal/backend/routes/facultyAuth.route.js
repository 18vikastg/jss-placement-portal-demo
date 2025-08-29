import express from "express";
import { 
    loginFaculty, 
    registerFaculty, 
    getFacultyProfile, 
    updateFacultyProfile 
} from "../controllers/facultyAuth.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(registerFaculty);
router.route("/login").post(loginFaculty);
router.route("/profile").get(isAuthenticated, getFacultyProfile);
router.route("/profile/update").put(isAuthenticated, updateFacultyProfile);

export default router;
