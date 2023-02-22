import React from 'react'

export interface Anecdote {
  content: string;
  author: string;
  info: string
  votes: number;
  id: number;
}

interface Props {
  anecdotes: Anecdote[]
}

const AnecdoteList: React.FC<Props> = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>)}
    </ul>
  </div>
)

export default AnecdoteList