
import { Express } from 'express'
import { Document, Types } from 'mongoose'

interface IUser extends Document {
	username: string;
	blogs: Types.ObjectId[];
	name?: string;
	passwordHash?: string;
}
declare global{
    namespace Express {
        interface Request {
            token: string
            user: IUser
        }
    }
}