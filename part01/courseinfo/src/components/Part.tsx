import React from "react";

const Part = ({ part, exercises }: { part: string; exercises: number }) => {
  return (
    <p>
      {part} - {exercises}
    </p>
  );
};

export default Part;
