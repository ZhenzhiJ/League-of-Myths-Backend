import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import type { UserWithId } from "../server/controllers/userControllers/types.js";
import mongoose from "mongoose";

const userWithIdFactory = Factory.define<UserWithId>(() => ({
  username: faker.internet.userName(),
  password: faker.internet.password(),
  email: faker.internet.email(),
  _id: new mongoose.Types.ObjectId(),
  champions: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
}));

export const getRandomUserWithId = () => userWithIdFactory.build();
