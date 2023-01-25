import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newPerson: { name: string; number: string }) => {
  return axios.post(baseUrl, newPerson);
};

const remove = (id: number) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id: number, newPerson: { name: string; number: string }) => {
  return axios.put(`${baseUrl}/${id}`, newPerson);
};

export default {
  getAll: getAll,
  create: create,
  remove: remove,
  update: update,
} as const;
