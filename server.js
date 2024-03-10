import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import contactsRoutes from "./routes/contactsRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const uri =
  "mongodb+srv://bredihav:44wAnhoKeOy7MrH9@cluster0.aoqgxcm.mongodb.net/<your-database-name>?retryWrites=true&w=majority";

app.use(express.json());

app.use("/users", userRoutes);
app.use("/contacts", contactsRoutes);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) =>
    console.error("Error connecting to MongoDB:", error.message)
  );
