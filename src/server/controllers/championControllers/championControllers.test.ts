import type { Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import CustomError from "../../../customError/CustomError";
import Champion from "../../../database/models/Champion";
import User from "../../../database/models/User";
import {
  getRandomChampion,
  getRandomChampionList,
} from "../../../factories/championFactory";
import { getRandomUserWithId } from "../../../factories/userFactory";
import type { CustomRequest } from "../../CustomRequest";
import {
  createChampion,
  deleteChampion,
  loadChampions,
} from "./championControllers";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given the loadChampions controller", () => {
  const newChampion = getRandomChampionList(3);

  describe("When it receives a request to load all champions", () => {
    test("Then it should return a list of existing champions", async () => {
      const expectedStatus = 200;
      const req: Partial<Request> = {
        body: newChampion,
      };

      Champion.find = jest.fn().mockReturnValue(newChampion);

      await loadChampions(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When there is a error and could not load champions", () => {
    test("Then it should throw an error with method next", async () => {
      const req: Partial<Request> = {
        body: newChampion,
      };

      Champion.find = jest.fn().mockRejectedValueOnce(new Error(""));

      await loadChampions(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given the deleteCharacter controller", () => {
  const idToFind = new mongoose.Types.ObjectId();
  const req: Partial<CustomRequest> = {
    champions: [],
    params: {},
  };

  describe("When it receives a request with championId by params", () => {
    test("Then it should call response's method status with 200 and json with 'Champion succesfully deleted'", async () => {
      req.params = { idChampion: idToFind.toString() };

      Champion.findByIdAndDelete = jest
        .fn()
        .mockResolvedValueOnce({ text: "Champion succesfully deleted" });

      await deleteChampion(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        text: "Champion succesfully deleted",
      });
    });
  });

  describe("When it receives a request with championId by params", () => {
    test("Then it should call response's method status with 200 and json with 'Champion succesfully deleted'", async () => {
      const req: Partial<Request> = {
        params: { idChampion: "1" },
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      Champion.findByIdAndDelete = jest.fn().mockRejectedValue(new Error(""));

      await deleteChampion(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given the createChampion controller", () => {
  const req: Partial<CustomRequest> = {
    champions: [],
    params: {},
  };

  describe("When it receives a request with a new champion", () => {
    test("Then it should create a new champion with the corresponding user id", async () => {
      const expectedStatus = 201;
      const user = getRandomUserWithId();
      const newChampion = getRandomChampion();

      req.body = newChampion;
      User.findById = jest.fn().mockResolvedValue(user);
      User.findByIdAndUpdate = jest.fn().mockResolvedValue([]);

      Champion.create = jest.fn().mockReturnValue(newChampion);

      await createChampion(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toBeCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ message: "Champion created" });
    });
  });

  describe("When it receives a request with wrong data", () => {
    test("Then it should call next with an error", async () => {
      const fatalError = new CustomError("", "Failed to create champion", 500);

      User.findById = jest.fn().mockRejectedValueOnce(fatalError);

      await createChampion(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(fatalError);
    });
  });
});
