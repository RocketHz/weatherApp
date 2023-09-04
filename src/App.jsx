import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [coords, setCoords] = useState();

  const [weather, setWeather] = useState();

  const [image, setImage] = useState('')

  const [temp, setTemp] = useState()

  useEffect(() => {
    const success = (pos) => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(obj);

    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const ApiKey = 'f80d523e15dad823b40b94adea6f22b1'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${ApiKey}`;
  
      axios.get(url)
        .then((res) => {
          setWeather(res.data)
          const obj = {
            celcius: (res.data.main.temp - 273.15).toFixed(1),
            farenheit: ((res.data.main.temp - 273.15) * 9/5 + 32).toFixed(1)
          }

          setTemp(obj)
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  useEffect(() => {
    if (weather) {
      const weatherName = weather?.weather[0].description
      const ApiKey = '39213290-5a92e53c8a7541ded26175db9'
      const url = `https://pixabay.com/api/?key=${ApiKey}&q=${weatherName}&image_type=photo`;
      
      axios.get(url)
        .then(res => {
          const randomIndex = Math.floor(Math.random() * res.data.hits.length);
          setImage(res.data.hits[randomIndex].largeImageURL);
        }
        )
        .catch((err) => console.log(err));
      }
  }, [weather]);

  useEffect(() => {
    if (image) {
      document.body.style.backgroundImage = `url(${image})`;
    }
  }, [image]);


  return (
    <>
      <div className="container container--flex">
        <WeatherCard weather={ weather } temp={temp}/>
      </div>
    </>
  );
}

export default App;
