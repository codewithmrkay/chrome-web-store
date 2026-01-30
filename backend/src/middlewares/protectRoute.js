// middleware/protectRoute.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        // Check Authorization header first, then fallback to cookies
        const authHeader = req.headers.authorization;
        let token = authHeader && authHeader.startsWith('Bearer ') 
            ? authHeader.substring(7) 
            : req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decode.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("error in protectRoute", error);
        
        // More specific error messages
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }
        
        res.status(401).json({ message: "Not authenticated" });
    }
};

export default protectRoute;