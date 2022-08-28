import Joi from "joi";

export const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const refreshToken = {
  body: Joi.object().keys({
    refresh_token: Joi.string().required(),
  }),
};
