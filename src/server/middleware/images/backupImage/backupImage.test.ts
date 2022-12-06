/* eslint-disable @typescript-eslint/consistent-type-assertions */
import type { NextFunction, Response } from "express";
import fs from "fs/promises";
import CustomError from "../../../../customError/CustomError";
import { getRandomChampion } from "../../../../factories/championFactory";
import environment from "../../../../loadEnvironment";
import type { CustomRequest } from "../../../CustomRequest";
import backupImage, { bucket } from "./backupImage";

const { uploadPath } = environment;
const newChampion = getRandomChampion();
delete newChampion.imageBackup;

jest.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    storage: {
      from: () => ({
        upload: jest.fn().mockResolvedValue({ error: null }),
        bucket: () => ({
          getPublicUrl: () => ({
            publicUrl: "testFileImage.webptestOriginalImage.webp",
          }),
        }),
      }),
    },
  }),
}));

beforeEach(async () => {
  await fs.writeFile(`${uploadPath}/testFileImage.webp`, "testFileImage");
  await fs.writeFile(
    `${uploadPath}/testOriginalImage.webp`,
    "testOriginalImage"
  );
});

const fileTest = {
  filename: "testFileImage.webp",
  originalname: "testOriginalImage.webp",
} as Partial<Express.Multer.File>;

const req = {
  body: newChampion,
  file: fileTest,
} as Partial<CustomRequest>;

const res: Partial<Response> = {};

const next = jest.fn();
describe("Given the imageBackupUpload middleware", () => {
  describe("When it's invoked with a file that have a file image in it", () => {
    test("Then it should rename the file and upload it to supabase", async () => {
      fs.readFile = jest.fn().mockResolvedValueOnce(newChampion.image);

      bucket.upload = jest.fn();

      bucket.getPublicUrl = jest
        .fn()
        .mockReturnValueOnce({ data: { publicUrl: newChampion.image } });

      await backupImage(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's invoked with a file in the request and throws an error", () => {
    test("Then it should call next with a CustomError", async () => {
      const customError = new CustomError(
        "",
        "Something goes wrong uploading your image",
        400
      );
      fs.readFile = jest.fn().mockRejectedValue(customError);

      await backupImage(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
