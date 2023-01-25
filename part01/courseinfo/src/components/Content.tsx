import React from "react";
import Part from "./Part";

const Content = ({
  parts,
}: {
  parts: Array<{ name: string; exercises: number }>;
}) => {
  return (
    <div>
      {parts.map((part, index) => {
        return <Part key={index} exercises={part.exercises} name={part.name} />;
      })}
    </div>
  );
};

export default Content;
