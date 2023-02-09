import { NextFunction, Request, Response } from 'express'
import logger from './logger'
import  jwt from 'jsonwebtoken'
import config from './config'
import User from '../models/user'
import { Document, Types } from 'mongoose'

interface IUser extends Document {
	username: string;
	blogs: Types.ObjectId[];
	name?: string;
	passwordHash?: string;
}
interface IRequest extends Request {
	token: string
	user: IUser
}

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

const tokenExtractor = (req: IRequest, res: Response, next: NextFunction) => {

	const authorization = req.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		req.token = authorization.replace('Bearer ', '')
	}
	next()
}

const userExtractor = async (req: IRequest, res: Response, next: NextFunction) => {
	const { token } = req

	if (!token) {
		return res.status(401).json({ error: 'user not logged in' })
	}

	const decodedToken = jwt.verify(token, config.TOKEN_SECRET) as {username:string, id:string, iat:number}

	if (!decodedToken.id) {
		return res.status(401).json({ error: 'invalid token' })
	}
	
	const user = await User.findById(decodedToken.id)
	user._id

	req.user = user

	next()
}

export default {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor, 
	userExtractor
} as const
