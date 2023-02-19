import React from 'react'
import AnecdotesService from '../services/anecdotes'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm =  () => {
  const dispatch = useDispatch()
  const [content, setContent] = React.useState('')

  const createAnecdote = async(e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()


    const _newAnecdote = await AnecdotesService.createAnecdote(content)
    dispatch(newAnecdote(_newAnecdote))
    dispatch({ type: 'notification/setNotification', payload: { msg: 'new anecdote added' } })

    setTimeout(() => {
      dispatch({ type: 'notification/setNotification', payload: { msg: null } })
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input type='text' onChange={({ target }) => setContent(target.value)} /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm