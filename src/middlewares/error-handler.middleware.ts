import { NextFunction, Request, Response } from "express";
import { HttpException } from "exceptions";

export const ErrorHandlerMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response<any> => {
  switch (error.name) {
    case "HttpException":
      return res
        .status((error as HttpException).status)
        .json({ message: error.message });
    case "UnauthorizeError":
      return res.status(401).json({ message: error.message });
    default:
      return res.status(500).json({ message: error.message });
  }
};
