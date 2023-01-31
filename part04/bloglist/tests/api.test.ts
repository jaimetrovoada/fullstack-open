import app from '../app'
import supertest from 'supertest'
import Blog from '../models/blog'
import { brotliDecompress } from 'zlib'

const api = supertest(app)

const initialBlogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0,
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0,
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0,
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0,
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0,
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0,
	},
]

const TIMEOUT = 100_000

beforeEach(async () => {
	await Blog.deleteMany({})
	const blogObjs = initialBlogs.map((blog) => new Blog(blog))

	const promiseArr = blogObjs.map((blog) => blog.save())
	await Promise.all(promiseArr)
}, TIMEOUT)

describe('GET /api/blogs', () => {
	test('has same amount of blogs', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(initialBlogs.length)
	})

	test('has id property', async () => {
		const response = await api.get('/api/blogs')
		response.body.forEach(blog => {
			
			expect(blog.id).toBeDefined()
		})

	})
})

describe('POST /api/blogs', () => {
	test('new blog gets saved', async () => {

		const newBlog = {
			title: 'Black Holes',
			author: 'Stephen Hawkins',
			url: 'https://stephenhawkins.com/black-holes',
			likes: 10

		}

		await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

		const res = await api.get('/api/blogs')

		const content = res.body.map(blog => blog.title)
		
		expect(res.body).toHaveLength(initialBlogs.length + 1)
		expect(content).toContainEqual(newBlog.title)
	})

	test('likes default to zero', async () => { 

		const newBlog = {
			title: 'Black Holes',
			author: 'Stephen Hawkins',
			url: 'https://stephenhawkins.com/black-holes',

		}

		await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

		const res = await api.get('/api/blogs')

		const lastItem = res.body.length - 1
		const content = res.body[lastItem]
		
		expect(content.likes).toBeDefined()
		expect(content.likes).toBe(0)
	})
})
