import React from "react";

const Blog = ({ blog }: { blog: any }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

export default Blog;
