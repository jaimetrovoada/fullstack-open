import React from "react";
import StatisticsLine from "./StatisticsLine";

const Statistics = ({
  good,
  bad,
  neutral,
  total,
  avg,
  positive,
}: {
  good: number;
  bad: number;
  neutral: number;
  total: number;
  avg: number;
  positive: number;
}) => {
  const noFeedback = total === 0;
  if (noFeedback) {
    return (
      <>
        <h2>statistics</h2>
        <div>
          <p>No feedback given.</p>
        </div>
      </>
    );
  }
  return (
    <>
      <h2>statistics</h2>
      <div>
        <StatisticsLine text={"good"} value={good.toString()} />
        <StatisticsLine text={"neutral"} value={neutral.toString()} />
        <StatisticsLine text={"bad"} value={bad.toString()} />
        <StatisticsLine text={"total"} value={total.toString()} />
        <StatisticsLine text={"average"} value={avg.toString()} />
        <StatisticsLine text={"positive"} value={`${positive}%`} />
      </div>
    </>
  );
};

export default Statistics;
