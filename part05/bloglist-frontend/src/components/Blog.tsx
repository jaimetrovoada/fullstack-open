/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog  }: { blog: any, likeBlog: (...args: any[]) => void, deleteBlog: (...args: any[]) => void }) => {
  const blogItemBody = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const toggleBody = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault()

    blogItemBody.current?.classList.toggle('show')
    setIsVisible(prev => !prev)
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
          <button onClick={() => likeBlog(blog)}>like</button>
        </p>
        <p>{blog.user.name}</p>
        <button onClick={() => deleteBlog(blog)}>delete</button>
      </div>
    </div>

  )
}

export default Blog
