const express = require("express");
const { getWeatherData } = require("../controllers/controllers");

const Router = express.Router();

Router.get("/city/:city", getWeatherData);

module.exports = Router;