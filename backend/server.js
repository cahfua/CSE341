const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");
const { initDb } = require("./src/db/connect");

const port = process.env.PORT || 8080;

initDb((err, db) => {
  if (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});
