import asyncHandler from 'express-async-handler'
import Idea from '../models/ideaModel.js'

// @desc        Fetch all ideas
// @route       GET /api/ideas
// @access      Private
const getIdeas = asyncHandler(async (req, res) => {
	const ideas = await Idea.find({})
	res.json(ideas)
})

// @desc        Fetch a single idea
// @route       GET /api/ideas/:id
// @access      Private
const getIdeaById = asyncHandler(async (req, res) => {
	const idea = await Idea.findById(req.params.id)

	if (idea) {
		res.json(idea)
	} else {
		res.status(404)
		throw new Error('Idea Not Found')
	}
})

// @desc       	Create an idea
// @route       POST /api/ideas
// @access      Private/Admin
const addIdea = asyncHandler(async (req, res) => {
	const { user = req.user._id, title, body, tags } = req.body

	const idea = await Idea.create({
		user,
		title,
		body,
		tags,
	})

	if (idea) {
		res.status(201).json({
			_id: idea._id,
			title: idea.title,
			body: idea.body,
			tags: idea.tags,
		})
	} else {
		res.status(400)
		throw new Error('Invalid idea data')
	}
})

// @desc       	Update a idea
// @route       PUT /api/ideas/:id
// @access      Private/Admin
const updateIdea = asyncHandler(async (req, res) => {
	const { title, body, tags } = req.body

	const idea = await Idea.findById(req.params.id)

	if (!idea) {
		res.status(401)
		throw new Error('Idea not found')
	} else if (idea) {
		idea.title = title
		idea.body = body
		idea.tags = tags

		const updatedIdea = await idea.save()
		res.status(201).json(updatedIdea)
	} else {
		res.status(404)
		throw new Error('Idea not updated')
	}
})

// @desc       	Delete single idea
// @route       DELETE /api/ideas/:id
// @access      Private/Admin
const deleteIdea = asyncHandler(async (req, res) => {
	const idea = await Idea.findById(req.params.id)

	if (idea) {
		// any admin can create or delete
		await idea.remove()
		res.json({ message: 'Idea Removed' })
	} else {
		res.status(404)
		throw new Error('Idea not found')
	}
})

export { getIdeas, getIdeaById, addIdea, updateIdea, deleteIdea }
