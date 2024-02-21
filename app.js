import express from "express";
import bodyParser from "body-parser";
import contactsRouter from "./routes/contactsRouter.js";
import axios from "axios";

const app = express();

app.use(bodyParser.json());

app.use("/api/contacts", contactsRouter); 

async function getAllContactsFromAPI() {
  try {
    const response = await axios.get("http://localhost:3000/api/contacts", {
      headers: {
        Authorization:
          "Bearer PMAK-65d601028c53ed0001e6aee7-c746784d6d75831ba64a01df44faa62110",
      },
    });
    console.log("Список контактов:", response.data);
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

getAllContactsFromAPI();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
