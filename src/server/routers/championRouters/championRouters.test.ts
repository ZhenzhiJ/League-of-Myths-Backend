import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDatabase from "../../../database/connectDatabase";
import type { ChampStructure } from "../../controllers/championControllers/types";
import app from "../../app";
import Champion from "../../../database/models/Champion";
import User from "../../../database/models/User";
import { bucket } from "../../middleware/images/backupImage/backupImage";

let server: MongoMemoryServer;

bucket.upload = jest.fn();

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
  await Champion.create(newChampion1);
  await Champion.create(newChampion2);
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.disconnect();
  await server.stop();
});

const newChampion1: ChampStructure = {
  name: "pokachu",
  role: "mid",
  passive: "paraliza",
  abilityQ: "rayo",
  abilityE: "cola ferrea",
  abilityW: "surf",
  ultimateR: "vuelo",
  image: "asdadadadad.png",
  imageBackup: "asasdadsadadd.png",
  createdBy: new mongoose.Types.ObjectId(),
};

const newChampion2: ChampStructure = {
  name: "pokachuaa",
  role: "mid",
  passive: "paraliza",
  abilityQ: "rayo",
  abilityE: "cola ferrea",
  abilityW: "surf",
  ultimateR: "vuelo",
  image: "asasdasdadadd.png",
  imageBackup: "aasdadaddasd.png",
  createdBy: new mongoose.Types.ObjectId(),
};

describe("Given the method GET and the endpoint /champions", () => {
  describe("When it receives a request to load all champions", () => {
    test("Then it should respond with a 200 and a list of champions", async () => {
      const response = await request(app).get("/champions").expect(200);

      expect(response.body).toHaveProperty("allChampions");
    });
  });
});
