import express from "express";
const router = express.Router();
import { contactsRoutes } from "../controllers/contactsControllers";

router.patch(
  "/users/avatars",
  upload.single("avatar"),
  contactsControllers.updateAvatar
);

export { router as contactsRoutes };
