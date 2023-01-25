import React from "react";

const Content = ({
  parts,
}: {
  parts: Array<{ part: string; exercises: number }>;
}) => {
  return (
    <div>
      {parts.map((part, index) => {
        return (
          <p key={index}>
            {part.part} - {part.exercises}
          </p>
        );
      })}
    </div>
  );
};

export default Content;
