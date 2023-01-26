import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose
	.connect(url)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: [3, 'Name too short, should be at least 3 characters long'],
		required: [true, 'Name is required'],
		unique: true,
	},
	number: {
		type: String,
		minLength: [8, 'Number too short, should be at least 8 numbers long'],
		required: [true, 'Number is required'],
		validate: {
			validator: function (v) {
				return /^\d{2,3}-\d{6,}$/.test(v)
			},
			message: (props) => `${props.value} is not a valid phone number!`,
		},
	},
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Person = mongoose.model('Person', personSchema)
Person.init()

const getAll = () => {
	return Person.find({})
}

const getById = (id: string) => {
	return Person.findById(id)
}

const addPerson = (name: string, number: string) => {
	const person = new Person({
		name: name,
		number: number,
	})
	return person.save()
}

const removePerson = (id: string) => {
	return Person.findByIdAndRemove(id)
}

const updateInfo = (id: string, update: { name: string; number: string }) => {
	return Person.findByIdAndUpdate(id, update, {
		new: true,
		runValidators: true,
	})
}

export default {
	getAll: getAll,
	getById: getById,
	addPerson: addPerson,
	removePerson: removePerson,
	updateInfo: updateInfo,
} as const
