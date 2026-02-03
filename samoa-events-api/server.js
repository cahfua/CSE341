import express from "express";
import dotenv from "dotenv";
dotenv.config();

import session from "express-session";
import passport from "passport";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };

import { connectDb } from "./backend/db/connect.js";
import { configurePassport } from "./backend/auth/passport.js";

import eventRoutes from "./backend/routes/events.js";
import rsvpRoutes from "./backend/routes/rsvps.js";
import authRoutes from "./backend/routes/auth.js";

const app = express();
app.use(express.json());

// sessions (cookie-based auth)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.BASE_URL?.startsWith("https://") || false
    }
  })
);

// passport config + middleware
configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// home
app.get("/", (req, res) => res.send("Samoa Events API is running"));

// swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// auth routes
app.use("/auth", authRoutes);

// API routes
app.use("/events", eventRoutes);
app.use("/rsvps", rsvpRoutes);

const port = process.env.PORT || 8080;

connectDb()
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });
