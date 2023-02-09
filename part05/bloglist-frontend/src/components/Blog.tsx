import React, { useRef, useState } from "react";

const Blog = ({ blog }: { blog: any }) => {
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
        <p>
          {blog.url}
        </p>
        <p>
          likes {blog.likes}
          <button>like</button>
        </p>
        <p>{blog.author}</p>
      </div>
    </div>

  )
};

export default Blog;
