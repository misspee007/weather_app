require("dotenv").config();

const CONFIG = {
  PORT: process.env.PORT || 3000,
  API_KEY: process.env.OPEN_WEATHER_API_KEY,
}

module.exports = CONFIG;