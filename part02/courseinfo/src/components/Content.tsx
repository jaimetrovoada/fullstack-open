import React from "react";
import Part from "./Part";

const Content = ({
  parts,
}: {
  parts: Array<{ id: number; name: string; exercises: number }>;
}) => {
  return (
    <div>
      {parts.map((part) => {
        return (
          <Part key={part.id} exercises={part.exercises} name={part.name} />
        );
      })}
    </div>
  );
};

export default Content;
