/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import "./index.css";
import {
  IBlog,
  INotification,
  RootState,
  setNotification,
  removeBlog,
  likeBlog,
  initBlogs,
  setUser,
  IUser,
  setUserList,
  IBlogUser,
} from "./reducers";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import UsersView from "./components/UsersView";
import usersService from "./services/users";
import UserView from "./components/UserView";

const App = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [user, setUser] = useState<any>(null);

  const dispatch = useDispatch();

  const notification = useSelector<RootState, INotification>(
    (state) => state.notification
  );

  const blogs = useSelector<RootState, IBlog[]>((state) => state.blogs);

  const user = useSelector<RootState, IUser>((state) => state.user);
  const userList = useSelector<RootState, IBlogUser[]>(
    (state) => state.userList
  );

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

  const voteBlog = async (blog: IBlog) => {
    try {
      const res = await blogService.likeBlog(blog);
      sendNotification({ type: "success", msg: `liked ${blog.title}` });

      dispatch(likeBlog(res.id));
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

      dispatch(removeBlog(blog.id));
    } catch (err) {
      console.log({ err });
      sendNotification({ type: "error", msg: "delete blog failed" });
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(localStorageKey);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
      sendNotification({
        type: "success",
        msg: `logged in as ${user.username}`,
      });
    }
  }, []);

  useEffect(() => {
    dispatch<any>(initBlogs());
    usersService.getAll().then((res) => {
      console.log({ res });
      dispatch(setUserList(res));
    });
  }, []);
  console.log({ userList, blogs });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      dispatch(setUser(user));
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
    setUser({} as IUser);
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
      dispatch(newBlog(newBlog));
      sendNotification({
        type: "success",
        msg: `a new blog: ${newBlog.title} by ${newBlog.author} added`,
      });
    } catch (err) {
      console.log({ err });
      sendNotification({ type: "error", msg: "adding new blog failed" });
    }
  };

  const userMatch = useMatch("/users/:id")?.params.id;
  console.log({ userMatch });
  const userToDisplay = userMatch
    ? userList.find((u) => u.id === userMatch)
    : null;

  return (
    <>
      <Notification notification={notification} />
      <header>
        {user === null || user === undefined ? (
          <>
            <h2>Log in to application</h2>
          </>
        ) : (
          <>
            <h2>blogs</h2>
            <div>
              <Link to="/users">{user.name}</Link>
              logged in
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              log out
            </button>
            <br />
          </>
        )}
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {user === null || user === undefined ? (
                <>
                  <div>
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
                </>
              ) : (
                <>
                  <BlogForm createNewBlog={createNewBlog} />
                  <br />
                  <div className="blogSection">
                    {blogs
                      // .sort((a, b) => b.likes - a.likes)
                      .map((blog: any) => (
                        <Blog
                          key={blog.id}
                          blog={blog}
                          deleteBlog={deleteBlog}
                          likeBlog={voteBlog}
                        />
                      ))}
                  </div>
                </>
              )}
            </div>
          }
        />
        <Route path="/users" element={<UsersView users={userList} />} />
        <Route
          path="/users/:id"
          element={<UserView user={userToDisplay as IBlogUser} />}
        />
      </Routes>
    </>
  );
};

export default App;
