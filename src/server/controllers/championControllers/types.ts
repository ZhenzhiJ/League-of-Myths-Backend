import type mongoose from "mongoose";

export interface ChampionStructure {
  name: string;
  role: string;
  passive: string;
  abilityQ: string;
  abilityW: string;
  abilityE: string;
  ultimateR: string;
  _id?: mongoose.Types.ObjectId;
}

export interface Champions {
  champions: ChampionStructure[];
}
