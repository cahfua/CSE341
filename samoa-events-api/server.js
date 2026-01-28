import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };

import eventRoutes from "./backend/routes/events.js";
import rsvpRoutes from "./backend/routes/rsvps.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Samoa Events API is running"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/events", eventRoutes);
app.use("/rsvps", rsvpRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));