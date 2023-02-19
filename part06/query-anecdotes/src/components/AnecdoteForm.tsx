
import React from 'react'

const AnecdoteForm = () => {

  const [content, setContent] = React.useState('')

  const onCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' onChange={({ target }) => setContent(target.value)} />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
