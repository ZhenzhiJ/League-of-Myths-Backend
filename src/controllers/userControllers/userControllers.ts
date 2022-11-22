import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import type { RegisterData } from "./types.js";
import User from "../../database/models/User.js";
import CustomError from "../../customError/CustomError.js";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, username } = req.body as RegisterData;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    res.status(201).json({ user: { username: newUser.username } });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      "Error registering new user",
      500
    );
    next(customError);
  }
};
