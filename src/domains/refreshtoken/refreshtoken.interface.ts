import { Document, Model, Schema } from "mongoose";

export interface IRefreshToken {
  token: string;
  user: Schema.Types.ObjectId;
  expiredAt: Date;
}

export interface IRefreshTokenDoc extends IRefreshToken, Document {
  isExpired(): boolean;
}

export type IRefreshTokenModel = Model<IRefreshTokenDoc>;
