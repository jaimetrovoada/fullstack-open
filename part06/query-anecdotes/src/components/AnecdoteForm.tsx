
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import anecdotesService, { Anecdote } from '../services/anecdotes'

const AnecdoteForm = () => {

  const [content, setContent] = React.useState('')

  const queryClient = useQueryClient()

  const newMutation = useMutation(anecdotesService.createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData<Anecdote[]>('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes?.concat(newAnecdote))
    }
  })

  const onCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('new anecdote')


    newMutation.mutate(content)
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
