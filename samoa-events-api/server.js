const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Samoa Events API is running"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// placeholder (so we know it runs)
app.get("/events", (req, res) => res.status(200).json([]));
app.get("/rsvps", (req, res) => res.status(200).json([]));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
