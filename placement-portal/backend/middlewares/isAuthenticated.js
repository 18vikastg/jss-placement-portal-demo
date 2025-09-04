import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log('Token received:', token ? 'Token exists' : 'No token');
        console.log('Token length:', token ? token.length : 'N/A');
        console.log('Token first 20 chars:', token ? token.substring(0, 20) + '...' : 'N/A');
        
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
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
        console.log('Authentication error:', error.message);
        console.log('Error type:', error.constructor.name);
        return res.status(401).json({
            message: "Authentication failed",
            success: false
        });
    }
}
export default isAuthenticated;