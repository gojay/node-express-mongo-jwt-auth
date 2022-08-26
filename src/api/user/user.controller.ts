import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { HttpException } from "exceptions";
import * as userService from "./user.service";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).send(user.toJSON());
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await userService.getUserById(
      new mongoose.Types.ObjectId(req.params["userId"])
    );
    console.log("user", user);
    if (!user) throw new HttpException(404, "User not found");
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await userService.updateUserById(
      new mongoose.Types.ObjectId(req.params["userId"]),
      req.body
    );
    if (!user) throw new HttpException(404, "User not found");
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await userService.deleteUserById(
      new mongoose.Types.ObjectId(req.params["userId"])
    );
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
