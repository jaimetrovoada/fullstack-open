import React from "react";
import { IBlog } from "../reducers";
import { Link } from "react-router-dom";

const Blog = ({ blog }: { blog: IBlog }) => {
  return (
    <div className="rounded-md border p-2 odd:bg-slate-600 even:bg-slate-500">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  );
};

export default Blog;
