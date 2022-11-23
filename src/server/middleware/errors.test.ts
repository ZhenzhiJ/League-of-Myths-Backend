import { generalError, unknownEndpoint } from "./errors";
import type { Response } from "express";
import CustomError from "../../customError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given the function generalError", () => {
  const message = "Failed to connect to the server.";
  const statusCode = 400;
  const publicMessage = "Something went wrong";
  const error = new CustomError(message, publicMessage, statusCode);

  describe("When it receives a error with status 400 and a public message 'Something went wrong'", () => {
    test("Then the status method should be called with 400 and the json method should be called with 'Something went wrong'", () => {
      const expectedMessage = {
        message: publicMessage,
      };

      generalError(error, null, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it receives a error with status 500 and a message 'Failed to connect to the server.'", () => {
    const defaultError = new Error(message);

    test("Then the status method should be called with 500 and the json method should be called with 'Failed to connect to the server'", () => {
      const expectedStatus = 500;
      const expectedMessage = {
        message,
      };
      generalError(defaultError as CustomError, null, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});

describe("Given the function unknownEndpoint", () => {
  describe("When it receives an unknown endpoint", () => {
    test("Then the status method should be called with status 404 and json method should be called with message 'Unknown endpoint'", () => {
      const expectedStatus = 404;
      const expectedMessage = {
        message: "Unknown endpoint",
      };
      unknownEndpoint(null, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
