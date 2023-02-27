const axios = require("axios");
const CONFIG = require("../config");

function jsonToXml(json) {
  let xml = '';

  for (const [key, value] of Object.entries(json)) {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        xml += `<${key}>${jsonToXml(item)}</${key}>`;
      });
    } else if (typeof value === "object") {
      xml += `<${key}>${jsonToXml(value)}</${key}>`;
    } else {
      xml += `<${key}>${value}</${key}>`;
    }
  }

  return xml;
}



async function getCoordinates(req, res, next) {
  const { city } = req.params;

  const { data: cityInfo } = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${CONFIG.API_KEY}`
  );

  // check if city exists
  if (cityInfo.length === 0) {
    return next({
      status: 404,
      message: `City ${city} not found`,
    });
  }

  return {
    lat: cityInfo[0].lat,
    lon: cityInfo[0].lon,
  };
}

module.exports = { jsonToXml, getCoordinates };
