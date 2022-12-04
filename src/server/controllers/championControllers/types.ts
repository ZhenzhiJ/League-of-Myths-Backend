import type mongoose from "mongoose";
import type { Types } from "mongoose";

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
}

export interface Champions {
  champions: ChampionStructure[];
}

export interface ChampionWithId extends ChampionStructure {
  _id: Types.ObjectId;
}
