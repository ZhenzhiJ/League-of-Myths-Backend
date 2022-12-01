import environment from "../../../loadEnvironment.js";
import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { RegisterData, UserData } from "./types.js";
import User from "../../../database/models/User.js";
import CustomError from "../../../customError/CustomError.js";

const { jwtSecret } = environment;

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, username } = req.body as RegisterData;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword,
      email,
    });

    res.status(201).json({ user: { username } });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      "Error registering new user",
      500
    );
    next(customError);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as UserData;

  const user = await User.findOne({ username }).exec();

  if (!user) {
    const error = new CustomError(
      "Username not found",
      "Wrong credentials",
      401
    );
    next(error);
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    const error = new CustomError(
      "Password is incorrect",
      "Wrong credentials",
      401
    );
    next(error);
    return;
  }

  const tokenPayload = {
    id: user._id,
    username,
  };

  const token = jwt.sign(tokenPayload, jwtSecret, {
    expiresIn: "2d",
  });

  res.status(200).json({ token });
};
