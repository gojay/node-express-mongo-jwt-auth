import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { HttpException } from "exceptions";
import * as productService from "./product.service";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).send(product.toJSON());
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productService.getProductById(
      new mongoose.Types.ObjectId(req.params["productId"])
    );
    console.log("product", product);
    if (!product) throw new HttpException(404, "Product not found");
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productService.updateProductById(
      new mongoose.Types.ObjectId(req.params["productId"]),
      req.body
    );
    if (!product) throw new HttpException(404, "Product not found");
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await productService.deleteProductById(
      new mongoose.Types.ObjectId(req.params["productId"])
    );
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
