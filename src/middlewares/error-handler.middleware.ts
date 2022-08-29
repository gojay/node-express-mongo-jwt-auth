import { NextFunction, Request, Response } from "express";
import { HttpError } from "exceptions";

export const ErrorHandlerMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response<any> => {
  switch (error.name) {
    case "HttpError":
      return res
        .status((error as HttpError).status)
        .json({ message: error.message });
    case "UnauthorizedError":
    case "RefreshTokenError":
      return res.status(401).json({ message: error.message });
    default:
      return res.status(500).json({ message: error.message });
  }
};
