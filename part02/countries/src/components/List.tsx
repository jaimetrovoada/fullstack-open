import React, { useState } from "react";
import CountryInfo from "./CountryInfo";

const List = ({
  filterCountries,
}: {
  filterCountries: Array<Record<any, any>> | undefined;
}) => {
  const [showCountry, setShowCountry] = useState<Record<any, any>>();

  if (filterCountries?.length === 1) {
    const languages = Object.keys(filterCountries[0].languages).map(
      (key) => filterCountries[0].languages[key]
    );
    return (
      <CountryInfo
        name={filterCountries[0].name.common}
        capital={filterCountries[0].capital[0]}
        area={filterCountries[0].area}
        languages={languages}
        flag={filterCountries[0].flags.png}
      />
    );
  }
  return (
    <>
      {" "}
      {showCountry ? (
        <div>
          <CountryInfo
            name={showCountry.name.common}
            capital={showCountry.capital[0]}
            area={showCountry.area}
            languages={Object.keys(showCountry.languages).map(
              (key) => showCountry.languages[key]
            )}
            flag={showCountry.flags.png}
          />
        </div>
      ) : null}
      <div>
        {(filterCountries?.length as number) <= 10 ? (
          filterCountries?.map((country) => {
            return (
              <div key={country.name.common}>
                <div style={{ display: "flex" }}>
                  <p>{country.name.common}</p>
                  <button onClick={() => setShowCountry(country)}>show</button>
                </div>
              </div>
            );
          })
        ) : (
          <p>Too many matches, specify another filter</p>
        )}
      </div>
    </>
  );
};

export default List;
