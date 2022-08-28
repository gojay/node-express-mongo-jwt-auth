import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { HttpError } from "exceptions";

export const validateRequest = (schema: Record<string, any>) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const object = Object.keys(schema).reduce<Record<string, any>>(
      (acc, key: string) => {
        switch (key) {
          case "params":
            acc[key] = req.params;
            break;
          case "query":
            acc[key] = req.query;
            break;
          case "body":
            acc[key] = req.body;
            break;
        }
        return acc;
      },
      {}
    );
    const { error } = Joi.compile(schema)
      .prefs({ errors: { label: "key" } })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");
      return next(new HttpError(422, errorMessage));
    }
    return next();
  };
};
