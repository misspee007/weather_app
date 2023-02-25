import { useState } from "react";
import axios from "axios";

const api =
  process.env.NODE_ENV === "production"
    ? "https://weather-app-2021.herokuapp.com"
    : "http://localhost:4050";

const Page = () => {
  const [city, setCity] = useState("");
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState(null);

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setInput("");
    getData();
  }

  function getData() {
    axios
      .get(`${api}/city/${input}`, {
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
        console.log(err);
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
    </>
  );
};

export default Page;
