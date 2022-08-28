import { Document, Model } from "mongoose";

export interface IProduct {
  name: string;
  sku: string;
  price: number;
}

export interface IProductDoc extends IProduct, Document {}

export interface IProductModel extends Model<IProductDoc> {
  isSkuUnique(email: string): Promise<boolean>;
}
