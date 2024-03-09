const jimp = require("jimp");
const fs = require("fs").promises;

exports.uploadAvatar = async (file, userId) => {
  const image = await jimp.read(file.path);
  await image.resize(250, 250);
  const avatarFileName = `${userId}-${Date.now()}.jpg`;
  await image.write(`public/avatars/${avatarFileName}`);
  await fs.unlink(file.path); 
  return `/avatars/${avatarFileName}`;
};
