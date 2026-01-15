const express = require("express");
const app = express();

const port = process.env.PORT || 8080;

// GET all data required by the frontend
app.get("/professional", (req, res) => {
  res.json({
    professionalName: "Celestine Ahfua",
    base64Image: "",

    nameLink: {
      firstName: "Celestine",
      url: "https://www.byui.edu/"
    },

    primaryDescription: " - Web Development Student",

    workDescription1:
      "I am currently learning how to build APIs using Node.js and Express.",

    workDescription2:
      "This page is powered by a backend API endpoint that returns professional profile data.",

    linkTitleText: "Links",

    linkedInLink: {
      text: "LinkedIn",
      link: "linkedin.com/in/celestine-ahfua-6a4829356"
    },

    githubLink: {
      text: "GitHub",
      link: "https://github.com/cahfua"
    }
  });
});

app.get("/", (req, res) => {
  res.send("API is running. Try GET /professional");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
