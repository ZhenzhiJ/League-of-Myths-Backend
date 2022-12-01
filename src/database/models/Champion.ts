import { Schema, model } from "mongoose";

const championSchema = new Schema({
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
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const Champion = model("Champion", championSchema, "champions");

export default Champion;
