import express from 'express'
import Blog from '../models/blog'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../utils/config'

const router = express.Router()

const getTokenFrom = (request) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '')
	}
	return null
}

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

router.post('/', async (request, response, next) => {
	const token = getTokenFrom(request)
	try {
		const decodedToken = jwt.verify(token, config.TOKEN_SECRET) as {username:string, id:string, iat:number}
		if (!decodedToken.id) {
			return response.status(401).json({ error: 'invalid token' })
		}

		if (!request.body.url || !request.body.title) {
			return response.status(400).end()
		}
		const user = await User.findById(decodedToken.id)

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

	try {
		await Blog.findByIdAndDelete(id)
		res.status(204).end()
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
