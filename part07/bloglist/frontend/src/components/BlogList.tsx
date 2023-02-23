import React from "react";
import { IBlog } from "../reducers";
import Blog from "./Blog";

interface Props {
  blogs: IBlog[];
}

const BlogList: React.FC<Props> = ({ blogs }) => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {blogs
        // .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default BlogList;
