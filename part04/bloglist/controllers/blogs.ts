import express from 'express'
import Blog from '../models/blog'

const router = express.Router()

router.get('/', async (request, response) => {
	const blogs = await Blog.find({})

	response.json(blogs)
})

router.post('/', (request, response) => {
	const blog = new Blog(request.body)

	blog.save().then((result) => {
		response.status(201).json(result)
	})
})

export default router
