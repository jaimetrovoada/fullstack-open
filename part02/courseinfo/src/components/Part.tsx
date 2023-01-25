import React from "react";

const Part = ({ name, exercises }: { name: string; exercises: number }) => {
  return (
    <p>
      {name} - {exercises}
    </p>
  );
};

export default Part;
