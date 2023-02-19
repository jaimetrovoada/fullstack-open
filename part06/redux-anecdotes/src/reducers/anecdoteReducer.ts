import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote: string) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export interface Anecdote {
  content: string,
  id: string,
  votes: number
}
export interface RootState {

    anecdotes: Anecdote[]
    filter: string
}

const initialState: Anecdote[] = anecdotesAtStart.map(asObject)
console.log({ initialState })

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload.id
      return state.map(anecdote =>
        anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
      )
    },
    newAnecdote(state, action) {
      return [...state, asObject(action.payload.content)]
    }
  }
})

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'all',
  reducers: {
    setFilter(state, action) {
      return action.payload.param
    }
  }
})

const reducer = {
  anecdotes: anecdoteSlice.reducer,
  filter: filterSlice.reducer,
}

export default reducer