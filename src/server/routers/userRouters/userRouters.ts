import express from "express";
import { validate } from "express-validation";
import { registerUser } from "../../controllers/userControllers/userControllers.js";
import routes from "../routes.js";
import userSchema from "../../schemas/userSchema.js";

const { register } = routes;

// eslint-disable-next-line new-cap
const userRouter = express.Router();

userRouter.post(
  register,
  validate(userSchema, {}, { abortEarly: false }),
  registerUser
);

export default userRouter;
