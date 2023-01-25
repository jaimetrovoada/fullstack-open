import React from "react";

const List = ({
  filterCountries,
}: {
  filterCountries: Array<Record<any, any>> | undefined;
}) => {
  if (filterCountries?.length === 1) {
    return (
      <>
        <h2>{filterCountries[0].name.common}</h2>
        <p>capital:{filterCountries[0].capital[0]} </p>
        <p>area: {filterCountries[0].area}</p>
        <h3>languages: </h3>
        <ul>
          {Object.keys(filterCountries[0].languages).map((key) => (
            <li key={key}>{filterCountries[0].languages[key]}</li>
          ))}
        </ul>
        <img src={filterCountries[0].flags.png} alt="" />
      </>
    );
  }
  return (
    <>
      <div>
        {(filterCountries?.length as number) <= 10 ? (
          filterCountries?.map((country) => {
            return <p key={country.name.common}>{country.name.common}</p>;
          })
        ) : (
          <p>Too many matches, specify another filter</p>
        )}
      </div>
    </>
  );
};

export default List;
