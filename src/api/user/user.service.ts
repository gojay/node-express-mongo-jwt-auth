import mongoose from "mongoose";
import { HttpException } from "exceptions";
import User from "./user.model";
import { IUserDoc, IUser } from "./user.interface";

export const createUser = async (userBody: IUser): Promise<IUserDoc> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new HttpException(400, "Email already taken");
  }
  return User.create(userBody);
};

export const registerUser = async (
  userBody: Omit<IUser, "role">
): Promise<IUserDoc> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new HttpException(400, "Email already taken");
  }
  return User.create(userBody);
};

export const getUsers = async (): Promise<IUserDoc[]> => {
  const users = await User.find().exec();
  return users;
};

export const getUserById = async (
  id: mongoose.Types.ObjectId
): Promise<IUserDoc | null> => User.findById(id);

export const getUserByEmail = async (
  email: string
): Promise<IUserDoc | null> => {
  return User.findOne({ email });
};

export const updateUserById = async (
  userId: mongoose.Types.ObjectId,
  updateBody: Partial<IUser>
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new HttpException(404, "User not found");
  }
  if (updateBody.email) {
    const isEmailTaken = await User.isEmailTaken(updateBody.email);
    if (isEmailTaken) {
      throw new HttpException(400, "Email already taken");
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
    throw new HttpException(404, "User not found");
  }
  await user.remove();
  return user;
};
