import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import blogsRouter from './controllers/blogsRouter'
import userRouter from './controllers/usersRouter'
import loginRouter from './controllers/authRouter'
import config from './utils/config'
import logger from './utils/logger'
import middleware from './utils/middleware'

const app = express()

const { unknownEndpoint, requestLogger, errorHandler, tokenExtractor, userExtractor  } = middleware
const { MONGODB_URI } = config
logger.info({ MONGODB_URI })
mongoose
	.connect(MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message)
	})

app.use(cors())
app.use(express.json())

app.use(requestLogger)
app.use(tokenExtractor)
//app.use(userExtractor)

app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
