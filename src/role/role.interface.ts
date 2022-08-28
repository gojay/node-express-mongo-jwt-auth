import { Document, Model, Schema } from "mongoose";

export interface IRole {
  name: string;
  title: string;
  resources: Schema.Types.ObjectId[];
}

export interface IRoleDoc extends IRole, Document {}

export type IRoleModel = Model<IRoleDoc>;
