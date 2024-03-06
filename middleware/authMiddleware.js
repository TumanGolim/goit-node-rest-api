import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedData.id);
    }

    if (!decodedData) {
      return res.status(401).json({ message: "Not authorized" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

export default authMiddleware;
