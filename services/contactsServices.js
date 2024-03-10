import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contactModel.js";

export const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    throw new Error("Unable to list contacts");
  }
};

export const getContactById = async (id) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      throw new Error("Contact not found");
    }
    return contact;
  } catch (error) {
    throw new Error("Unable to get contact by id");
  }
};

export const addContact = async ({ name, email, phone }) => {
  try {
    const newContact = new Contact({ name, email, phone });
    await newContact.save();
    return newContact;
  } catch (error) {
    throw new Error("Unable to add contact");
  }
};

export const removeContact = async (id) => {
  try {
    const removedContact = await Contact.findByIdAndRemove(id);
    if (!removedContact) {
      throw new Error("Contact not found");
    }
    return removedContact;
  } catch (error) {
    throw new Error("Unable to remove contact");
  }
};

export const updateContact = async (id, updatedFields) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    if (!updatedContact) {
      throw new Error("Contact not found");
    }
    return updatedContact;
  } catch (error) {
    throw new Error("Unable to update contact");
  }
};

export const updateStatusContact = async (contactId, favorite) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    if (!updatedContact) {
      throw new Error("Contact not found");
    }
    return updatedContact;
  } catch (error) {
    throw new Error("Unable to update contact status");
  }
};
