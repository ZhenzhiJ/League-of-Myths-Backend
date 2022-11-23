import type { NextFunction, Request, Response } from "express";
import User from "../../../database/models/User";
import type { RegisterData } from "./types";
import { registerUser } from "./userControllers";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given the registerUser controller", () => {
  const newUser: RegisterData = {
    username: "pacolo",
    password: "pacolo",
    email: "pacolo@pacolo.com",
  };

  describe("When it receives a username 'Pacolo' and password 'pacolo'", () => {
    test("Then it should invoke its method status with statusCode 201 and its method json is called", async () => {
      const expectedStatusCode = 201;

      const req: Partial<Request> = {
        body: newUser,
      };

      User.create = jest.fn().mockResolvedValueOnce(newUser);

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When it receives wrong credentials as register data", () => {
    test("Then it should throw an error with method next", async () => {
      const req: Partial<Request> = {
        body: newUser,
      };

      User.create = jest.fn().mockRejectedValueOnce(new Error(""));

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });
});
