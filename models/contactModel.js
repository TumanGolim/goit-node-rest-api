import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  email: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  avatarURL: String, 
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
