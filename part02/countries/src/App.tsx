import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "./components/List";

function App() {
  const [countries, setCountries] = useState<Array<Record<any, any>>>();
  const fetchAll = () => axios.get("https://restcountries.com/v3.1/all");

  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchAll().then((res) => setCountries(res.data));
  }, []);

  const filterCountries = countries?.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  console.log({ countries, query });
  return (
    <div>
      <div>
        find countries:{" "}
        <input type="text" onChange={(e) => setQuery(e.target.value)} />
      </div>
      {query ? <List filterCountries={filterCountries} /> : null}
    </div>
  );
}

export default App;
