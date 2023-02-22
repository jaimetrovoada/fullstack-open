import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

export interface INotification {
  msg: string;
  type: "error" | "success";
}

export interface IUser {
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
  user: IUser;
}
export interface RootState {
  notification: INotification;
  blogs: IBlog[];
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

const reducer = {
  notification: notificationSlice.reducer,
  blogs: blogsSlice.reducer,
};
export default reducer;

export const { setNotification } = notificationSlice.actions;
export const { setBlogs, newBlog, removeBlog, likeBlog } = blogsSlice.actions;

export const initBlogs = () => {
  return async (
    dispatch: (arg0: { payload: IBlog[]; type: "blogs/setBlogs" }) => void
  ) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};
