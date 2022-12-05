import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import type { ChampionWithId } from "../server/controllers/championControllers/types.js";

const championFactory = Factory.define<ChampionWithId>(() => ({
  _id: new mongoose.Types.ObjectId(),
  name: faker.random.word(),
  role: faker.random.word(),
  passive: faker.random.word(),
  abilityQ: faker.random.word(),
  abilityW: faker.random.word(),
  abilityE: faker.random.word(),
  ultimateR: faker.random.word(),
  image: faker.image.animals(300, 300),
  imageBackup: faker.image.animals(300, 300),
}));

export const getRandomChampion = () => championFactory.build();

export const getRandomChampionList = (number: number) =>
  championFactory.buildList(number);
