import type { Response, Request } from "express";
import type { CustomRequest } from "../../../CustomRequest";
import { bucket } from "../backupImage/backupImage";
import { getChampionImage } from "./imageUrl";

export interface ImageRequest extends CustomRequest {
  image: File;
  imageFileName: string;
  publicImageUrl: string;
}

const file: Partial<Express.Multer.File> = {
  filename: "test",
  originalname: "testjpg",
};

describe("Given a getTweetImage middleware", () => {
  const res: Partial<Response> = {
    redirect: jest.fn(),
  };
  describe("When receives a request with originalUrl /assets/1234", () => {
    test("Then it should call res.redirect with the publicUrl", async () => {
      const req: Partial<ImageRequest> = {
        originalUrl: "/assets/images/1234",
      };
      req.file = file as Express.Multer.File;

      const next = jest.fn();
      const expectedPublicUrl = "http://localhost:3000/assets/images/1234";

      bucket.getPublicUrl = jest.fn().mockReturnValue({
        data: { publicUrl: expectedPublicUrl },
      });

      await getChampionImage(req as Request, res as Response, next);

      expect(res.redirect).toBeCalledWith(expectedPublicUrl);
    });

    describe("When it receives a request with a path that doesn't start with /assets", () => {
      const req: Partial<Request> = {
        baseUrl: "",
      };
      test("Then it should call next", async () => {
        req.file = file as Express.Multer.File;
        req.originalUrl = "";
        const next = jest.fn();

        await getChampionImage(req as ImageRequest, res as Response, next);

        expect(next).toHaveBeenCalled();
      });
    });

    describe("When it receives a request with a path that doesn't start with /assets", () => {
      const req: Partial<Request> = {
        baseUrl: "",
      };
      test("Then it should call next", async () => {
        req.originalUrl = "";
        const next = jest.fn();

        await getChampionImage(req as ImageRequest, res as Response, next);

        expect(next).toHaveBeenCalled();
      });
    });
  });
});
