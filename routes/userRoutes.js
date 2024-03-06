import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/current", authMiddleware, getCurrentUser);
router.patch("/", authMiddleware, updateSubscription);

export default router;
