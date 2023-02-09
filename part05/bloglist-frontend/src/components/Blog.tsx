import React, { useRef, useState } from "react";
import blogService from "../services/blogs";

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
      console.log({err})
      setMessage({type: 'error', msg: 'like post failed'})
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
      </div>
    </div>

  )
};

export default Blog;
