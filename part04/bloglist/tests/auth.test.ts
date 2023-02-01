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
		const res = await api.post('/api/users').send(newUser)
        
		expect(res.status).toBe(201)
        
	})

	test('get user list', async () => {
		const res = await api.get('/api/users')

		expect(res.body).toHaveLength(3)
	})
})