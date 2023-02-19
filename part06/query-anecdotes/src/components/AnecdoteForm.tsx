
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import anecdotesService, { Anecdote } from '../services/anecdotes'
import { useNotificationDispatch } from '../contexts/NotificationContext'

const AnecdoteForm = () => {

  const [content, setContent] = React.useState('')

  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const newMutation = useMutation(anecdotesService.createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData<Anecdote[]>('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes?.concat(newAnecdote))
      dispatch({ type: 'SET_NOTIFICATION', payload: 'New anecdote created!' })
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload:'' })
      }, 5000)
    },
    onError: (error) => {
      console.log({ error })
      dispatch({ type: 'SET_NOTIFICATION', payload: (error as any)?.response.data.error })
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload:'' })
      }, 5000)
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
