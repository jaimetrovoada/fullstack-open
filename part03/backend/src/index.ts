import express from "express";
import personsRouter from "./routes/api/persons";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import phonebookModel from "./model/phonebook";
import mongoose from "mongoose";

const app = express();

dotenv.config();
app.use(express.static("frontend_build"));

app.use(cors());

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
  phonebookModel.getAll().then((result) => {
    console.log({ result });
    const numOfEntries = result.length;
    const date = new Date().toString();
    res.send(
      `<p>Phonebook has info for ${numOfEntries} people.</p><p>${date}</p>`
    );
  });
});

app.listen(process.env.PORT, () =>
  console.log(`server started on http://localhost:${process.env.PORT}`)
);
