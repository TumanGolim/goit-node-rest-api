import HttpError from "./HttpError.js";

export const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    next(new HttpError(400, error.message));
  } else {
    next();
  }
};
