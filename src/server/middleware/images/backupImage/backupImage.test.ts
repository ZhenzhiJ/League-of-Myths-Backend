import type { NextFunction } from "express";
import fs from "fs/promises";
import { getRandomChampion } from "../../../../factories/championFactory";
import type { CustomRequest } from "../../../CustomRequest";
import imageBackup, { bucket } from "./backupImage";

const newChampion = getRandomChampion();
delete newChampion.imageBackup;

const file: Partial<Express.Multer.File> = {
  filename: "test",
  originalname: "testjpg",
};

const req: Partial<CustomRequest> = {
  body: newChampion,
};

const next = jest.fn() as NextFunction;

afterAll(async () => {
  jest.clearAllMocks();
});

describe("Given a imageBackup middleware", () => {
  describe("When it's invoked with a request that has a file", () => {
    test("Then it should rename the file, upload it to supabase and call next", async () => {
      req.file = file as Express.Multer.File;
      fs.readFile = jest.fn().mockResolvedValueOnce(newChampion.image);

      bucket.upload = jest.fn().mockResolvedValueOnce(undefined);

      bucket.getPublicUrl = jest.fn().mockReturnValueOnce({
        data: { publicUrl: newChampion.image },
      });
      await imageBackup(req as CustomRequest, null, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's invoked with an invalid request", () => {
    test("Then it should call next", async () => {
      req.file = file as Express.Multer.File;
      await imageBackup(req as CustomRequest, null, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's invoked with a request that doesn't have a file", () => {
    test("Then it should call next", async () => {
      const request: Partial<CustomRequest> = {
        body: newChampion,
      };

      await imageBackup(request as CustomRequest, null, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
