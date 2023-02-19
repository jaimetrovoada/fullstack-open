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

export default { getAll }