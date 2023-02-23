const axios = require("axios");
const xml2js = require("xml2js");
const CONFIG = require("../config");

exports.getWeatherData = async (req, res, next) => {
  try {
    const { city } = req.params;

    // get coordinates from city name
    const { data: cityInfo } = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${CONFIG.API_KEY}`
    );

    const lat = cityInfo[0].lat;
    const lon = cityInfo[0].lon;

    // get weather data from openweather api
    const { data: weatherData } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${CONFIG.API_KEY}`);

    // convert weatherData to xml format
    const builder = new xml2js.Builder();
    const xmlResponse = builder.buildObject(weatherData);

    return res.status(200).type("application/xml").send(xmlResponse);
  } catch (error) {
    next(error);
  }
};
