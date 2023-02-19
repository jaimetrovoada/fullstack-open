import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteReducer } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector<{content:string, id:string, votes: number}[]>(state => state.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()


  const vote = (id: string) => {
    console.log('vote', id)

    dispatch(voteReducer(id))
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      {(anecdotes as {content:string, id:string, votes: number}[]).map((anecdote: {content:string, id:string, votes: number}) =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App