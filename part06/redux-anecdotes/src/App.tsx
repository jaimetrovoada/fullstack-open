import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteReducer } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector<{content:string, id:string, votes: number}[]>(state => state)
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
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App