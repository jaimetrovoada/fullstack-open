import React from "react";

const StatisticsLine = ({ text, value }: { text: string; value: string }) => {
  return (
    <p>
      {text}: {value}
    </p>
  );
};

export default StatisticsLine;
