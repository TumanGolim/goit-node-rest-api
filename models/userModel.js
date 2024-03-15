const userSchema = new mongoose.Schema({
  verificationToken: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
});
