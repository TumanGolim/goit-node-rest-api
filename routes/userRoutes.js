import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ dest: "tmp/" });

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/current", authMiddleware, getCurrentUser);
router.patch("/", authMiddleware, updateSubscription);
router.patch("/avatars", authMiddleware, upload.single("avatar"), updateAvatar);

export default router;
