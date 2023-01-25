import React, { useEffect, useState } from "react";
import PersonsForm from "./components/PersonsForm";
import PersonsFilter from "./components/PersonsFilter";
import PersonsList from "./components/PersonsList";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState<
    Array<{ name: string; number: string; id: number }>
  >([]);

  useEffect(() => {
    personsService.getAll().then((res) => setPersons(res.data));
  }, []);
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
    const newPersons = { name: newName, number: newNumber };
    personsService
      .create(newPersons)
      .then((res) => setPersons((prev) => prev.concat(res.data)));
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewName(e.target.value);
  const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewNumber(e.target.value);

  const [nameFilter, setNameFilter] = useState("");

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNameFilter(e.target.value);

  const handleDelete = (id: number) => {
    window.alert(`Delete ${persons.find((person) => person.id === id)?.name}?`);
    personsService
      .remove(id)
      .then(() => setPersons((prev) => prev.filter((val) => val.id !== id)));
  };

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
      <PersonsList
        persons={persons}
        nameFilter={nameFilter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
