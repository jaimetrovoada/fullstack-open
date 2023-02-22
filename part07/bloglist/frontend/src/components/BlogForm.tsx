/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

const BlogForm = ({
  createNewBlog,
}: {
  createNewBlog: (
    e: React.FormEvent<HTMLFormElement>,
    title: string,
    author: string,
    url: string
  ) => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const [isVisible, setIsVisible] = useState<boolean>(false);

  if (!isVisible) {
    return (
      <>
        <button className="showFormBtn" onClick={() => setIsVisible(true)}>
          create new blog
        </button>
      </>
    );
  }
  return (
    <>
      <form onSubmit={(e) => createNewBlog(e, title, author, url)}>
        <div>
          title:
          <input
            type="text"
            name="title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="url"
            name="url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button className="submitFormBtn" type="submit">
          create
        </button>
      </form>
      <button className="hideFormBtn" onClick={() => setIsVisible(false)}>
        cancel
      </button>
    </>
  );
};

export default BlogForm;
