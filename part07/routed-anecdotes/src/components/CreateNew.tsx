import React from 'react'
import { Anecdote } from './List'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

interface Props {
  addNew: (anecdote: Anecdote) => void
}

const CreateNew: React.FC<Props> = ({ addNew }) => {

  const { reset: resetContent, ...contentField } = useField('text')
  const { reset: resetAuthor, ...authorField } = useField('text')
  const { reset: resetInfo, ...infoField } = useField('text')

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

  const handleReset = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
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
        <div>
          <button type='submit'>create</button>
          <button type='reset' >reset</button>
        </div>
      </form>
    </div>
  )

}

export default CreateNew