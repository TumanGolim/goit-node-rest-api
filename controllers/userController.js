import multer from "multer";
import jimp from "jimp";
import fs from "fs/promises";
import HttpError from "../helpers/HttpError.js";
import User from "../models/userModel.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export const uploadAvatar = upload.single("avatar");

export const updateAvatar = async (req, res, next) => {
  try {
    const image = await jimp.read(req.file.path);
    await image.resize(250, 250);
    const avatarFileName = `${req.user.id}-${Date.now()}.jpg`;
    await image.write(`public/avatars/${avatarFileName}`);
    await fs.unlink(req.file.path); 
    req.user.avatarURL = `/avatars/${avatarFileName}`;
    await req.user.save();
    res.status(200).json({ avatarURL: req.user.avatarURL });
  } catch (error) {
    next(new HttpError(500, error.message));
  }
};
