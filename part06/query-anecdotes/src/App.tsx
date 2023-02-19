import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdotesService, { Anecdote } from './services/anecdotes'
import { NotificationProvider, useNotificationDispatch } from './contexts/NotificationContext'

const App = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const voteMutation = useMutation(anecdotesService.vote, {
    onSuccess: (updated) => {
      console.log(updated)

      const anecdotes = queryClient.getQueryData<Anecdote[]>('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes?.map(anecdote => anecdote.id !== updated.id ? anecdote : updated))


      dispatch({ type: 'SET_NOTIFICATION', payload: `you voted '${updated.content}'` })
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload:'' })
      }, 5000)

    }
  })
  const handleVote = (anecdote: Anecdote) => {
    console.log('vote')
    const update = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    voteMutation.mutate(update)

  }

  const { data, isError, isLoading } = useQuery<Anecdote[]>('anecdotes', anecdotesService.getAll, { retry: 1 })
  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>anecdote service not available due to problems in the server</div>

  console.log({ data })

  return (

    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {data?.map((anecdote: Anecdote) =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
