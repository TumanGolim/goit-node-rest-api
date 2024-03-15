import { sendVerificationEmail } from "../helpers/emailHelper.js";

export const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const verificationToken = generateVerificationToken();
    user.verificationToken = verificationToken;
    await user.save();

    await sendVerificationEmail(user.email, verificationToken);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
