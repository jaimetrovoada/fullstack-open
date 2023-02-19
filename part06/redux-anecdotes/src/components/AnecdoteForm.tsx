import React from 'react'
import {  useDispatch } from 'react-redux'
import { newAnecdoteReducer } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const [content, setContent] = React.useState('')
  const newAnecdote = (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()

    dispatch(newAnecdoteReducer(content))
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input type='text' onChange={({ target }) => setContent(target.value)} /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm