import express from "express";
import bodyParser from "body-parser";
import contactsRouter from "./routes/contactsRouter.js";

const app = express();

app.use(bodyParser.json());

app.use("/api/contacts", contactsRouter);
