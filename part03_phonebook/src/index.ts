import express from "express";
import personsRouter, { data } from "./routes/api/persons";
import morgan from "morgan"

const app = express();

app.use(express.json());
app.use(morgan('tiny'))

app.use("/api/persons", personsRouter);

app.get("/info", (req, res) => {
  const numOfEntries = data.length;
  const date = new Date().toString();
  res.send(
    `<p>Phonebook has info for ${numOfEntries} people.</p><p>${date}</p>`
  );
});

app.listen(process.env.PORT || 3001, () =>
  console.log(`server started on http://localhost:${process.env.PORT || 3001}`)
);
