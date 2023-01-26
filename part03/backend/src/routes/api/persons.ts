import express from 'express'
import phonebookModel from '../../model/phonebook'

const router = express.Router()

router.get('/', (req, res, next) => {
	phonebookModel
		.getAll()
		.then((result) => {
			console.log({ result })
			res.json(result)
		})
		.catch((error) => {
			next(error)
		})
})

router.get('/:id', (req, res, next) => {
	const id = req.params.id
	phonebookModel
		.getById(id)
		.then((person) => {
			if (person) {
				res.json(person)
			} else {
				res.status(404).end()
			}
		})
		.catch((error) => {
			next(error)
		})
})

router.delete('/:id', (req, res, next) => {
	const id = req.params.id
	phonebookModel
		.removePerson(id)
		.then((result) => {
			console.log({ result })
			res.status(204).end()
		})
		.catch((error) => {
			next(error)
		})
})

router.post('/', (req, res, next) => {
	const name = req.body.name
	const number = req.body.number

	phonebookModel
		.addPerson(name, number)
		.then((result) => {
			console.log({ result })
			res.json(result)
		})
		.catch((error) => {
			console.log({ error })
			next(error)
		})
})

router.put('/:id', (req, res, next) => {
	const id = req.params.id
	const number = req.body.number
	const name = req.body.name

	phonebookModel
		.updateInfo(id, { name: name, number: number })
		.then((result) => {
			console.log({ result })
			res.json(result)
		})
		.catch((error) => {
			next(error)
		})
})

export default router
