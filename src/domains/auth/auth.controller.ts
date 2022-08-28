import { NextFunction, Request, Response } from "express";
import * as authService from "./auth.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json(token);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = await authService.refreshToken(req.body.refresh_token);
    res.json(token);
  } catch (error) {
    next(error);
  }
};
