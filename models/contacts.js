const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "contacts.json");

const readContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};
const writeContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const contacts = await readContacts();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) return null;
  const [contact] = contacts.splice(contactIndex, 1);
  await writeContacts(contacts);
  return contact;
};

const addContact = async (body) => {
  const contacts = await readContacts();
  const newContact = { id: crypto.randomUUID(), ...body };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) return null;
  contacts[contactIndex] = { id: contactId, ...body };
  await writeContacts(contacts);
  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
