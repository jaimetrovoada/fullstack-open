import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, voteReducer } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector<RootState[], {content:string, id:string, votes: number}[]>(state => state.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()


  const vote = (id: string) => {
    console.log('vote', id)

    dispatch(voteReducer(id))
  }

  return (
    <>
      {anecdotes.map((anecdote: {content:string, id:string, votes: number}) =>
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
    </>
  )
}

export default AnecdoteList