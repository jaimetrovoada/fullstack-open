import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

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
    setMessage(state, action) {
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
const { setAnecdotes, voteAnecdote, newAnecdote } = anecdoteSlice.actions
const { setMessage } = notificationSlice.actions

export const initAnecdotes = () => {
  return async (dispatch: (arg0: { payload: Anecdote[]; type: 'anecdotes/setAnecdotes' }) => void) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content: string) => {
  return async (dispatch: (arg0: { payload: Anecdote; type: 'anecdotes/newAnecdote' }) => void) => {
    const res = await anecdotesService.createAnecdote(content)
    dispatch(newAnecdote(res))
  }
}

export const vote = (id: string, content:{content:string, votes:number}) => {
  return async (dispatch: (arg0: { payload: Anecdote; type: 'anecdotes/voteAnecdote' }) => void) => {
    const res = await anecdotesService.vote(id, content)
    dispatch(voteAnecdote(res))
  }
}

export const setNotification = (msg: string, timeout: number) => {
  return (dispatch: (arg0: { payload: string; type: 'notification/setMessage' }) => void) => {
    dispatch(setMessage({ msg }))
    setTimeout(() => {
      dispatch(setMessage({ msg: null }))
    }, timeout * 1000)
  }
}