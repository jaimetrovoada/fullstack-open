import express from "express";
import phonebookModel from "../../model/phonebook";
import { nextTick } from "process";

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

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  phonebookModel
    .getById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  phonebookModel
    .removePerson(id)
    .then((result) => {
      console.log({ result });
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/", (req, res, next) => {
  const name = req.body.name;
  const number = req.body.number;
  console.log({ name, number });

  if (!name) {
    return res.status(400).json({ error: "name required" });
  }
  if (!number) {
    return res.status(400).json({ error: "number required" });
  }

  phonebookModel
    .addPerson(name, number)
    .then((result) => {
      console.log({ result });
      res.json(result);
    })
    .catch((error) => {
      next(error);
    });
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const number = req.body.number;
  const name = req.body.name;

  phonebookModel
    .updateInfo(id, { name: name, number: number })
    .then((result) => {
      console.log({ result });
      res.json(result);
    })
    .catch((error) => {
      next(error);
    });
});

export default router;
