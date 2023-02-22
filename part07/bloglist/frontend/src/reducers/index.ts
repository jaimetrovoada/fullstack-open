import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

export interface INotification {
  msg: string;
  type: "error" | "success";
}

export interface IBlogUser {
  name: string;
  username: string;
  id: string;
}
export interface IBlog {
  title: string;
  id: string;
  author: string;
  url: string;
  likes: number;
  user: IBlogUser;
}

export interface IUser {
  name: string;
  username: string;
  token: string;
}
export interface RootState {
  notification: INotification;
  blogs: IBlog[];
  user: IUser;
}

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    msg: "",
    type: "",
  },
  reducers: {
    setNotification(state, action: { payload: INotification }) {
      return { msg: action.payload.msg, type: action.payload.type };
    },
  },
});

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [] as IBlog[],
  reducers: {
    setBlogs(state, action: { payload: IBlog[] }) {
      return action.payload;
    },
    newBlog(state, action: { payload: IBlog }) {
      return [...state, action.payload];
    },
    likeBlog(state, action: { payload: IBlog["id"] }) {
      return state.map((blog) =>
        blog.id === action.payload ? { ...blog, likes: blog.likes + 1 } : blog
      );
    },
    removeBlog(state, action: { payload: IBlog["id"] }) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: {} as IUser,
  reducers: {
    setUser(state, action: { payload: IUser }) {
      return action.payload;
    },
  },
});

const reducer = {
  notification: notificationSlice.reducer,
  blogs: blogsSlice.reducer,
  user: userSlice.reducer,
};
export default reducer;

export const { setNotification } = notificationSlice.actions;
export const { setBlogs, newBlog, removeBlog, likeBlog } = blogsSlice.actions;
export const { setUser } = userSlice.actions;

export const initBlogs = () => {
  return async (
    dispatch: (arg0: { payload: IBlog[]; type: "blogs/setBlogs" }) => void
  ) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};
