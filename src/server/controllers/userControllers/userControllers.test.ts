import type { NextFunction, Request, Response } from "express";
import User from "../../../database/models/User";
import type { RegisterData, UserData } from "./types";
import { loginUser, registerUser } from "./userControllers";
import bcrypt from "bcryptjs";
import CustomError from "../../../customError/CustomError";

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

describe("Given a login controller", () => {
  const loginBody: UserData = {
    username: "pokachu",
    password: "pokachu",
  };

  const req: Partial<Request> = {
    body: loginBody,
  };

  describe("When it receives a  correct username 'pokachu' and password 'pokachu'", () => {
    test("Then it should invoke the response method with a 200 status and its json method with a valid token", async () => {
      const expectedStatus = 200;
      User.findOne = jest.fn().mockReturnValueOnce({
        exec: jest.fn().mockReturnValue(loginBody),
      });
      bcrypt.compare = jest.fn().mockResolvedValueOnce(true);

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When it receives a request with an invalid username", () => {
    test("Then it should invoke the next function with a username error", async () => {
      User.findOne = jest.fn().mockReturnValueOnce({
        exec: jest.fn().mockReturnValue(null),
      });
      const usernameError = new CustomError(
        "Username not found",
        "Wrong credentials",
        401
      );

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toBeCalledWith(usernameError);
    });
  });

  describe("When it receives a valid username 'pokachu' and the wrong password", () => {
    test("Then it should invoke the next function with a password error", async () => {
      User.findOne = jest.fn().mockReturnValueOnce({
        exec: jest.fn().mockReturnValue(loginBody),
      });

      const passwordError = new CustomError(
        "Password is incorrect",
        "Wrong credentials",
        401
      );

      bcrypt.compare = jest.fn().mockResolvedValueOnce(false);

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toBeCalledWith(passwordError);
    });
  });
});
