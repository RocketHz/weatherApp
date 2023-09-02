import React, { useState } from "react";

const WeatherCard = ({ weather, temp }) => {
  const [isCelcius, setIsCelcius] = useState(true);

  const handleChangeTemp = () => {
    setIsCelcius(!isCelcius);
  };

  return (
    <article className="card">
      <h1 className="">Weather App</h1>
      <h3 className="">
        {weather?.name}, {weather?.sys.country}
      </h3>
      <div className="cloud">
        <img
          className="iconify iconify--emojione"
          src={
            weather &&
            `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
          }
          alt=""
          />
          <h4>{weather?.weather[0].description}</h4>
      </div>
      <h2 className="main-text">
        {isCelcius ? `${temp?.celcius} C°` : `${temp?.farenheit} F°`}
      </h2>
      <section className="info">
        <ul className="info-left">
          <li className="text-gray">
            <span>Wind Speed</span> <span>{weather?.wind.speed}</span>
          </li>
          <li className="text-gray">
            <span>Clouds</span> <span>{weather?.clouds.all}</span>
          </li>
          <li className="text-gray">
            <span>Pressure</span> <span>{weather?.main.pressure}</span>
          </li>
        </ul>
        <button className="info-right" onClick={handleChangeTemp}>
          {isCelcius ? "Change to F°" : "Change to C°"}
        </button>
      </section>
    </article>
  );
};

export default WeatherCard;
