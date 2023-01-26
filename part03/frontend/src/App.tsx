import React, { useEffect, useState } from "react";
import PersonsForm from "./components/PersonsForm";
import PersonsFilter from "./components/PersonsFilter";
import PersonsList from "./components/PersonsList";
import personsService from "./services/persons";
import "./index.css";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState<
    Array<{ name: string; number: string; id: number }>
  >([]);

  useEffect(() => {
    personsService.getAll().then((res) => setPersons(res.data));
  }, []);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [message, setMessage] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sameName = persons.find(
      (val) => val.name.toLowerCase() === newName.toLowerCase()
    );

    if (sameName && sameName.number !== newNumber) {
      window.alert(
        `${newName} is already added to the phonebook, replace old number with a new one?`
      );
      personsService
        .update(sameName.id, {
          name: sameName.name,
          number: newNumber,
        })
        .then((res) => {
          setPersons((prev) =>
            prev.map((person) =>
              person.id !== sameName.id ? person : res.data
            )
          );

          setMessage({
            type: "success",
            msg: `Changed ${sameName.name} number`,
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) =>
          setMessage({
            type: "error",
            msg: `Information of ${sameName.name} has already been removed from the server`,
          })
        );
      return;
    }

    const newPersons = { name: newName, number: newNumber };
    personsService.create(newPersons).then((res) => {
      setPersons(res.data);
      setMessage({ type: "success", msg: `Added ${newPersons.name}` });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewName(e.target.value);
  const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewNumber(e.target.value);

  const [nameFilter, setNameFilter] = useState("");

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNameFilter(e.target.value);

  const handleDelete = (id: number) => {
    const delPerson = persons.find((person) => person.id === id)?.name;
    personsService
      .remove(id)
      .then(() => setPersons((prev) => prev.filter((val) => val.id !== id)))
      .catch((error) =>
        setMessage({
          type: "error",
          msg: `Information of ${delPerson} has already been removed from the server`,
        })
      );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
