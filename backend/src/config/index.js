const path = require("path");
require("dotenv").config({ path: path.join(path.resolve("../"), ".env") });

const CONFIG = {
  PORT: process.env.PORT || 3000,
  API_KEY: process.env.OPEN_WEATHER_API_KEY,
};

module.exports = CONFIG;
