import { Document, Model, Schema } from "mongoose";
import { IResourceDoc } from "resource/resource.interface";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Schema.Types.ObjectId;
}

export interface IUserDoc extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
  IsEmailTaken(email: string): Promise<boolean>;
  GetScopes(resouces: IResourceDoc[]): string[];
}
