import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Anecdote, RootState } from '../reducers/anecdoteReducer'

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

    dispatch({ type: 'anecdotes/voteAnecdote', payload: { id } } )

    dispatch({ type: 'notification/setNotification', payload: { msg: `you voted '${voted.content}'` } })
    setTimeout(() => {
      dispatch({ type: 'notification/setNotification', payload: { msg: null } })
    }, 5000)
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