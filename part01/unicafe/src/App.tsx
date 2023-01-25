import React, { useState } from "react";
import Button from "./components/Button";
import Statistics from "./components/Statistics";


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
        <Button text={"good"} setFunc={setGood} />
        <Button text={"neutral"} setFunc={setNeutral} />
        <Button text={"bad"} setFunc={setBad} />
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        avg={avg}
        positive={positive}
      />
    </div>
  );
};

export default App;
