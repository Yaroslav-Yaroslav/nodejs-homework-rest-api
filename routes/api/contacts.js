const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts.js");
const { isValidId, validateBody } = require("../../middleware");
const { updateFavoriteSchema } = require("../../schemas/contactSchema.js");

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put("/:contactId", isValidId, ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
