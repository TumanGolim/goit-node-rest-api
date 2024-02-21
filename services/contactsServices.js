import { fileURLToPath } from "url";
import fs from "fs/promises";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsFilePath = path.resolve(__dirname, "../db/contacts.json");

export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsFilePath, "utf8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw new Error("Unable to list contacts");
  }
};

export const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === id);
    if (!contact) {
      throw new Error("Contact not found");
    }
    return contact;
  } catch (error) {
    throw new Error("Unable to get contact by id");
  }
};

export const addContact = async (newContact) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(
      contactsFilePath,
      JSON.stringify(updatedContacts, null, 2)
    );
    return newContact;
  } catch (error) {
    throw new Error("Unable to add contact");
  }
};

export const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    await fs.writeFile(
      contactsFilePath,
      JSON.stringify(updatedContacts, null, 2)
    );
    return { id };
  } catch (error) {
    throw new Error("Unable to remove contact");
  }
};

export const updateContact = async (id, updatedFields) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      throw new Error("Contact not found");
    }
    const updatedContact = { ...contacts[index], ...updatedFields };
    contacts[index] = updatedContact;
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    return updatedContact;
  } catch (error) {
    throw new Error("Unable to update contact");
  }
};
