import React, { useState } from "react";
import PersonsForm from "./components/PersonsForm";
import PersonsFilter from "./components/PersonsFilter";
import PersonsList from "./components/PersonsList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
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
    const newPersons = [
      ...persons,
      { name: newName, number: newNumber, id: persons[-1].id + 1 },
    ];
    setPersons(newPersons);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewName(e.target.value);
  const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewNumber(e.target.value);

  const [nameFilter, setNameFilter] = useState("");

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNameFilter(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonsFilter handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonsForm
        handleSubmit={handleSubmit}
        handleName={handleName}
        handleNumber={handleNumber}
      />
      <h3>Numbers</h3>
      <PersonsList persons={persons} nameFilter={nameFilter} />
    </div>
  );
};

export default App;
