import express from "express";
import contactsRouter from "./routes/contactsRoutes.js";
import { contactSchema } from "./schemas/contactsSchemas.js";
import { validateBody } from "./helpers/validateBody.js";

const app = express();

app.use(express.json());

app.use("/api/contacts", validateBody(contactSchema), contactsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
