import React, { useState } from "react";
import { IBlog, RootState } from "../reducers";
import { Link, useMatch } from "react-router-dom";
import { useSelector } from "react-redux";

interface Props {
  vote: (blog: IBlog) => void;
  deleteBlog: (blog: IBlog) => void;
  onComment: (
    e: React.FormEvent<HTMLFormElement>,
    blog: IBlog,
    comment: string
  ) => Promise<void>;
}

const BlogView: React.FC<Props> = ({ vote, deleteBlog, onComment }) => {
  const blogMatch = useMatch("/blogs/:id")?.params.id;

  const [comment, setComment] = useState<string>("");

  const blog = useSelector<RootState, IBlog>(
    (state) => state.blogs.find((blog) => blog.id === blogMatch) as IBlog
  );

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
      <h3>comments</h3>
      <form onSubmit={(e) => onComment(e, blog, comment)}>
        <input
          type="text"
          name="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogView;
