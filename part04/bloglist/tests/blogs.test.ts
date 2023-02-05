import app from '../app'
import supertest from 'supertest'
import Blog from '../models/blog'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../utils/config'

const api = supertest(app)

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


describe('add blogs with user info',() => {
	beforeEach(async () => {
		await Blog.deleteMany({})
	
		const blogsObj = initialBlogs.map(blog => new Blog(blog))
	
		const blogPromiseArr = blogsObj.map(blog => blog.save())
		
		await User.deleteMany({})
	
		const usersObj = initialUsers.map(user => new User(user))
	
		const userPromiseArr = usersObj.map(user => user.save())
	
		await Promise.all(blogPromiseArr)
		await Promise.all(userPromiseArr)
	})

	test('check if user info is added to blogs', async () => { 
		const res = await api.get('/api/blogs')
		// console.log({ res:res.body })
		expect(res.body[0].user.id).toBeDefined()

	})

	test('check if blogs are added to user', async () => { 

		const res = await api.get('/api/users')
		// console.log({ blogs: res.body[0].blogs })
		expect(res.body[0].blogs).toHaveLength(2)
		expect(res.body[0].blogs[0].id).toBeDefined()
	})

	test('new blogs gets assigned to a user', async () => {
		const newBlog = {
			title: 'Finding new islands',
			author: 'Monkey D. Luffy',
			url: 'https://strawhatluffy.com/new-islands',
			likes: 20
		}

		const res = await api.post('/api/blogs').send(newBlog)
		expect(res.status).toBe(201)
		expect(res.body.user).toBeDefined()
		expect(res.body.user.id).toBeDefined()
		expect(res.body.user.username).toBeDefined()
		expect(res.body.user.name).toBeDefined()
		/* toEqual(
			{
				id: '63dca9bbd699ebf539fb2dc8',
				name: 'Monkey D. Luffy',
				username: 'luffy',
			}
		) */
			
	})
    
})

describe('add blogs only with token', () => {
	beforeEach(async () => {

		await User.deleteMany({})

		const promiseArr = initialUsers.map(async (user) => await api.post('/api/users').send(user))
		await Promise.all(promiseArr)
	}, 100_000)

	test('valid token', async () => {

		const user = await User.findOne({ username: 'luffy' })
		
		const userForToken = {
			username: user.username,
			id: user._id
		}
    
		const token = jwt.sign(userForToken, config.TOKEN_SECRET)
		
		const newBlog = {
			title: 'Finding new islands',
			author: 'Monkey D. Luffy',
			url: 'https://strawhatluffy.com/new-islands',
			likes: 20
		}
		const res = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog)


		expect(res.status).toBe(201)
		expect(res.body.user).toBeDefined()
		expect(res.body.user.id).toBeDefined()
		expect(res.body.user.username).toBe('luffy')
		expect(res.body.user.name).toBeDefined()
	})

	/* test('invalid token', async () => {

		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imx1ZmZ5IiwiaWQiOiI2M2RjZDYxODEzZTQ3YmE2Yzk1MWIxNTQiLCJpYXQiOjE2NzU0MTc3NDJ9.qyAjeHINaDNH0xP288F-7D-VjozVBq0MZ86mlTIKY-k'
		
		const newBlog = {
			title: 'Finding new islands',
			author: 'Monkey D. Luffy',
			url: 'https://strawhatluffy.com/new-islands',
			likes: 20
		}
		const res = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog)


		expect(res.status).toBe(401)
		expect(res.body.user).not.toBeDefined()
		expect(res.body.user.id).not.toBeDefined()
		expect(res.body.user.username).not.toBeDefined()
		expect(res.body.user.name).not.toBeDefined()
	}) */
})

describe('blog can only be deleted by creator', () => { 
	beforeEach(async () => {
		await User.deleteMany({})
		await Blog.deleteMany({})
	
		const usersObj = initialUsers.map(user => new User(user))
		const blogsObj = initialBlogs.map(blog => new Blog(blog))
		
		const userPromiseArr = usersObj.map(user => user.save())
		const blogPromiseArr = blogsObj.map(blog => blog.save())
	
		await Promise.all(userPromiseArr)
		await Promise.all(blogPromiseArr)
	})
	test('valid user', async () => { 
		const blogToDel = initialBlogs[0]
		
		const user = await User.findOne({ username: 'luffy' })
		
		const userForToken = {
			username: user.username,
			id: user._id
		}
    
		const token = jwt.sign(userForToken, config.TOKEN_SECRET)

		await api.delete(`/api/blogs/${blogToDel._id}`).set('Authorization', `Bearer ${token}`).expect(204)
	})

	test('invalid user', async () => { 
		const blogToDel = initialBlogs[0]
		
		const user = await User.findOne({ username: 'zoro' })
		
		const userForToken = {
			username: user.username,
			id: user._id
		}
    
		const token = jwt.sign(userForToken, config.TOKEN_SECRET)

		await api.delete(`/api/blogs/${blogToDel._id}`).set('Authorization', `Bearer ${token}`).expect(403, { error: 'operation not allowed to the current user' })
	})
})