import type { NextFunction, Response } from "express";
import fs from "fs/promises";
import path from "path";
import type { ChampionStructure } from "../../../../database/models/Champion";
import environment from "../../../../loadEnvironment.js";
import type { CustomRequest } from "../../../CustomRequest";

const { uploadPath } = environment;

const renameImage = async (
  req: CustomRequest<
    Record<string, unknown>,
    Record<string, unknown>,
    ChampionStructure
  >,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    next();
    return;
  }

  const timeStamp = Date.now();

  const fileExtension = path.extname(req.file.originalname);
  const fileBaseName = path.basename(req.file.originalname, fileExtension);
  const newFileName = `${fileBaseName}-${timeStamp}${fileExtension}`;
  const newFilePath = path.join(uploadPath, newFileName);

  try {
    await fs.rename(path.join(uploadPath, req.file.filename), newFilePath);

    req.file.filename = newFileName;

    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default renameImage;
