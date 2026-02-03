import express from "express";
import passport from "passport";

const router = express.Router();

// Start login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback after Google approves
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api-docs"
  }),
  (req, res) => {
    // After login, send them somewhere obvious
    res.redirect("/api-docs");
  }
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logged out" });
  });
});

// Confirm login status
router.get("/me", (req, res) => {
  if (!req.isAuthenticated?.() || !req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.status(200).json(req.user);
});

export default router;
