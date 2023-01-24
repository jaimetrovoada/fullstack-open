import express from "express";

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

router.use(express.json());

router.get("/", (req, res) => {
  res.json(data);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const person = data.find((val) => val.id === Number(id));

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

export default router;