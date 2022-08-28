import { IResourceDoc } from "domains/resource/resource.interface";
import { Document, Model, Schema } from "mongoose";

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
