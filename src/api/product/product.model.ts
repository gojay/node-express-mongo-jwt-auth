import mongoose from "mongoose";

import { IProductDoc, IProductModel } from "./product.interface";

const productSchema = new mongoose.Schema<IProductDoc, IProductModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.static(
  "isSkuUnique",
  async function (sku: string): Promise<boolean> {
    const product = await this.findOne({ sku });
    return !!product;
  }
);

const Product = mongoose.model<IProductDoc, IProductModel>(
  "Product",
  productSchema
);

export default Product;
