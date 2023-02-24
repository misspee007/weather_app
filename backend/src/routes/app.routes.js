const express = require("express");
const { getWeatherData } = require("../controllers/app.controllers");

const Router = express.Router();

Router.get("/:city", getWeatherData);

module.exports = Router;