/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
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
  newBlog,
  commentBlog,
} from "./reducers";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import UsersView from "./components/UsersView";
import usersService from "./services/users";
import UserView from "./components/UserView";
import BlogView from "./components/BlogView";
import Nav from "./components/Nav";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      dispatch(removeBlog(blog.id));

      sendNotification({ type: "success", msg: `deleted ${blog.title}` });
      navigate("/");
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

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
    username: string,
    password: string
  ) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      dispatch(setUser(user));
      localStorage.setItem(localStorageKey, JSON.stringify(user));
      blogService.setToken(user.token);
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
    dispatch(setUser({} as IUser));
    sendNotification({ type: "success", msg: "logged out" });
  };

  const createNewBlog = async (
    e: React.FormEvent<HTMLFormElement>,
    title: string,
    author: string,
    url: string
  ) => {
    e.preventDefault();

    try {
      const _newBlog = await blogService.addNewBlog({ title, author, url });
      dispatch(newBlog(_newBlog));
      sendNotification({
        type: "success",
        msg: `a new blog: ${_newBlog.title} by ${_newBlog.author} added`,
      });
    } catch (err) {
      console.log({ err });
      sendNotification({ type: "error", msg: "adding new blog failed" });
    }
  };

  const onComment = async (
    e: React.FormEvent<HTMLFormElement>,
    blog: IBlog,
    comment: string
  ) => {
    e.preventDefault();
    const newComment = [...blog.comments, comment];
    const updateBlog = {
      ...blog,
      comments: newComment,
      user: blog.user.id,
    };

    try {
      const res = await blogService.commentBlog(updateBlog);

      dispatch(commentBlog(res));
      sendNotification({
        type: "success",
        msg: `commented ${comment}`,
      });
    } catch (err) {
      console.log({ err });
      sendNotification({ type: "error", msg: "commenting on blog failed" });
    }
  };
  console.log({ user });

  return (
    <>
      <Nav handleLogout={handleLogout} user={user} />
      <main className="relative p-4">
        <Notification notification={notification} />
        {user.token === null || user.token === undefined ? (
          <>
            <h2>Log in to application</h2>
          </>
        ) : (
          <>
            <h2>blogs</h2>
            <br />
          </>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {user.token === null || user.token === undefined ? (
                  <>
                    <LoginForm handleLogin={handleLogin} />
                  </>
                ) : (
                  <>
                    <BlogForm createNewBlog={createNewBlog} />
                    <BlogList blogs={blogs} />
                  </>
                )}
              </div>
            }
          />
          <Route path="/users" element={<UsersView users={userList} />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route
            path="/blogs/:id"
            element={
              <BlogView
                vote={voteBlog}
                deleteBlog={deleteBlog}
                onComment={onComment}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
