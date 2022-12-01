import type { Request, Response, NextFunction } from "express";
import Champion from "../../../database/models/Champion.js";

export const loadChampions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allChampions = await Champion.find();

    res.status(200).json({ allChampions });
  } catch (error: unknown) {
    next(error);
  }
};
