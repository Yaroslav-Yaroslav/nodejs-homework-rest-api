const { Contact } = require("../models");
const { HttpError, ctrlWrapper } = require("../helpers");
const { validateData } = require("../schemas");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  if (favorite) {
    const result = await Contact.find(
      { owner, favorite },
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    ).populate("owner", "email");
    res.json(result);
  } else {
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "email");
    res.json(result);
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  validateData(req.body);
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const result = await Contact.findByIdAndRemove(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
  validateData(req.body);
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
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
  updateFavorite: ctrlWrapper(updateFavorite),
};
