import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote, setNotification } from '../reducers/anecdoteReducer'

const AnecdoteForm =  () => {
  const dispatch = useDispatch()
  const [content, setContent] = React.useState('')

  const createNewAnecdote = async(e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()


    dispatch<any>(createAnecdote(content))
    dispatch<any>(setNotification('new anecdote added', 5))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div><input type='text' onChange={({ target }) => setContent(target.value)} /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm