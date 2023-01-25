import React from "react";

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
    </>
  );
};

export default CountryInfo;
