import asyncHandler from 'express-async-handler'
import Nugget from '../models/nuggetModel.js'

// @desc        Fetch all nuggets
// @route       GET /api/nuggets
// @access      Private
const getNuggets = asyncHandler(async (req, res) => {
	const nuggets = await Nugget.find({})
	res.json(nuggets)
})

// @desc        Fetch a single nugget
// @route       GET /api/nuggets/:id
// @access      Private
const getNuggetById = asyncHandler(async (req, res) => {
	const nugget = await Nugget.findById(req.params.id)

	if (nugget) {
		res.json(nugget)
	} else {
		res.status(404)
		throw new Error('Nugget Not Found')
	}
})

// @desc       	Create a nugget
// @route       POST /api/nuggets
// @access      Private/Admin
const addNugget = asyncHandler(async (req, res) => {
	const { user = req.user._id, title, episode, tags } = req.body

	const nugget = await Nugget.create({
		user,
		title,
		episode,
		tags,
	})

	if (nugget) {
		res.status(201).json({
			_id: nugget._id,
			title: nugget.title,
			episode: nugget.episode,
			tags: nugget.tags,
		})
	} else {
		res.status(400)
		throw new Error('Invalid nugget data')
	}
})

// @desc       	Update a nugget
// @route       PUT /api/nuggets/:id
// @access      Private/Admin
const updateNugget = asyncHandler(async (req, res) => {
	const { title, episode, tags } = req.body

	const nugget = await Nugget.findById(req.params.id)

	if (!nugget) {
		res.status(401)
		throw new Error('Nugget not found')
	} else if (nugget) {
		nugget.title = title
		nugget.episode = episode
		nugget.tags = tags

		const updatedNugget = await nugget.save()
		res.status(201).json(updatedNugget)
	} else {
		res.status(404)
		throw new Error('Nugget not updated')
	}
})

// @desc       	Delete single nugget
// @route       DELETE /api/nugget/:id
// @access      Private/Admin
const deleteNugget = asyncHandler(async (req, res) => {
	const nugget = await Nugget.findById(req.params.id)

	if (nugget) {
		// any admin can create or delete
		await nugget.remove()
		res.json({ message: 'Nugget Removed' })
	} else {
		res.status(404)
		throw new Error('Nugget not found')
	}
})

export { getNuggets, getNuggetById, addNugget, updateNugget, deleteNugget }
