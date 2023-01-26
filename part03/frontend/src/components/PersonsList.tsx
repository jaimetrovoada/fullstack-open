import React from "react";

const PersonsList = ({
  persons,
  nameFilter,
  handleDelete,
}: {
  persons: { name: string; number: string; id: number }[];
  nameFilter: string;
  handleDelete: (id: number) => void;
}) => {
  console.log({ persons });
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(nameFilter.toLowerCase())
        )
        .map((person) => (
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </div>
        ))}
    </>
  );
};

export default PersonsList;
