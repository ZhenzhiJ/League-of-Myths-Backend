import environment from "../loadEnvironment.js";
import mongoose from "mongoose";

const { mongoDebug } = environment;

const connectDatabase = async (mongoDbUrl: string) => {
  await mongoose.connect(mongoDbUrl);

  mongoose.set("debug", mongoDebug);

  mongoose.set("toJSON", {
    virtuals: true,
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return ret;
    },
  });
};

export default connectDatabase;
