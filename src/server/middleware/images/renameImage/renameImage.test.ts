import fs from "fs/promises";
import path from "path";
import type { ChampionStructure } from "../../../../database/models/Champion";
import { getRandomChampion } from "../../../../factories/championFactory";
import environment from "../../../../loadEnvironment";
import type { CustomRequest } from "../../../CustomRequest.js";
import renameImage from "./renameImage";

const { uploadPath } = environment;

const newChampion = getRandomChampion();

const req: Partial<
  CustomRequest<
    Record<string, unknown>,
    Record<string, unknown>,
    ChampionStructure
  >
> = {
  body: newChampion,
};

const next = jest.fn();

const timestamp = Date.now();
jest.useFakeTimers();
jest.setSystemTime(timestamp);

beforeAll(async () => {
  await fs.writeFile(path.join(uploadPath, "filehash"), Buffer.from(""));
});

afterAll(async () => {
  await fs.unlink(`${uploadPath}/image-${timestamp}.jpg`);
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a imagesRename middleware", () => {
  const expectedFileName = `image-${timestamp}.jpg`;

  describe("When it receives a CustomRequest with an image file 'image.jpg'", () => {
    test("Then it should rename the file by adding a time stamp to the original name and call next", async () => {
      const file: Partial<Express.Multer.File> = {
        filename: "filehash",
        originalname: "image.jpg",
        path: path.join(uploadPath, "filehash"),
      };

      req.file = file as Express.Multer.File;

      await renameImage(req as CustomRequest, null, next);

      expect(req.file.filename).toBe(expectedFileName);
    });
  });

  describe("When it receives a CustomRequest with an image file 'image.jpg' and fs rejects", () => {
    test("Then it should call next with the thrown error", async () => {
      const file: Partial<Express.Multer.File> = {
        filename: "image.jpg",
        originalname: "image.jpg",
        path: path.join(uploadPath, "filehash"),
      };

      req.file = file as Express.Multer.File;

      const error = new Error("");
      fs.rename = jest.fn().mockRejectedValueOnce(error);

      await renameImage(req as CustomRequest, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a CustomRequest without an image file", () => {
    test("Then it should call next with the thrown error", async () => {
      const request: Partial<
        CustomRequest<
          Record<string, unknown>,
          Record<string, unknown>,
          ChampionStructure
        >
      > = {
        body: newChampion,
      };

      await renameImage(request as CustomRequest, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
