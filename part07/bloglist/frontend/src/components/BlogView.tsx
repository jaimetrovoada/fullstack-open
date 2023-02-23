import React, { useEffect, useState } from "react";
import { IBlog } from "../reducers";
import { Link, useMatch } from "react-router-dom";
import blogs from "../services/blogs";

interface Props {
  vote: (blog: IBlog) => void;
  deleteBlog: (blog: IBlog) => void;
}

const BlogView: React.FC<Props> = ({ vote, deleteBlog }) => {
  const blogMatch = useMatch("/blogs/:id")?.params.id;
  const [blog, setBlog] = useState<IBlog>();
  useEffect(() => {
    blogs.getBlog(blogMatch as string).then((res) => {
      setBlog(res);
    });
  }, [blogMatch]);

  console.log({ blog });

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <br />
      <Link to={blog.url} target="_blank">
        {blog.url}
      </Link>
      <div>
        <span>likes {blog.likes}</span>
        <button onClick={() => vote(blog)}>like</button>
      </div>
      <button onClick={() => deleteBlog(blog)}>delete</button>
      <p>added by {blog.user.name}</p>
    </div>
  );
};

export default BlogView;
