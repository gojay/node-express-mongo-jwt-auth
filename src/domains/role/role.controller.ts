import { NextFunction, Request, Response } from "express";
import * as roleService from "./role.service";

export const getRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const roles = await roleService.getRoles();
    res.json(roles);
  } catch (error) {
    next(error);
  }
};
