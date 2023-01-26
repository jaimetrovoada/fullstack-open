import React from "react";

const PersonsForm = ({
  handleSubmit,
  handleName,
  handleNumber,
}: {
  handleSubmit: (e: React.FormEvent) => void;
  handleName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input type="text" onChange={handleName} />
      </div>
      <div>
        number: <input type="number" onChange={handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonsForm;
