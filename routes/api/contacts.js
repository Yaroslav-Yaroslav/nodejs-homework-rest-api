const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts.js");
const { isValidId, validateBody, authenticate } = require("../../middlewares");
const { updateFavoriteSchema } = require("../../schemas");

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, ctrl.addContact);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put("/:contactId", authenticate, isValidId, ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
