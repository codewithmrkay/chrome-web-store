// routes/admin.route.js
import express from "express";
import { bulkAddGlobalShortcuts, createGlobalCategory, createGlobalShortcut, deleteGlobalCategory, deleteGlobalShortcut, getGlobalCategory, getGlobalShortcut, updateGlobalShortcut } from "../controllers/admin.controller.js";
import protectRoute from "../middlewares/protectRoute.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const Route = express.Router();

Route.post( "/categories", protectRoute, isAdmin, createGlobalCategory );
Route.delete( "/categories/:id", protectRoute, isAdmin, deleteGlobalCategory );
Route.get( "/categories", getGlobalCategory );

Route.post( "/shortcuts", protectRoute, isAdmin, createGlobalShortcut );
Route.get( "/shortcuts", getGlobalShortcut );
Route.put( "/shortcuts/:id", protectRoute, isAdmin, updateGlobalShortcut);
Route.post( "/shortcuts/bulk", protectRoute, isAdmin, bulkAddGlobalShortcuts);
Route.delete( "/shortcuts/:id", protectRoute, isAdmin, deleteGlobalShortcut );

export default Route;
