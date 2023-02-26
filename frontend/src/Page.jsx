import { useState } from "react";
import axios from "axios";
import CONFIG from "./config";

const baseUrl = CONFIG.API_URL;

const Page = () => {
  const [city, setCity] = useState("");
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setInput("");
    setWeather(null);
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

        // get weather.description
        const weather = xmlDoc
          .getElementsByTagName("weather")[0]
          .getElementsByTagName("description")[0].childNodes[0].nodeValue;

        // get name
        const name = xmlDoc.getElementsByTagName("name")[0].innerHTML;

        setWeather(weather);
        setCity(name);
      })
      .catch((err) => {
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
      {weather && (
        <section className="weather-desc">
          <h2>Weather at {city} Today: </h2>
          <p>{weather}</p>
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
