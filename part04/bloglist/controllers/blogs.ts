import express from 'express'
import Blog from '../models/blog'

const router = express.Router()

router.get('/', async (request, response) => {
	const blogs = await Blog.find({})

	response.json(blogs)
})

router.post('/', async (request, response) => {
	const newBlog = request.body.likes ? request.body : { ...request.body, likes: 0 }
	const blog = new Blog(newBlog)

	const result = await blog.save()
	response.status(201).json(result)

})

export default router
