import React from "react";
import { IBlog } from "../reducers";
import { Link } from "react-router-dom";

const Blog = ({ blog }: { blog: IBlog }) => {
  return (
    <div className="blogItem">
      <div className="blogItem--header">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  );
};

export default Blog;
