import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

mongoose.set('strictQuery', false)

const userSchema = new mongoose.Schema({
	name: String,
	username: String,
	passwordHash: String,
	blogs: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Blog'
	}]
}
)

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	},
})

const User = mongoose.model('User', userSchema)
export default User