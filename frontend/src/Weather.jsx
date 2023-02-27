const Weather = (weather) => {
  return (
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
                return (
                  <li key={index}>
                    <p className="titlestyle:">{detail.name}</p>
                    <p>{detail.value}</p>
                  </li>
                );
              })}
          </ul>
        </div>
      </section>
    )
  );
};

export default Weather;
