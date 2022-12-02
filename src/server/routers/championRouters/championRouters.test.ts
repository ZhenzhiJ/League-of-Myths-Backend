import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDatabase from "../../../database/connectDatabase";
import type { ChampionStructure } from "../../controllers/championControllers/types";
import app from "../../app";
import Champion from "../../../database/models/Champion";

const newChampion1: ChampionStructure = {
  name: "pokachu",
  role: "mid",
  passive: "paraliza",
  abilityQ: "rayo",
  abilityE: "cola ferrea",
  abilityW: "surf",
  ultimateR: "vuelo",
  image: "asd.png",
  imageBackup: "asd.png",
};

const newChampion2: ChampionStructure = {
  name: "pokachuaa",
  role: "mid",
  passive: "paraliza",
  abilityQ: "rayo",
  abilityE: "cola ferrea",
  abilityW: "surf",
  ultimateR: "vuelo",
  image: "asd.png",
  imageBackup: "asd.png",
};

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
  await Champion.create(newChampion1);
  await Champion.create(newChampion2);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given the method GET and the endpoint /champions", () => {
  describe("When it receives a request to load all champions", () => {
    test("Then it should respond with a 200 and a list of champions", async () => {
      const response = await request(app).get("/champions").expect(200);

      expect(response.body).toHaveProperty("allChampions");
    });
  });
});
