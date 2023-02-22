import express from 'express'
import User from '../models/user'
import bcrypt from 'bcrypt'

const router = express.Router()

router.get('/', async (req, res ,next) => {
	try {
		const users = await User.find({}).populate('blogs', { title: 1, author: 1, url:1 })
		res.json(users)
	} catch (exception) {
		next(exception)
	}

})

router.post('/', async (req, res, next) => {

	const { name, username, password } = req.body

	try {
		if (!username || !password) {
			
			return res.status(400).json({ error: 'username and password required' })
		}

		if (password.length < 3) {
			return res.status(400).json({ error: 'password too short, min length = 3' })
		}
    
		const saltRounds = 10
		const passwordHash = await bcrypt.hash(password, saltRounds)

		const newUser = new User({
			username, name, passwordHash
		})
    
		const saveUser = await newUser.save()
		res.status(201).json(saveUser)
	} catch (exception) {
		next(exception)
	}
})

export default router