import { Document, Model } from "mongoose";

export interface IResource {
  name: string;
  scopes: string[];
}

export interface IResourceDoc extends IResource, Document {}

export type IResourceModel = Model<IResourceDoc>;
