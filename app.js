import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import contactsRoutes from "./routes/contactsRouter.js";
import path from "path";

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public"))); 

app.use("/users", userRoutes);
app.use("/contacts", contactsRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI, {
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
