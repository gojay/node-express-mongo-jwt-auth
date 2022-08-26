import { Document, Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface IUserDoc extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string): Promise<boolean>;
}

export type UpdateUserBody = Partial<IUser>;

export type NewRegisteredUser = Omit<IUser, "role" | "isEmailVerified">;

export type NewCreatedUser = Omit<IUser, "isEmailVerified">;
