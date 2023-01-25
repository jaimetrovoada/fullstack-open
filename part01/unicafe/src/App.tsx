import React, { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const avg = good * 1 + neutral * 0 + bad * -1;
  const positive = (good / total) * 100 || 0;

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <button onClick={() => setGood((prev) => prev + 1)}>good</button>
        <button onClick={() => setNeutral((prev) => prev + 1)}>neutral</button>
        <button onClick={() => setBad((prev) => prev + 1)}>bad</button>
      </div>
      <h2>statistics</h2>
      <div>
        <p>good: {good}</p>
        <p>neutral:{neutral}</p>
        <p>bad: {bad}</p>
        <p>total: {total}</p>
        <p>average: {avg}</p>
        <p>positive: {positive}%</p>
      </div>
    </div>
  );
};

export default App;
