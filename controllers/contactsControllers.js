import contactsService from "../services/contactsServices.js";

export const getAllContacts = (req, res) => {
  const contacts = contactsService.listContacts();
  res.status(200).json(contacts);
};

export const getOneContact = (req, res) => {
  const { id } = req.params;
  const contact = contactsService.getContactById(id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

export const deleteContact = (req, res) => {
  const { id } = req.params;
  const deletedContact = contactsService.removeContact(id);
  if (deletedContact) {
    res.status(200).json(deletedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

export const createContact = (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ message: "Name, email, and phone are required fields" });
  }

  const newContact = contactsService.addContact({ name, email, phone });
  res.status(201).json(newContact);
};

export const updateContact = (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    return res
      .status(400)
      .json({ message: "Body must have at least one field" });
  }

  const updatedContact = contactsService.updateContact(id, {
    name,
    email,
    phone,
  });
  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};
