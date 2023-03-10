import React, { useState } from 'react'
import About from './components/About'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import AnecdoteList, { Anecdote } from './components/List'
import Menu from './components/Menu'
import { Route, Routes, useMatch } from 'react-router-dom'
import AnecdoteView from './components/AnecdoteView'
import Notification from './components/Notification'


const App = () => {
  const [anecdotes, setAnecdotes] = useState<Anecdote[]>([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const match = useMatch('/anecdotes/:id')

  const addNew = (anecdote: Anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const anecdoteById = (id: Anecdote['id']) =>
    anecdotes.find(a => a.id === id)

  const anecdote = anecdoteById(Number(match?.params.id))

  const vote = (id: Anecdote['id']) => {
    const anecdote = anecdoteById(id) as Anecdote

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification msg={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/anecdotes/:id" element={<AnecdoteView anecdote={anecdote as Anecdote} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
