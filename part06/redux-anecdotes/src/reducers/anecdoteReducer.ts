import { Action } from 'redux'

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

export interface RootState {

    content: string
    id: string
    votes: number
}
const initialState: RootState[] = anecdotesAtStart.map(asObject)

enum ActionType {
  VOTE = 'VOTE',
  NEW_ANECDOTE = 'NEW_ANECDOTE',
}

interface NewAnecdoteAction extends Action<ActionType.NEW_ANECDOTE> {
  payload: {
    content: string;
  };
}
interface Vote extends Action<ActionType.VOTE> {
  payload: {
    id: string;
  };
}

const reducer = (state = initialState, action: NewAnecdoteAction | Vote) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case ActionType.VOTE:
    return state = state.map(anecdote =>
      anecdote.id === action.payload.id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
    )
  case ActionType.NEW_ANECDOTE:
    return [...state, asObject(action.payload.content)]
  default:
    return state
  }

}

export const voteReducer = (id: string) => {

  return { type: 'VOTE', payload: { id } }
}

export const newAnecdoteReducer = (content: string) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content
    }
  }
}

export default reducer