const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const contactsRoutes = require("./routes/contacts");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
app.use(express.json());

// home route
app.get("/", (req, res) => res.send("Contacts API is running"));

// swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// contacts routes
app.use("/contacts", contactsRoutes);

module.exports = app;