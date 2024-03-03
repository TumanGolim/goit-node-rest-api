import express from "express";
import {
  getCurrentUser,
  logoutUser,
} from "../controllers/contactsControllers.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/current", authenticateToken, getCurrentUser);
router.post("/logout", authenticateToken, logoutUser);

export default router;
