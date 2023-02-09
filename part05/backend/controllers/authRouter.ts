import express from 'express'
import jwt from 'jsonwebtoken'
import config from '../utils/config'
import User from '../models/user'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/', async (req, res, next) => {
	const { username, password } = req.body
	try {

		const user = await User.findOne({ username })
        
		const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
    
		if (!user || !passwordCorrect) {
			return res.status(401).json({
				error: 'invalid username or password'
			})
		}
		const userForToken = {
			username: user.username,
			id: user._id
		}
    
		const token = jwt.sign(userForToken, config.TOKEN_SECRET)
		res.status(200).send({ token, username: user.username, name: user.name })
	} catch (exception) {
		next(exception)
	}
})

export default router