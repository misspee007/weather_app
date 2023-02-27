import { useState } from "react";
import axios from "axios";
import CONFIG from "./config";
import { xmlToJson } from "./utils/utils";

const baseUrl = CONFIG.API_URL;

const Page = () => {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setInput("");
    setError(null);
    getData();
  }

  function getData() {
    axios
      .get(`${baseUrl}/city/${input}`, {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((res) => {
        // convert res.data from xml to object
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(res.data, "text/xml");

        const json = xmlToJson(xmlDoc);

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
              value: `${json.root.main.temp_max} °C/${json.root.main.temp_min} °C`,
            },
            {
              name: "Pressure",
              value: `${json.root.main.pressure} hPa`,
            },
            {
              name: "Humidity",
              value: `${json.root.main.humidity} %`,
            },
            {
              name: "Sea Level",
              value: `${json.root.main.sea_level} hPa`,
            },
            {
              name: "Ground Level",
              value: `${json.root.main.grnd_level} hPa`,
            },
          ],
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        setError(err.message);
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name of City:
          <input
            type="text"
            name="city"
            value={input}
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
        </label>

        <button type="submit" id="submit">
          Find
        </button>
      </form>
      {weather.id && (
        <section className="weather-desc">
          <div className="card-top">
            <h2>
              {weather.city}, {weather.country}
            </h2>

            <div>
              <div>
                <p>{weather.temp} °C</p>
                <p>{weather.description}</p>
              </div>
              <img
                src={`http://openweathermap.org/img/w/${weather.icon}.png`}
              />
            </div>
          </div>

          <div>
            <div className="card-top">
              <h2>
                Weather Today in {weather.city}, {weather.country}
              </h2>

              <div>
                <div>
                  <p>{weather.feels_like} °C</p>
                  <p>Feels Like</p>
                </div>
                <img
                  src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                />
              </div>
            </div>

            <ul>
              {weather.details &&
                weather.details.map((detail, index) => {
                  return (
                    <li key={index}>
                      <span>{detail.name}</span>
                      <span>{detail.value}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </section>
      )}
      {error && (
        <section className="error">
          <p>An error occured: {error}. Try again.</p>
        </section>
      )}
    </>
  );
};

export default Page;
