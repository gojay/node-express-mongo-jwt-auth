import mongoose from "mongoose";
import { HttpException } from "exceptions";
import Product from "./product.model";
import { IProductDoc, IProduct } from "./product.interface";

export const createProduct = async (body: IProduct): Promise<IProductDoc> => {
  if (await Product.isSkuUnique(body.sku)) {
    throw new HttpException(400, "Sku already exists");
  }
  return Product.create(body);
};

export const getProducts = async (): Promise<IProductDoc[]> => {
  return Product.find();
};

export const getProductById = async (
  id: mongoose.Types.ObjectId
): Promise<IProductDoc | null> => Product.findById(id);

export const getProductByEmail = async (
  email: string
): Promise<IProductDoc | null> => {
  return Product.findOne({ email });
};

export const updateProductById = async (
  productId: mongoose.Types.ObjectId,
  productBody: Partial<IProduct>
): Promise<IProductDoc | null> => {
  const product = await getProductById(productId);
  if (!product) {
    throw new HttpException(404, "Product not found");
  }
  if (productBody.sku) {
    const isSkuUnique = await Product.isSkuUnique(productBody.sku);
    if (isSkuUnique) {
      throw new HttpException(400, "Sku already exists");
    }
  }
  Object.assign(product, productBody);
  return product.save();
};

export const deleteProductById = async (
  productId: mongoose.Types.ObjectId
): Promise<IProductDoc | null> => {
  const product = await getProductById(productId);
  if (!product) {
    throw new HttpException(404, "Product not found");
  }
  return product.remove();
};
