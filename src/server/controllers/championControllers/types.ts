import type mongoose from "mongoose";
import type { InferSchemaType, Types } from "mongoose";
import type { championSchema } from "../../../database/models/Champion";

export interface ChampionStructure {
  name: string;
  role: string;
  passive: string;
  abilityQ: string;
  abilityW: string;
  abilityE: string;
  ultimateR: string;
  image: string;
  imageBackup: string;
  _id?: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
}

export interface Champions {
  champions: ChampionStructure[];
}

export type ChampStructure = InferSchemaType<typeof championSchema>;
export interface ChampionWithId extends ChampionStructure {
  _id: Types.ObjectId;
}
