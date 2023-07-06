const Joi = require("joi");

const { HttpError } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const validateData = (body) => {
  const { error } = addSchema.validate(body, { abortEarly: false });

  if (error) {
    const requiredFields = error.details
      .filter((detail) => detail.type === "any.required")
      .map((detail) => detail.path);
    if (requiredFields.length > 0) {
      throw HttpError(
        400,
        `missing required field: ${requiredFields.join(", ")}.`
      );
    } else {
      const invalidFields = error.details.map((detail) => detail.path);
      throw HttpError(400, `invalid field: ${invalidFields.join(", ")}.`);
    }
  }
};
module.exports = validateData;
