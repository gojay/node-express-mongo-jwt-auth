import mongoose from "mongoose";

import { HttpError } from "exceptions";

import User from "./user.model";
import { IUserDoc, IUser } from "./user.interface";

export const createUser = async (userBody: IUser): Promise<IUserDoc> => {
  if (await User.IsEmailTaken(userBody.email)) {
    throw new HttpError(400, "Email already taken");
  }
  return User.create(userBody);
};

export const getUsers = async (fields?: string): Promise<IUserDoc[]> => {
  const users = User.find();
  if (fields) {
    users.select(fields);
  }
  return users.populate({
    path: "role",
    model: "Role",
    select: "_id name resources",
    populate: {
      path: "resources",
      model: "Resource",
      select: "-_id scopes",
    },
  });
};

export const getUserById = async (
  id: mongoose.Types.ObjectId,
  fields?: string
): Promise<IUserDoc | null> => {
  const user = User.findById(id);
  if (fields) {
    user.select(fields);
  }
  return user.exec();
};

export const getUserByEmail = async (
  email: string,
  fields?: string
): Promise<IUserDoc | null> => {
  const user = User.findOne({ email });
  if (fields) {
    user.select(fields);
  }
  return user.exec();
};

export const updateUserById = async (
  userId: mongoose.Types.ObjectId,
  updateBody: Partial<IUser>
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new HttpError(404, "User not found");
  }
  if (updateBody.email) {
    const IsEmailTaken = await User.IsEmailTaken(updateBody.email);
    if (IsEmailTaken) {
      throw new HttpError(400, "Email already taken");
    }
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

export const deleteUserById = async (
  userId: mongoose.Types.ObjectId
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new HttpError(404, "User not found");
  }
  await user.remove();
  return user;
};
