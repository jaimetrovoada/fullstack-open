import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Anecdote, RootState, setNotification, vote as voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const filter = useSelector<RootState, string>(state => state.filter)
  console.log({ filter })
  const anecdotes = useSelector<RootState, Anecdote[]>(state => state.anecdotes.filter(state => {
    if (filter === 'all') {
      return state
    }
    return state.content.includes(filter)
  }).sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()


  const vote = (id: string) => {
    console.log('vote', id)
    const voted = anecdotes.find(anecdote => anecdote.id === id) as Anecdote
    const update = {
      content: voted.content,
      votes: voted.votes + 1
    }

    dispatch<any>(voteAnecdote(id, update))

    dispatch<any>(setNotification(`you voted '${voted.content}'`, 5))
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