import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { createShortcut, deleteShortcut, getShortcuts, updateGlobalShortcutStarCount, updateShortcut } from "../controllers/shortcut.controller.js"
const Route = express.Router()

Route.post("/create", protectRoute,createShortcut )
Route.get("/get", protectRoute, getShortcuts)
Route.put("/update/:id", protectRoute, updateShortcut)
Route.put("/updatestar/:id", protectRoute, updateGlobalShortcutStarCount)
Route.delete("/delete/:id", protectRoute, deleteShortcut)

export default Route