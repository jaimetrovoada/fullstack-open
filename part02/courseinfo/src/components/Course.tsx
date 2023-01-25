import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({
  course,
}: {
  course: {
    id: number;
    name: string;
    parts: { id: number; name: string; exercises: number }[];
  };
}) => {
  const total = course.parts.reduce((prev, curr) => prev + curr.exercises, 0);
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      {/*  <Total total={total} /> */}
    </div>
  );
};

export default Course;
