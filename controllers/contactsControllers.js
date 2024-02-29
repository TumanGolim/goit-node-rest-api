import express from "express";
import { updateStatusContact } from "../services/contactsServices.js";

const router = express.Router();

router.patch("/:contactId/favorite", async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    const updatedContact = await updateStatusContact(contactId, favorite);
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
