import type { NextFunction, Response, Request } from "express";
import { bucket } from "../backupImage/backupImage";

export const getChampionImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { originalUrl } = req;

  if (!originalUrl.startsWith("/assets")) {
    next();
    return;
  }

  const [, , imageName] = originalUrl.split("/");

  const {
    data: { publicUrl },
  } = bucket.getPublicUrl(imageName);

  res.redirect(publicUrl);
};
