import { useState, useEffect } from "react";
import axios from "axios";
import CONFIG from "./config";
import { xmlToJson } from "./utils/utils";

const baseUrl = CONFIG.API_URL;

const Page = () => {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});
  const [weatherDetails, setWeatherDetails] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // get name of location
    onFirstLoad();
  }, []);

  async function onFirstLoad() {
    // get name of location
    const res = await axios.get("https://ipapi.co/json/");
    getData(res.data.country_capital);
  }

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    setIsLoading(true);
    getData(input);
  }

  function getData(city) {
    axios
      .get(`${baseUrl}/city/${city}`, {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((res) => {
        // convert res.data from xml to object
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(res.data, "text/xml");

        const json = xmlToJson(xmlDoc);
        const details = {
          "High/Low": [json.root.main.temp_max, json.root.main.temp_min],
          Pressure: json.root.main.pressure,
          Humidity: json.root.main.humidity,
          "Sea Level": json.root.main.sea_level,
          "Ground Level": json.root.main.grnd_level,
        };
        setWeatherDetails(details);

        setWeather({
          id: json.root.id,
          city: json.root.name,
          country: json.root.sys.country,
          description: json.root.weather.description,
          temp: json.root.main.temp,
          icon: json.root.weather.icon,
          feels_like: json.root.main.feels_like,
          details: [
            {
              name: "High/Low",
              value: `${details["High/Low"][0]} °C/${details["High/Low"][1]} °C`,
            },
            {
              name: "Pressure",
              value: `${details["Pressure"]} hPa`,
            },
            {
              name: "Humidity",
              value: `${details["Humidity"]} %`,
            },
            {
              name: "Sea Level",
              value: `${details["Sea Level"]} hPa`,
            },
            {
              name: "Ground Level",
              value: `${details["Ground Level"]} hPa`,
            },
          ],
        });

        setInput("");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err: ", err);
        setError(true);
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">Name of City</label>
        <input
          id="city"
          type="text"
          name="city"
          placeholder="City"
          value={input}
          onChange={handleInputChange}
          autoComplete="off"
          required
        />

        <button type="submit" id="submit">
          Find
        </button>
      </form>
      {error && (
        <section className="error">
          <p>An error occured. Please refresh the page and try again.</p>
        </section>
      )}
      {isLoading && !error ? (
        <div className="loading-pane">
          <h2 className="loader">🌀</h2>
        </div>
      ) : (
        weather.id && (
          <section className="weather-desc">
            <div className="card card-top">
              <h2 className="h-top">
                {weather.city}, {weather.country}
              </h2>

              <div className="btm-wrap">
                <div>
                  <p className="temp">{weather.temp} °C</p>
                  <img
                    alt="weather icon"
                    src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                  />
                </div>
                <p>{weather.description}</p>
              </div>
            </div>

            <div className="card">
              <div className="card-btm">
                <h2>
                  Weather Today in {weather.city}, {weather.country}
                </h2>

                <div className="btm-wrap">
                  <div className="">
                    <p className="temp">{weather.feels_like} °C</p>
                    <img
                      alt="weather icon"
                      src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                    />
                  </div>
                  <p>Feels Like</p>
                </div>
              </div>

              <ul>
                {weather.details &&
                  weather.details.map((detail, index) => {
                    // check if weatherDetails has value
                    if (
                      typeof weatherDetails[detail.name] === "undefined" ||
                      (Array.isArray(weatherDetails[detail.name]) &&
                        (typeof weatherDetails[detail.name][0] ===
                          "undefined" ||
                          typeof weatherDetails[detail.name][1] ===
                            "undefined"))
                    ) {
                      // check if value is an array
                      console.log(
                        "weatherDetails[detail.name]: ",
                        weatherDetails[detail.name]
                      );
                      return;
                    }
                    return (
                      <li key={index}>
                        <p className="title">{detail.name}</p>
                        <p>{detail.value}</p>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </section>
        )
      )}
    </>
  );
};

export default Page;
