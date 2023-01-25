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
  const [tableView, setTableView] = React.useState(true);
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

  if (tableView) {
    return (
      <>
        <h2>statistics</h2>
        <button onClick={() => setTableView(false)}>change to list view</button>
        <table>
          <tbody>
            <tr>
              <td>good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>bad</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>total</td>
              <td>{total}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{avg}</td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{positive}%</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }

  return (
    <>
      <h2>statistics</h2>
      <button onClick={() => setTableView(true)}>change to table view</button>
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
