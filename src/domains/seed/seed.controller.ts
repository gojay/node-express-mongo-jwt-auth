import { NextFunction, Request, Response } from "express";
import * as seedService from "./seed.service";

export const seedUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const roles = await seedService.seedUsers();
    res.json(roles);
  } catch (error) {
    next(error);
  }
};
