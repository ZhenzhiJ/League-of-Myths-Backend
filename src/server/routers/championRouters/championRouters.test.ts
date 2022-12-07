/* eslint-disable @typescript-eslint/naming-convention */
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import jwt from "jsonwebtoken";
import type { Types } from "mongoose";
import mongoose from "mongoose";
import connectDatabase from "../../../database/connectDatabase";
import type { ChampStructure } from "../../controllers/championControllers/types";
import app from "../../app";
import Champion from "../../../database/models/Champion";
import User from "../../../database/models/User";
import { bucket } from "../../middleware/images/backupImage/backupImage";
import environment from "../../../loadEnvironment";
import type { UserTokenPayload } from "../../controllers/userControllers/types";
import { getRandomChampionList } from "../../../factories/championFactory";
import { getRandomUserWithId } from "../../../factories/userFactory";

let server: MongoMemoryServer;

bucket.upload = jest.fn();

const { jwtSecret } = environment;

const charactersList = getRandomChampionList(3);
const user = {
  ...getRandomUserWithId(),
  characters: [charactersList[1]._id, charactersList[0]._id],
};
const userWithoutCharacters = {
  ...getRandomUserWithId(),
  characters: [] as Types.ObjectId[],
};

const token = jwt.sign(
  { username: user.username, id: user._id.toString() } as UserTokenPayload,
  jwtSecret,
  {
    expiresIn: "2d",
  }
);

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
  await User.create(user);
  await User.create(userWithoutCharacters);
  await Champion.create(charactersList[0]);
  await Champion.create(charactersList[1]);
  await Champion.create(newChampion1);
  await Champion.create(newChampion2);
});

afterAll(async () => {
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

  describe("When it receives a request to load my champions and correct token", () => {
    test("Then it should respond with a 200 and a list of private champions", async () => {
      const response = await request(app)
        .get("/champions/my-champions")
        .set({
          Authorization: `Bearer ${token}`,
          characters: [charactersList[1]._id, charactersList[0]._id],
        })
        .expect(200);

      expect(response.body).toHaveProperty("myUserChampions");
    });
  });

  describe("When it receives a requesasdt to load my champions and wrong token", () => {
    test("Then it should respond with a 401", async () => {
      await request(app)
        .get("/champions/my-champions")
        .set({
          Authorization: `Bearer wrong`,
          characters: [],
        })
        .expect(401);
    });
  });
});
