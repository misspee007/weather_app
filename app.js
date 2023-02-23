const express = require("express");
const helmet = require("helmet");
const appRouter = require("./src/routes/app.routes");

const app = express();

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
  console.error(err.stack);
	res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
