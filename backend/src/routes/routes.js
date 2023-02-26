const express = require("express");
const { getWeatherData } = require("../controllers/app.controllers");

const Router = express.Router();

Router.get("/city/:city", getWeatherData);

module.exports = Router;