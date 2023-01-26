import express from "express";
import phonebookModel from "../../model/phonebook";
import mongoose from "mongoose";

export let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const router = express.Router();

router.get("/", (req, res) => {
  phonebookModel.getAll().then((result) => {
    console.log({ result });
    res.json(result);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  phonebookModel.getById(id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  data = data.filter((val) => val.id !== Number(id));

  res.status(204).end();
});

router.post("/", (req, res) => {
  const genId = (): number => {
    let id: number = Math.random() * 1000;
    if (data.find((val) => val.id === id)) genId();
    return Number(id.toFixed(0));
  };

  const person = {
    id: genId(),
    name: req.body.name,
    number: req.body.number,
  };

  if (!person.name) {
    return res.status(400).json({ error: "name required" });
  } else if (!person.number) {
    return res.status(400).json({ error: "number required" });
  } else if (
    data.find((val) => val.name.toLowerCase() === person.name.toLowerCase())
  ) {
    return res
      .status(400)
      .json({ error: "name already in the phone book. name must be unique" });
  } else {
    data = data.concat(person);
    res.json(data);
  }
});

export default router;
