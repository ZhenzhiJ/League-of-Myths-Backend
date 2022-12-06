import type { InferSchemaType } from "mongoose";
import { Schema, model } from "mongoose";

export const championSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  passive: {
    type: String,
    required: true,
  },
  abilityQ: {
    type: String,
    required: true,
  },
  abilityW: {
    type: String,
    required: true,
  },
  abilityE: {
    type: String,
    required: true,
  },
  ultimateR: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imageBackup: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export type ChampionStructure = InferSchemaType<typeof championSchema>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const Champion = model("Champion", championSchema, "champions");

export default Champion;
