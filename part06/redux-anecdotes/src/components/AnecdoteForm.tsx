import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm =  () => {
  const dispatch = useDispatch()
  const [content, setContent] = React.useState('')

  const createNewAnecdote = async(e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()


    dispatch<any>(createAnecdote(content))
    dispatch({ type: 'notification/setNotification', payload: { msg: 'new anecdote added' } })

    setTimeout(() => {
      dispatch({ type: 'notification/setNotification', payload: { msg: null } })
    }, 5000)
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