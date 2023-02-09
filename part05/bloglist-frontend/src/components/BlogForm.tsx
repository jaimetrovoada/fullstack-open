/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setBlogs, setMessage }: {setBlogs: React.Dispatch<any>, setMessage: React.Dispatch<React.SetStateAction<{
    msg: string;
    type: 'success' | 'error';
} | null>>}) => {
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [url, setUrl] = useState<string>('')

  const [isVisible, setIsVisible] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const newBlog = await blogService.addNewBlog({ title, author, url })
      setBlogs((prev: any[]) => prev.concat(newBlog))
      setMessage({ type:'success', msg:`a new blog: ${newBlog.title} by ${newBlog.author} added` })
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (err) {
      console.log({ err })
      setMessage({ type:'error', msg:'adding new blog failed' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  if (!isVisible) {
    return <>
      <button onClick={() => setIsVisible(true)}>create new blog</button></>
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>title:<input type="text" name="title" id="title" onChange={({ target }) => setTitle(target.value)} /></div>
        <div>author:<input type="text" name="author" id="author" onChange={({ target }) => setAuthor(target.value)}/></div>
        <div>url:<input type="url" name="url" id="url" onChange={({ target }) => setUrl(target.value)}/></div>
        <button type="submit">create</button>
      </form>
      <button onClick={() => setIsVisible(false)}>cancel</button>
    </>
  )
}

export default BlogForm