import type { NextFunction, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import environment from "../../../../loadEnvironment.js";
import type { ChampionStructure } from "../../../../database/models/Champion";
import type { CustomRequest } from "../../../CustomRequest.js";

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
  if (!req.file) {
    next();
    return;
  }

  const { image } = req.body;

  try {
    const mainImage = image;
    const fileContent = await fs.readFile(path.join(uploadPath, mainImage));

    await bucket.upload(mainImage, fileContent);

    const {
      data: { publicUrl },
    } = bucket.getPublicUrl(mainImage);

    req.body.imageBackup = publicUrl;

    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default backupImage;
