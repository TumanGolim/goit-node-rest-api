import express from "express";
import { updateAvatar } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.patch("/avatars", authMiddleware, updateAvatar);

export default router;
