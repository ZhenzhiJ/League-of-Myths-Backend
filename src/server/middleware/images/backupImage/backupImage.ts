import type { NextFunction, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import environment from "../../../../loadEnvironment.js";
import type { ChampionStructure } from "../../../../database/models/Champion";
import type { CustomRequest } from "../../../CustomRequest.js";
import CustomError from "../../../../customError/CustomError.js";

const { supabaseBucket, supabaseKey, supabaseUrl, uploadPath } = environment;

const supaBase = createClient(supabaseUrl, supabaseKey);

export const bucket = supaBase.storage.from(supabaseBucket);

const backupImage = async (
  req: CustomRequest<
    Record<string, unknown>,
    Record<string, unknown>,
    ChampionStructure
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const imagePath = path.join(
      uploadPath,
      `${req.file.filename}${req.file.originalname}`
    );
    await fs.rename(path.join(uploadPath, req.file.filename), imagePath);

    const filenameImage = await fs.readFile(imagePath);

    await bucket.upload(
      req.file.originalname + req.file.filename,
      filenameImage
    );

    const {
      data: { publicUrl },
    } = bucket.getPublicUrl(req.file.originalname + req.file.filename);

    req.body.image = imagePath;
    req.body.imageBackup = publicUrl;

    next();
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      "Something goes wrong uploading your image",
      400
    );

    next(customError);
  }
};

export default backupImage;
