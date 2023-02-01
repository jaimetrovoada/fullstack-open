import app from '../app'
import supertest from 'supertest'
import User from '../models/user'

interface User {
    name: string
    username: string
    password: string
}
const api = supertest(app)
const TIMEOUT = 100_000

const initialUsers: User[] = [
	{
		name: 'Monkey D. Luffy',
		username: 'luffy',
		password: 'thepirateking'
	},
	{
		name: 'Zoro',
		username: 'zoro',
		password: 'threeswordstyle'
	},
	{
		name: 'Vinsmoke Sanji',
		username: 'sanji',
		password:'blackleg'
	}
]

beforeEach(async () => {
	await User.deleteMany({})
	const userObjs = initialUsers.map((user) => new User(user))

	const promiseArr = userObjs.map((user) => user.save())
	await Promise.all(promiseArr)
}, TIMEOUT)


describe('user creation', () => {

	test('add new user', async () => {
        
		const newUser: User = {
			name: 'Chopper',
			username: 'chopper',
			password: 'reindeer'
		}
		await api.post('/api/users').send(newUser).expect('Content-Type', /application\/json/).expect(201)
	})

	test('get user list', async () => {
		const res = await api.get('/api/users')

		expect(res.body).toHaveLength(3)
	})

	test('no username', async () => {
		const newUser = {
			username: '',
			name: 'Nami',
			password: 'navigator'
		}

		await api.post('/api/users').send(newUser).expect(400, {
			error: 'username and password required'
		})
	})

	test('username too short', async () => {
		const newUser = {
			username: 'na',
			name: 'Nami',
			password: 'navigator'
		}

		await api.post('/api/users').send(newUser).expect('Content-Type', /application\/json/).expect(400, {
			error: 'User validation failed: username: username too short, min length = 3'
		})
	})

	test('no password', async () => {
		const newUser = {
			username: 'nami',
			name: 'Nami',
			password: ''
		}

		await api.post('/api/users').send(newUser).expect('Content-Type', /application\/json/).expect(400, {
			error: 'username and password required'
		})
	})
	test('password too short', async () => {
		const newUser = {
			username: 'nami',
			name: 'Nami',
			password: 'vi'
		}

		await api.post('/api/users').send(newUser).expect('Content-Type', /application\/json/).expect(400, {
			error: 'password too short, min length = 3'
		})
	})
})