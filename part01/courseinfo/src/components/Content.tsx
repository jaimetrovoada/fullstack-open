import React from "react";
import Part from "./Part";

const Content = ({
  parts,
}: {
  parts: Array<{ part: string; exercises: number }>;
}) => {
  return (
    <div>
      {parts.map((part, index) => {
        return <Part key={index} exercises={part.exercises} part={part.part} />;
      })}
    </div>
  );
};

export default Content;
