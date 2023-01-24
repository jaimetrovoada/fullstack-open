import express from "express";
import personsRouter, { data } from "./routes/api/persons";
import morgan from "morgan";

const app = express();

app.use(express.json());

morgan.token("request-body", function (req, res) {
  if (req.method === "POST") {
    return JSON.stringify((req as any).body);
  }
});

app.use(
  morgan(
    function (tokens, req, res) {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
        tokens["request-body"](req, res),
      ].join(" ");
    }
    /* {
      skip: function (req, res) {
        return req.method !== "POST";
      },
    } */
  )
);

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
