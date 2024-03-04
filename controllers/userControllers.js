// controllers/userControllers.js

import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import {
  registerValidationSchema,
  loginValidationSchema,
} from "../validators/userValidator.js";

export const registerUser = async (req, res, next) => {
  try {
    // Валидация данных
    const { error } = registerValidationSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }

    const { email, password } = req.body;

    // Проверка, существует ли пользователь с таким email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new HttpError(409, "Email in use");
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(new HttpError(error.status || 500, error.message));
  }
};

export const loginUser = async (req, res, next) => {
  try {
    // Валидация данных
    const { error } = loginValidationSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }

    const { email, password } = req.body;

    // Поиск пользователя по email
    const user = await User.findOne({ email });
    if (!user) {
      throw new HttpError(401, "Email or password is wrong");
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpError(401, "Email or password is wrong");
    }

    // Генерация JWT токена
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Сохранение токена в пользователе
    user.token = token;
    await user.save();

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(new HttpError(error.status || 500, error.message));
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Поиск пользователя по _id
    const user = await User.findById(userId);
    if (!user) {
      throw new HttpError(401, "Not authorized");
    }

    // Удаление токена у текущего пользователя
    user.token = null;
    await user.save();

    res.status(204).end();
  } catch (error) {
    next(new HttpError(error.status || 500, error.message));
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    // Данные текущего пользователя уже доступны в req.user благодаря middleware authenticateToken
    const { email, subscription } = req.user;

    res.status(200).json({ email, subscription });
  } catch (error) {
    next(new HttpError(error.status || 500, error.message));
  }
};
