import type { Request, Response, NextFunction } from "express";
import CustomError from "../../../customError/CustomError.js";
import Champion from "../../../database/models/Champion.js";
import type { CustomRequest } from "../../CustomRequest.js";

export const loadChampions = async (
  req: CustomRequest,
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

export const deleteChampion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idChampion } = req.params;

  try {
    await Champion.findByIdAndDelete(idChampion);

    res.status(200).json({ text: "Champion succesfully deleted" });
  } catch (error: unknown) {
    const fatalError = new CustomError(
      (error as Error).message,
      "Sorry, try again later",
      500
    );

    next(fatalError);
  }
};
