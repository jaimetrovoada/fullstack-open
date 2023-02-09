/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setMessage, setBlogs }: { blog: any, setBlogs: React.Dispatch<any>, setMessage: React.Dispatch<React.SetStateAction<{
    msg: string;
    type: 'success' | 'error';
} | null>> }) => {
  const blogItemBody = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const toggleBody = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault()

    blogItemBody.current?.classList.toggle('show')
    setIsVisible(prev => !prev)
  }

  const likePost = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    try {

      const res = await blogService.likeBlog(blog)
      setMessage({ type: 'success', msg: `liked ${blog.title}` })

      setBlogs((prev: any[]) => {
        prev.find(blog => blog.id === res.id).likes = res.likes
        return prev
      }
      )
    } catch (err) {
      console.log({ err })
      setMessage({ type: 'error', msg: 'like post failed' })
    }
  }

  const deleteBlog = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    try {
      window.alert(`remove blog ${blog.title} by ${blog.author}?`)
      await blogService.deleteBlog(blog.id)
      setMessage({ type: 'success', msg: `deleted ${blog.title}` })

      setBlogs((prev: any[]) => {
        const deletedBlog = prev.find(item => item.id === blog.id)
        prev = prev.filter(blog => blog !== deletedBlog)
        return prev
      })
    } catch (err) {
      console.log({ err })
      setMessage({ type: 'error', msg: 'delete blog failed' })
    }
  }

  return (
    <div className='blogItem'>
      <div className="blogItem--header">
        {blog.title} {blog.author}
        <button onClick={toggleBody}>{isVisible ?'hide' : 'view'}</button>
      </div>
      <div className="blogItem--body" ref={blogItemBody}>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
        <p>
          likes {blog.likes}
          <button onClick={likePost}>like</button>
        </p>
        <p>{blog.user.name}</p>
        <button onClick={deleteBlog}>delete</button>
      </div>
    </div>

  )
}

export default Blog
