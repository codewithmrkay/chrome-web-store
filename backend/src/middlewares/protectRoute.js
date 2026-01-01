import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const protectRoute = async (req, res,next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({ message: "Not authenticated" })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decode.userId)
        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }

        req.user = user 
        next()
    } catch (error) {
        console.log("error in protectRoute", error)
        res.status(500).json({ message: "internal server error" })
    }
}
export default protectRoute