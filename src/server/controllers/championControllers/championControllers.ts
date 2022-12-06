import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import CustomError from "../../../customError/CustomError.js";
import Champion from "../../../database/models/Champion.js";
import User from "../../../database/models/User.js";
import type { CustomRequest } from "../../CustomRequest.js";
import type { ChampionStructure, ChampStructure } from "./types.js";

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

export const createChampion = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  const {
    name,
    role,
    passive,
    image,
    imageBackup,
    abilityQ,
    abilityW,
    abilityE,
    ultimateR,
  } = req.body as ChampionStructure;

  try {
    const newChampion: ChampStructure = {
      name,
      role,
      passive,
      image,
      imageBackup,
      abilityQ,
      abilityW,
      abilityE,
      ultimateR,
      createdBy: new mongoose.Types.ObjectId(userId),
    };

    const createNewChampion = await Champion.create(newChampion);

    const user = await User.findById(userId);

    user.champions.push(createNewChampion.id);

    await User.findByIdAndUpdate(userId, user);

    res.status(201).json({ message: "Champion created" });
  } catch (error: unknown) {
    const newError = new CustomError(
      (error as Error).message,
      "Failed to create champion",
      500
    );

    next(newError);
  }
};
