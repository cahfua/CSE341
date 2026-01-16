const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const contactsRoutes = require("./routes/contacts");

const app = express();
app.use(express.json());

// simple home route (optional but helpful)
app.get("/", (req, res) => res.send("Contacts API is running"));

// contacts routes
app.use("/contacts", contactsRoutes);

module.exports = app;
