const nodemailer = require("nodemailer");
const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "yakovenko.ya@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "yakovenko.ya@meta.ua" };
    await transport.sendMail(email);
    console.log("Email send success");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = sendEmail;
