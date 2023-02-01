import express from 'express'
import Blog from '../models/blog'

const router = express.Router()

router.get('/', async (request, response) => {
	const blogs = await Blog.find({})

	response.json(blogs)
})

router.post('/', async (request, response) => {
	if (!request.body.url || !request.body.title) {
		return response.status(400).end()
	}

	const newBlog = request.body.likes ? request.body : { ...request.body, likes: 0 }
	const blog = new Blog(newBlog)

	const result = await blog.save()
	response.status(201).json(result)

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

export default router
