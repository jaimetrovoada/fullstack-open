import React from "react";

const PersonsList = ({
  persons,
  nameFilter,
}: {
  persons: { name: string; number: string; id: number }[];
  nameFilter: string;
}) => {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(nameFilter.toLowerCase())
        )
        .map((person) => (
          <div key={person.id}>
            {person.name} {person.number}
          </div>
        ))}
    </>
  );
};

export default PersonsList;
