import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import gravatar from "gravatar";
import jimp from "jimp";
import path from "path";

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const avatarURL = gravatar.url(email, { s: "250", d: "retro" }); 

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL, 
    });
    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    user.token = token;
    await user.save();

    res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    res
      .status(200)
      .json({ email: req.user.email, subscription: req.user.subscription });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const allowedSubscriptions = ["starter", "pro", "business"];
    const { subscription } = req.body;

    if (!subscription || !allowedSubscriptions.includes(subscription)) {
      return res.status(400).json({ message: "Invalid subscription" });
    }

    req.user.subscription = subscription;
    await req.user.save();

    res.status(200).json({
      message: "Subscription updated successfully",
      subscription: req.user.subscription,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const image = await jimp.read(req.file.path);
    await image.resize(250, 250).write(`public/avatars/${req.file.filename}`);

    req.user.avatarURL = `/avatars/${req.file.filename}`;
    await req.user.save();

    res.status(200).json({ avatarURL: req.user.avatarURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
};
