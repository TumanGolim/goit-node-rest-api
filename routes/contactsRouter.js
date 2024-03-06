import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Contact from "../models/contactModel.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find({ owner: req.user._id });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const newContact = {
      ...req.body,
      owner: req.user._id,
    };
    const createdContact = await Contact.create(newContact);
    res.status(201).json(createdContact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
