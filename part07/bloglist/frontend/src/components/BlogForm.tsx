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
        <button className="" onClick={() => setIsVisible(true)}>
          create new blog
        </button>
      </>
    );
  }
  return (
    <>
      <form
        onSubmit={(e) => createNewBlog(e, title, author, url)}
        className="flex max-w-sm flex-col gap-4"
      >
        <div className="flex flex-col gap-1 text-xl font-bold">
          title:
          <input
            type="text"
            name="title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 text-xl font-bold">
          author:
          <input
            type="text"
            name="author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 text-xl font-bold">
          url:
          <input
            type="url"
            name="url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div className="flex flex-row gap-4">
          <button className="bg-slate-800 hover:bg-green-600" type="submit">
            create
          </button>
          <button
            className="bg-slate-800 hover:bg-red-600"
            onClick={() => setIsVisible(false)}
          >
            cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default BlogForm;
