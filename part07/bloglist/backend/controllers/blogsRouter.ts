import express, { Request } from "express";
import Blog from "../models/blog";
import middleware from "../utils/middleware";
import { Document, Types } from "mongoose";
import User from "../models/user";

interface IUser extends Document {
  username: string;
  blogs: Types.ObjectId[];
  name?: string;
  passwordHash?: string;
}
interface IRequest extends Request {
  token: string;
  user: IUser;
}

const router = express.Router();

const { userExtractor } = middleware;

router.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

router.get("/:id", async (request, response, next) => {
  try {
    const blogs = await Blog.findById(request.params.id);
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

router.post("/", userExtractor, async (request: IRequest, response, next) => {
  const { user } = request;
  try {
    if (!request.body.url || !request.body.title) {
      return response.status(400).end();
    }
    const newBlog = request.body.likes
      ? request.body
      : { ...request.body, likes: 0 };
    const blog = new Blog({
      ...newBlog,
      user: user._id,
    });

    const result = await blog.save();
    await result.populate("user", { username: 1, name: 1 });
    const blogUser = await User.findById(user._id);
    blogUser.blogs.push(result._id);
    blogUser.save();
    response.status(201).json(result);
  } catch (exception) {
    next(exception);
  }
});

router.post("/:id/comments", async (request: IRequest, response, next) => {
  try {
    if (!request.body) {
      return response.status(400).end();
    }
    const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    await blog.populate("user", { username: 1, name: 1 });
    if (!blog) {
      return response.status(404).end();
    }
    response.status(201).json(blog);
  } catch (exception) {
    next(exception);
  }
});

router.delete("/:id", userExtractor, async (req: IRequest, res, next) => {
  const id = req.params.id;
  const { user } = req;

  try {
    const blog = await Blog.findById(id);

    if (blog.user.toString() === user.id) {
      await blog.delete();
      res.status(204).end();
    } else {
      res
        .status(403)
        .json({ error: "operation not allowed to the current user" });
    }
  } catch (exception) {
    next(exception);
  }
});

router.put("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const updBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updBlog);
  } catch (exception) {
    next(exception);
  }
});

export default router;
