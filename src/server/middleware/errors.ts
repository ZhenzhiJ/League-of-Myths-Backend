import "../../loadEnvironment.js";
import type { NextFunction, Request, Response } from "express";
import debugConfig from "debug";
import type CustomError from "../../customError/CustomError";

const debug = debugConfig(`league-of-myths:errors`);

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  debug(`There was an error: ${error.message}`);
  const statusCode = error.statusCode ?? 500;
  const publicMessage =
    error.publicMessage || "Failed to connect to the server.";

  res.status(statusCode).json({ message: publicMessage });
};

export const unknownEndpoint = (req: Request, res: Response) => {
  debug("Unknown endpoint");
  res.status(404).json({ message: "Unknown endpoint" });
};
