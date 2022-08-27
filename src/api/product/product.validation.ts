import Joi from "joi";
import { objectId } from "validations";

const productParams = {
  productId: Joi.string().required().custom(objectId),
};

export const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    sku: Joi.string().required(),
    price: Joi.number().required(),
  }),
};

export const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    sku: Joi.string(),
    price: Joi.number(),
  }),
};

export const getProduct = {
  params: Joi.object().keys(productParams),
};

export const updateProduct = {
  params: Joi.object().keys(productParams),
  body: Joi.object().keys({
    name: Joi.string(),
    sku: Joi.string(),
    price: Joi.number(),
  }),
};

export const deleteProduct = {
  params: Joi.object().keys(productParams),
};
