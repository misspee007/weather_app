const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const appRouter = require("./src/routes/app.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/city", appRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// 404 route
app.use("*", (req, res) => {
  return res.status(404).json({ message: "Route not found" });
});

// Error Handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
