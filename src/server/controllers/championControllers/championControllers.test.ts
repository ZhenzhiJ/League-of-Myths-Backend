import type { Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import Champion from "../../../database/models/Champion";
import type { CustomRequest } from "../../CustomRequest";
import { deleteChampion, loadChampions } from "./championControllers";
import type { ChampionStructure } from "./types";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given the loadChampions controller", () => {
  const newChampion: ChampionStructure = {
    name: "pokachu",
    role: "mid",
    passive: "paraliza",
    abilityQ: "rayo",
    abilityE: "cola ferrea",
    abilityW: "surf",
    ultimateR: "vuelo",
    image: "",
    imageBackup: "",
  };

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
});
