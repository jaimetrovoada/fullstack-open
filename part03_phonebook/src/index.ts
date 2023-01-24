import express from "express";
import personsRouter from "./routes/api/persons";

const app = express();

app.use("/api/persons", personsRouter);

app.listen(process.env.PORT || 3001, () =>
  console.log(`server started on http://localhost:${process.env.PORT || 3001}`)
);
