import express from "express";
import * as contactsControllers from "../controllers/contactsControllers.js";

const router = express.Router();

router.get("/", contactsControllers.getAllContacts);
router.get("/:id", contactsControllers.getOneContact);
router.post("/", contactsControllers.createContact);
router.delete("/:id", contactsControllers.deleteContact);
router.put("/:id", contactsControllers.updateContact);
router.patch("/:contactId/favorite", async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    const updatedContact = await contactsControllers.updateFavoriteStatus(
      contactId,
      favorite
    );
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
