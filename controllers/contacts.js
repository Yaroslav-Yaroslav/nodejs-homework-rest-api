const contacts = require("../models/contacts.js");
const { HttpError, ctrlWrapper } = require("../helpers");
const validateData = require("../schemas/contactSchema.js");

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  validateData(req.body);
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const result = await contacts.removeContact(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
  validateData(req.body);
  const result = await contacts.updateContact(req.params.contactId, req.body);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
