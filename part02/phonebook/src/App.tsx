import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      persons.find((val) => val.name.toLowerCase() === newName.toLowerCase())
    ) {
      window.alert(`${newName} is already added to the phonebook`);
      return;
    }
    const newPersons = [...persons, { name: newName, number: newNumber }];
    setPersons(newPersons);
  };

  const [nameFilter, setNameFilter] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input onChange={(e) => setNameFilter(e.target.value)} />
      </div>
      <form onSubmit={handleSubmit}>
        <h2>add a new</h2>
        <div>
          name: <input onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(nameFilter.toLowerCase())
        )
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
    </div>
  );
};

export default App;
