import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({setBlogs}: {setBlogs: React.Dispatch<any>}) => {
    const [title, setTitle] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
    const [url, setUrl] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try {
           const newBlog = await blogService.addNewBlog({title, author, url})
           setBlogs((prev: any[]) => prev.concat(newBlog))

        } catch (err) {
            console.log({err})
        }
    }
  return (
      <form onSubmit={handleSubmit}>
          <div>title:<input type="text" name="title" id="title" onChange={({target}) => setTitle(target.value)} /></div>
          <div>author:<input type="text" name="author" id="author" onChange={({target})=> setAuthor(target.value)}/></div>
          <div>url:<input type="url" name="url" id="url" onChange={({target})=> setUrl(target.value)}/></div>
    <button type="submit">create</button>
    </form>
  )
}

export default BlogForm