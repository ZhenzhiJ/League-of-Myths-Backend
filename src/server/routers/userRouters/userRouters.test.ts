import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDatabase from "../../../database/connectDatabase";
import app from "../../app";
import User from "../../../database/models/User";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
});
describe("Given the method POST and the endpoint '/users/register'", () => {
  const newUser = {
    username: "pikachu",
    password: "pikachu",
    email: "pokachu@chu.com",
  };

  describe("When it receives a request with username 'pikachu', password 'pikachu' and email 'pokachu@chu.com'", () => {
    test("Then it should respond with a 201 and a property user", async () => {
      const response = await request(app)
        .post("/users/register")
        .send(newUser)
        .expect(201);

      expect(response.body).toHaveProperty("user");
    });
  });
});
