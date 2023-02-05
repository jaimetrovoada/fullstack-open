import express, { Request } from 'express'
import Blog from '../models/blog'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../utils/config'
import { Document, Types } from 'mongoose'

interface IUser extends Document {
	username: string;
	blogs: Types.ObjectId[];
	name?: string;
	passwordHash?: string;
}
interface IRequest extends Request {
	token: string
	user: IUser
}

const router = express.Router()

router.get('/', async (request, response, next) => {
	try {
		const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
		response.json(blogs)
	} catch (exception) {
		next(exception)
	}
})

router.get('/:id', async (request, response, next) => {
	try {
		const blogs = await Blog.findById(request.params.id)
		response.json(blogs)
	} catch (exception) {
		next(exception)
	}
})

router.post('/', async (request:IRequest, response, next) => {
	const { user } = request
	try {
		const newBlog = request.body.likes ? request.body : { ...request.body, likes: 0 }
		const blog = new Blog({
			...newBlog,
			user: user._id
		})

		const result = await blog.save()
		await result.populate('user', { username: 1, name: 1 })
		user.blogs = user.blogs.concat(result.id)
		response.status(201).json(result)
	} catch (exception) {
		next(exception)
	}

})

router.delete('/:id', async (req, res, next) => {
	const id = req.params.id
	const { user } = req

	try {
		const blog = await Blog.findById(id)

		if (blog.user.toString() === user.id) {
			await blog.delete()
			res.status(204).end()
		} else {
			res.status(403).json({ error: 'operation not allowed to the current user' })
		}
		
		
	} catch (exception) {
		next(exception)
	}
})

router.put('/:id', async (req, res, next) => {
	const id = req.params.id

	try {
		const updBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true })
		res.json(updBlog)
	} catch (exception) {
		next(exception)
	}
})

export default router
