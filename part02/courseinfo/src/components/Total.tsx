import React from "react";

const Total = ({ total }: { total: number }) => {
  return (
    <div>
      <strong>total of {total} exercises</strong>
    </div>
  );
};

export default Total;
