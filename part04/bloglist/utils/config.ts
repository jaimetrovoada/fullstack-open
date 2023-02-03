import * as dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI =
  process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI

const PORT = process.env.PORT

const TOKEN_SECRET = process.env.TOKEN_SECRET

export default { MONGODB_URI, PORT, TOKEN_SECRET } as const
