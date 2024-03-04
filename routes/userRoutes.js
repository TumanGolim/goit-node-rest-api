// routes/userRoutes.js

import express from "express";
import { getCurrentUser } from "../controllers/userControllers.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/current", authenticateToken, getCurrentUser); // Добавляем мидлвэр для проверки токена

export default router;
