const axios = require("axios");
const CONFIG = require("../config");
const { jsonToXml, getCoordinates } = require("../utils/utils");

exports.getWeatherData = async (req, res, next) => {
  try {
    // get coordinates from city name
    const { lat, lon } = await getCoordinates(req, res, next);

    // get weather data from openweather api
    const { data: weatherData } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${CONFIG.API_KEY}`
    );

    // convert weatherData to xml format
    const xmlResponse = `<?xml version="1.0" encoding="UTF-8"?><root>${jsonToXml(
      weatherData
    )}</root>`;

    return res
      .status(200)
      .set("Content-Type", "application/xml")
      .send(xmlResponse);
  } catch (error) {
    return next(error);
  }
};
