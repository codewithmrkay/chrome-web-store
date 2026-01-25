import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import setAuthCookies from "../utils/setAuthCookie.js"
import generateToken from "../utils/generateToken.js"










export const signUp = async (req, res) => {
    const { username, password, email } = req.body
    try {
        // 1 take input
        if (!username || !password || !email) {
            return res.status(400).json({ message: "all field are required" })
        }

        // 2 validate input
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailPattern.test(email)) {
            return res.status(400).json({ message: "Provide Valid Email" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password legnth at least 6" })
        }


        // 3 check duplicate
        const userNameTaken = await User.findOne({ username })
        if (userNameTaken) {
            return res.status(400).json({ message: "Username is already taken" })
        }
        const emailTaken = await User.findOne({ email })
        if (emailTaken) {
            return res.status(400).json({ message: "Email is already taken" })
        }

        // 4 encrypt password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            username,
            email,
            password: hashedPassword
        })

        // Generate JWT
        const token = generateToken(user)

        // Set cookie
        setAuthCookies(res, token)

        //  Send safe response
        await user.save()
        res.status(201).json({
            message: "Signup successful",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        console.log("error in loginRoute ", error)
        res.status(500).json({ message: "internal server error" })
    }
}
export const login = async (req, res) => {
    const { email, username, password } = req.body
    // validate input
    try {
        if ((!email && !username) || !password) {
            return res.status(400).json({ message: "All Fields Are Required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password at least 6 letter" })
        }
        // find user
        const user = await User.findOne(
            {
                $or: [{ email }, { username }]
            }
        ).select("+password")
        // validate user
        if (!user) {
            return res.status(400).json({ message: "Invalid User" })
        }
        // compaare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid User" })
        }
        // generate token and setting cookie
        const token = generateToken(user)
        setAuthCookies(res, token)

        res.status(200).json({
            message: "login successfully",
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role
            }
        })
    } catch (error) {
        console.log("error in loginRoute ", error)
        res.status(500).json({ message: "internal server error" })
    }
}
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0), // immediately expire
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log("error in logoutRoute ", error)
        res.status(500).json({ message: "internal server error" })
    }
}
export const getMe = async (req, res) => {
    try {
        const user = req.user
        res.status(200).json(user)
    } catch (error) {
        console.log("error in getMeRoute ", error)
        res.status(500).json({ message: "internal server error" })
    }
}





export const forgetPassword = async (req, res) => {
    try {

    } catch (error) {
        console.log("error in loginRoute ", error)
        res.status(500).json({ message: "internal server error" })
    }
}
export const resetPassword = async (req, res) => {
    try {

    } catch (error) {
        console.log("error in loginRoute ", error)
        res.status(500).json({ message: "internal server error" })
    }
}