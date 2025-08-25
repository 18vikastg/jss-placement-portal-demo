import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        
        // Get user information including role
        const user = await User.findById(decode.userId).select('-password');
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false
            });
        }
        
        req.id = decode.userId;
        req.user = user; // Add user object with role information
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Authentication failed",
            success: false
        });
    }
}
export default isAuthenticated;