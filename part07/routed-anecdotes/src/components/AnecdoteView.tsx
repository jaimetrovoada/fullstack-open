import React from 'react'
import { Anecdote } from './List'
import { Link } from 'react-router-dom'

interface Props {
    anecdote: Anecdote
}
const AnecdoteView: React.FC<Props> = ({ anecdote }) => {
  return (
    <div>
      <p style={{
        fontSize: '2rem',
        fontWeight: 'bold'
      }}>{anecdote.content} by {anecdote.author}</p>
      <p>has {anecdote.votes} votes</p>
      <p>for more information see <Link to={anecdote.info} target='_blank'>
        {anecdote.info}
      </Link>
      </p>
    </div>
  )
}

export default AnecdoteView