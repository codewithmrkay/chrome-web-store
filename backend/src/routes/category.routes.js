import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { createCateGory, deleteCateGory, getCateGory, updateCategory } from "../controllers/category.controller.js";
const Route = express.Router()

Route.post('/create',protectRoute,createCateGory)
Route.delete('/delete/:id',protectRoute,deleteCateGory)
Route.put('/update/:id',protectRoute,updateCategory)
Route.get('/get',protectRoute,getCateGory)

export default Route