import axios from 'axios'

const baseUrl = '/anecdotes'

export interface Anecdote {
  content: string,
  id: string,
  votes: number
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content: string) => {
  const res = await axios.post(baseUrl, { content, votes: 0 })
  return res.data as Anecdote
}

export default { getAll, createAnecdote }