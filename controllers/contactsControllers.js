const contactsServices = require("../services/contactsServices");

exports.updateAvatar = async (req, res, next) => {
  try {
    const avatarURL = await contactsServices.uploadAvatar(
      req.file,
      req.user.id
    );
    res.json({ avatarURL });
  } catch (error) {
    next(error);
  }
};
