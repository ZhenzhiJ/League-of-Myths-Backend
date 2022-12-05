import type { NextFunction } from "express";
import fs from "fs/promises";
import { getRandomChampion } from "../../../../factories/championFactory";
import environment from "../../../../loadEnvironment";
import type { CustomRequest } from "../../../CustomRequest";
import resizeImage from "./resizeImage";

const { uploadPath } = environment;
const newChampion = getRandomChampion();

let mockToFile = jest.fn();

jest.mock("sharp", () => () => ({
  resize: jest.fn().mockReturnValue({
    webp: jest.fn().mockReturnValue({
      toFormat: jest.fn().mockReturnValue({
        toFile: mockToFile,
      }),
    }),
  }),
}));

const file: Partial<Express.Multer.File> = {
  filename: "test",
  originalname: "testjpg",
};

const req: Partial<CustomRequest> = {
  body: newChampion,
};

const next = jest.fn() as NextFunction;

beforeAll(async () => {
  await fs.writeFile(`${uploadPath}/randomchampion`, "randomchampion");
});

afterAll(async () => {
  await fs.unlink(`${uploadPath}/randomchampion`);
});

describe("Given the imageResize middleware", () => {
  describe("When it's instantiated with a valid image", () => {
    test("Then it should call next", async () => {
      const expectedFilename = "test";
      req.file = file as Express.Multer.File;

      await resizeImage(req as CustomRequest, null, next);

      expect(req.file.filename).toBe(expectedFilename);
    });
  });

  describe("When it's instantiated with an invalid image", () => {
    test("Then it should call next", async () => {
      jest.clearAllMocks();
      jest.restoreAllMocks();

      mockToFile = jest.fn().mockRejectedValue(new Error());

      await resizeImage(req as CustomRequest, null, next);

      expect(next).toBeCalled();
    });
  });

  describe("When it's instantiated withouth an image", () => {
    test("Then it should call next", async () => {
      const request: Partial<CustomRequest> = {
        body: newChampion,
      };

      await resizeImage(request as CustomRequest, null, next);

      expect(next).toBeCalled();
    });
  });
});
