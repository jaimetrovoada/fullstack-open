import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newAnecdoteReducer, voteReducer } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector<{content:string, id:string, votes: number}[]>(state => state)
  const dispatch = useDispatch()

  const [content, setContent] = React.useState('')

  const vote = (id: string) => {
    console.log('vote', id)

    dispatch(voteReducer(id))
  }

  const newAnecdote = (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()

    dispatch(newAnecdoteReducer(content))
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
      <form onSubmit={newAnecdote}>
        <div><input type='text' onChange={({ target }) => setContent(target.value)} /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App