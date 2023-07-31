const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

const { DB_TEST_HOST, SECRET_KEY } = process.env;

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
  });
  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_HOST);
  });
  beforeEach(async () => {
    await User.deleteMany();
    await supertest(app).post("/api/auth/register").send({
      email: "test@example.com",
      password: "qwerty123",
    });
  });

  test("should login existing user", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "qwerty123",
    });

    expect(response.statusCode).toBe(200);
  });

  test("the response must return a token", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "qwerty123",
    });
    const { token } = response.body;
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ email: "test@example.com" });
    expect(decoded.id).toBe(user._id.toString());
  });

  test("the user object with 2 fields email and subscription with the String data type should be returned in the response", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "qwerty123",
    });
    const { email, subscription } = response.body.user;
    expect(email).toBe("test@example.com");
    expect(subscription).toBe("starter");
    expect(typeof email && typeof subscription).toBe("string");
  });
});
