import React, { useState } from 'react'
import { Anecdote } from './List'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

interface Props {
  addNew: (anecdote: Anecdote) => void
}

const CreateNew: React.FC<Props> = ({ addNew }) => {

  const contentField = useField('text')
  const authorField = useField('text')
  const infoField = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addNew({
      content: contentField.value,
      author: authorField.value,
      info: infoField.value,
      votes: 0,
      id: 0
    })

    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...contentField} />
        </div>
        <div>
          author
          <input name='author' {...authorField} />
        </div>
        <div>
          url for more info
          <input name='info' {...infoField} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

export default CreateNew