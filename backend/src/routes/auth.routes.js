import express from "express";
import { forgetPassword, getMe, login, logout, resetPassword, signUp } from "../controllers/auth.controller.js";
import protectRoute from "../middlewares/protectRoute.js";
const Route = express.Router()

Route.post('/signup',signUp)
Route.post('/login',login)
Route.post('/logout',logout)
Route.get('/me',protectRoute,getMe)

Route.get('/forgot-password',forgetPassword)
Route.get('/reset-password',resetPassword)

export default Route