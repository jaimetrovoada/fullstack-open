import { createSlice } from '@reduxjs/toolkit'

export interface Anecdote {
  content: string,
  id: string,
  votes: number
}
export interface RootState {

    anecdotes: Anecdote[]
    filter: string
    notification: string
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [] as Anecdote[],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    voteAnecdote(state, action) {
      const id = action.payload.id
      return state.map(anecdote =>
        anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
      )
    },
    newAnecdote(state, action) {
      state.push(action.payload)
    },
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

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload.msg
    }
  }
})

const reducer = {
  anecdotes: anecdoteSlice.reducer,
  filter: filterSlice.reducer,
  notification: notificationSlice.reducer
}

export default reducer
export const { setAnecdotes, voteAnecdote, newAnecdote } = anecdoteSlice.actions