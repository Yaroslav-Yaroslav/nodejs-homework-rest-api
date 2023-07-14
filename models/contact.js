const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name for the contact"] },
    email: { type: String },
    phone: { type: String },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);
// Дубляж для засвоэння ынформації, так як помилку ловимо Joi
contactSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});
const Contact = model("contact", contactSchema);

module.exports = Contact;
