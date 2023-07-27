const express = require("express");
const router = express.Router();
const { validateBody, authenticate, upload } = require("../../middlewares");
const {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
} = require("../../schemas");
const ctrl = require("../../controllers/auth");

router.post("/register", validateBody(registerSchema), ctrl.register);

router.post("/login", validateBody(loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/users",
  authenticate,
  validateBody(updateSubscriptionSchema),
  ctrl.updateSubscriptionUser
);

router.patch('/wwwavatars', authenticate, upload.single("avatar"), ctrl.updateAvatar)

module.exports = router;
