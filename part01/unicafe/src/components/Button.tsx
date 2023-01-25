import React from "react";

const Button = ({
  text,
  setFunc,
}: {
  text: string;
  setFunc: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return <button onClick={() => setFunc((prev) => prev + 1)}>{text}</button>;
};

export default Button;
