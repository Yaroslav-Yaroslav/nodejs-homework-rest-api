const express = require("express");
const contacts = require("../../models/contacts.js");
const router = express.Router();
const { HttpError } = require("../../helpers");
const validateData = require("../../schemas/contactSchema.js");
const { listContacts } = require("../../controllers/contacts.js");

router.get("/", listContacts);

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    validateData(req.body);

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.removeContact(req.params.contactId);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    validateData(req.body);

    const result = await contacts.updateContact(req.params.contactId, req.body);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
