import axios from "axios";
import React, { useEffect, useState } from "react";

const CountryInfo = ({
  name,
  capital,
  area,
  languages,
  flag,
}: {
  name: string;
  capital: string;
  area: number;
  languages: string[];
  flag: string;
}) => {
  const [weather, setWeather] = useState<Record<any, any>>();
  const apiKey = process.env.REACT_APP_API_KEY;
  console.log({ apiKey });

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
      )
      .then((res) => setWeather(res.data));
  }, [apiKey, capital]);

  console.log({ weather, api: process.env.REACT_APP_API_KEY });
  return (
    <>
      <h2>{name}</h2>
      <p>capital: {capital} </p>
      <p>area: {area}</p>
      <h3>languages: </h3>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flag} alt="" />

      <h3>Weather in {capital}</h3>
      <div>
        <p>temperature {weather?.main.temp} Celcius</p>
        <img
          src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
          alt=""
        />
        <p>wind {weather?.wind.speed} m/s</p>
      </div>
    </>
  );
};

export default CountryInfo;
