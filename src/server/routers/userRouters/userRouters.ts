import express from "express";
import { validate } from "express-validation";
import {
  loginUser,
  registerUser,
} from "../../controllers/userControllers/userControllers.js";
import routes from "../routes.js";
import userSchema from "../../schemas/userSchema.js";

const { register, login } = routes;

// eslint-disable-next-line new-cap
const userRouter = express.Router();

userRouter.post(
  register,
  validate(userSchema, {}, { abortEarly: false }),
  registerUser
);

userRouter.post(login, loginUser);

export default userRouter;
