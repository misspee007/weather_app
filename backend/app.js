const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const Router = require("./src/routes/routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// serve static files from dist folder
const rootDir = path.resolve("../");
app.use(express.static(path.join(rootDir, "frontend", "src", "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(rootDir, "frontend", "src", "dist", "index.html"));
});

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.use("/api", Router);

// 404 route
app.use("*", (req, res) => {
  return res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
