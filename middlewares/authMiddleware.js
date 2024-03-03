// authMiddleware.js

import jwt from "jsonwebtoken";
import { User } from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new HttpError(401, "Not authorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user || user.token !== token) {
      throw new HttpError(401, "Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(new HttpError(401, "Not authorized"));
  }
};

export default authenticateToken;
