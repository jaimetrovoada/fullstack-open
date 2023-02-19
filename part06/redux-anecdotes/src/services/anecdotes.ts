import axios from 'axios'
import { Anecdote } from '../reducers/anecdoteReducer'

const baseUrl = '/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log({ response })
  return response.data as Anecdote[]
}

const createAnecdote = async (content: string) => {
  const res = await axios.post(baseUrl, { content, votes: 0 })
  return res.data as Anecdote
}

const vote = async (id: string, content: {content:string, votes:number}) => {
  const res = await axios.put(`${baseUrl}/${id}`, content)
  return res.data as Anecdote
}

export default { getAll, createAnecdote, vote }
