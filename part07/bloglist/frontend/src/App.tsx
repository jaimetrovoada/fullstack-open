/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import "./index.css";
import { INotification, RootState, setNotification } from "./reducers";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<any>(null);

  const dispatch = useDispatch();

  const notification = useSelector<RootState, INotification>(
    (state) => state.notification
  );

  console.log({ notification });

  const localStorage = window.localStorage;
  const localStorageKey = "logginDetails";

  const sendNotification = ({
    type,
    msg,
  }: {
    type: "error" | "success";
    msg: string;
  }) => {
    dispatch(setNotification({ type, msg }));
    setTimeout(() => {
      dispatch(setNotification({ msg: "", type: "error" }));
    }, 5000);
  };

  const likeBlog = async (blog: any) => {
    try {
      const res = await blogService.likeBlog(blog);
      sendNotification({ type: "success", msg: `liked ${blog.title}` });

      setBlogs((prev: any[]) => {
        prev.find((blog) => blog.id === res.id).likes = res.likes;
        return prev;
      });
    } catch (err) {
      console.log({ err });
      sendNotification({ type: "error", msg: "like post failed" });
    }
  };

  const deleteBlog = async (blog: any) => {
    try {
      window.alert(`remove blog ${blog.title} by ${blog.author}?`);
      await blogService.deleteBlog(blog.id);
      sendNotification({ type: "success", msg: `deleted ${blog.title}` });

      setBlogs((prev: any[]) => {
        const deletedBlog = prev.find((item) => item.id === blog.id);
        prev = prev.filter((blog) => blog !== deletedBlog);
        return prev;
      });
    } catch (err) {
      console.log({ err });
      sendNotification({ type: "error", msg: "delete blog failed" });
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(localStorageKey);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      sendNotification({
        type: "success",
        msg: `logged in as ${user.username}`,
      });
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      console.log({ user });
      setUser(user);
      localStorage.setItem(localStorageKey, JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      sendNotification({
        type: "success",
        msg: `logged in as ${user.username}`,
      });
    } catch (error) {
      console.log({ error });
      sendNotification({ type: "error", msg: "wrong name or password" });
    }
  };

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    localStorage.removeItem(localStorageKey);
    setUser(null);
  };

  const createNewBlog = async (
    e: React.FormEvent<HTMLFormElement>,
    title: string,
    author: string,
    url: string
  ) => {
    e.preventDefault();

    try {
      const newBlog = await blogService.addNewBlog({ title, author, url });
      setBlogs((prev: any[]) => prev.concat(newBlog));
      sendNotification({
        type: "success",
        msg: `a new blog: ${newBlog.title} by ${newBlog.author} added`,
      });
    } catch (err) {
      console.log({ err });
      sendNotification({ type: "error", msg: "adding new blog failed" });
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin} id="login-form">
          <div>
            username{" "}
            <input
              type="text"
              name="username"
              id="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password{" "}
            <input
              type="password"
              name="password"
              id="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" className="loginBtn">
            login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>
      <div>{user.username} logged in</div>
      <button className="logout-btn" onClick={handleLogout}>
        log out
      </button>
      <br />
      <BlogForm createNewBlog={createNewBlog} />
      <br />
      <div className="blogSection">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog: any) => (
            <Blog
              key={blog.id}
              blog={blog}
              deleteBlog={deleteBlog}
              likeBlog={likeBlog}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
