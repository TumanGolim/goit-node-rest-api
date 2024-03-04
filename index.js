// index.js

import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
