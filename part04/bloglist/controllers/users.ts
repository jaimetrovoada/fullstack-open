import express from 'express'
import User from '../models/user'
import bcrypt from 'bcrypt'

const router = express.Router()

router.get('/', async (req, res ,next) => {
	try {
		const users = await User.find({})
		res.json(users)
	} catch (exception) {
		next(exception)
	}

})

router.post('/', async (req, res, next) => {

	const { name, username, password } = req.body
    
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const newUser = new User({
		username, name, passwordHash
	})
    
	try {
		const saveUser = await newUser.save()
		res.status(201).json(saveUser)
	} catch (exception) {
		next(exception)
	}
})

export default router