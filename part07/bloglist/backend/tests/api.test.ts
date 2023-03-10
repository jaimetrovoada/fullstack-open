import app from '../app'
import supertest from 'supertest'
import Blog from '../models/blog'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../utils/config'

const api = supertest(app)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initialUsers = [
	{
		_id: '63dca9bbd699ebf539fb2dc8',
		name: 'Monkey D. Luffy',
		username: 'luffy',
		password: 'thepirateking',
		blogs: ['5a422a851b54a676234d17f7', '5a422aa71b54a676234d17f8']
	},
	{
		_id: '63dca9bbd699ebf539fb2dc9',
		name: 'Zoro',
		username: 'zoro',
		password: 'threeswordstyle',
		blogs: ['5a422b3a1b54a676234d17f9','5a422b891b54a676234d17fa']
	},
	{
		_id: '63dca9bbd699ebf539fb2dca',
		name: 'Vinsmoke Sanji',
		username: 'sanji',
		password: 'blackleg',
		blogs: ['5a422ba71b54a676234d17fb','5a422bc61b54a676234d17fc']
	}
]

const initialBlogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0,
		user: '63dca9bbd699ebf539fb2dc8'
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0,
		user: '63dca9bbd699ebf539fb2dc8'
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0,
		user: '63dca9bbd699ebf539fb2dc9'
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0,
		user: '63dca9bbd699ebf539fb2dc9'
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0,
		user: '63dca9bbd699ebf539fb2dca'
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0,
		user: '63dca9bbd699ebf539fb2dca'
	},

]

const TIMEOUT = 100_000

beforeEach(async () => {
	await User.deleteMany({})
	await Blog.deleteMany({})
	
	const usersObj = initialUsers.map(user => new User(user))
	const blogsObj = initialBlogs.map(blog => new Blog(blog))
		
	const userPromiseArr = usersObj.map(user => user.save())
	const blogPromiseArr = blogsObj.map(blog => blog.save())
	
	await Promise.all(userPromiseArr)
	await Promise.all(blogPromiseArr)
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

		const user = await User.findOne({ username: 'luffy' })
		
		const userForToken = {
			username: user.username,
			id: user._id
		}
    
		const token = jwt.sign(userForToken, config.TOKEN_SECRET)
		await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/)

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

		const user = await User.findOne({ username: 'luffy' })
		
		const userForToken = {
			username: user.username,
			id: user._id
		}
    
		const token = jwt.sign(userForToken, config.TOKEN_SECRET)
		await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/)

		const res = await api.get('/api/blogs')

		const lastItem = res.body.length - 1
		const content = res.body[lastItem]
		
		expect(content.likes).toBeDefined()
		expect(content.likes).toBe(0)
	})

	test('bad request: no title', async () => { 

		const newBlog = {
			title: '',
			author: 'Stephen Hawkins',
			url: 'https://stephenhawkins.com/',

		}

		const user = await User.findOne({ username: 'luffy' })
		
		const userForToken = {
			username: user.username,
			id: user._id
		}
    
		const token = jwt.sign(userForToken, config.TOKEN_SECRET)
		await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400)

	}, )

	test('bad request: no url', async () => { 

		const newBlog = {
			title: 'Relativity',
			author: 'Albert Einstein',
			url: '',

		}

		const user = await User.findOne({ username: 'luffy' })
		
		const userForToken = {
			username: user.username,
			id: user._id
		}
    
		const token = jwt.sign(userForToken, config.TOKEN_SECRET)
		await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400)

	}, )
})

describe('DELETE blog', () => {
	test('delete 2nd note', async () => { 
		const blogToDel = initialBlogs[1]

		const user = await User.findOne({ username: 'luffy' })
		
		const userForToken = {
			username: user.username,
			id: user._id
		}
    
		const token = jwt.sign(userForToken, config.TOKEN_SECRET)
		await api.delete(`/api/blogs/${blogToDel._id}`).set('Authorization', `Bearer ${token}`).expect(204)

		const res = await api.get('/api/blogs')

		expect(res.body.length).toBe(initialBlogs.length - 1)
	}, )
})

describe('PUT blog', () => { 
	test('update blog',async () => { 
		const blogToUpd = initialBlogs[2]

		const updatedBlog = {

			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'https://newlink.com/updated-blog',
			likes: 20
		}

		await api.put(`/api/blogs/${blogToUpd._id}`).send(updatedBlog).expect(200)

		const res = await api.get(`/api/blogs/${blogToUpd._id}`)

		expect(res.body.likes).not.toBe(blogToUpd.likes)
		expect(res.body.url).not.toBe(blogToUpd.url)

		expect(res.body.likes).toBe(updatedBlog.likes)
		expect(res.body.url).toBe(updatedBlog.url)
		
	})
})