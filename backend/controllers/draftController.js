import asyncHandler from 'express-async-handler'
import Draft from '../models/draftModel.js'

// @desc        Fetch all drafts
// @route       GET /api/drafts
// @access      Public
const getDrafts = asyncHandler(async (req, res) => {
	const drafts = await Draft.find({})
	res.json(drafts)
})

// @desc        Fetch a single draft
// @route       GET /api/drafts/:id
// @access      Public
const getDraftById = asyncHandler(async (req, res) => {
	const draft = await Draft.findById(req.params.id)

	if (draft) {
		res.json(draft)
	} else {
		res.status(404)
		throw new Error('Draft Not Found')
	}
})

// @desc       	Create a draft
// @route       POST /api/drafts
// @access      Private/Admin
const addDraft = asyncHandler(async (req, res) => {
	const { user = req.user._id, title, subtitle, body, tags, links } = req.body

	const draft = await Draft.create({
		user,
		title,
		subtitle,
		body,
		tags,
		links,
	})

	if (draft) {
		res.status(201).json({
			_id: draft._id,
			title: draft.title,
			subtitle: draft.subtitle,
			body: draft.body,
			tags: draft.tags,
			links: draft.links,
		})
	} else {
		res.status(400)
		throw new Error('Invalid draft data')
	}
})

// @desc       	Update a draft
// @route       PUT /api/drafts/:id
// @access      Private/Admin
const updateDraft = asyncHandler(async (req, res) => {
	const { title, subtitle, body, tags, links } = req.body

	const draft = await Draft.findById(req.params.id)

	if (!draft) {
		res.status(401)
		throw new Error('Draft not found')
	} else if (draft) {
		draft.title = title
		draft.subtitle = subtitle
		draft.body = body
		draft.tags = tags
		draft.links = links

		const updatedDraft = await draft.save()
		res.status(201).json(updatedDraft)
	} else {
		res.status(404)
		throw new Error('Draft not updated')
	}
})

// @desc       	Delete a draft
// @route       DELETE /api/draft/:id
// @access      Private/Admin
const deleteDraft = asyncHandler(async (req, res) => {
	const draft = await Draft.findById(req.params.id)

	if (draft) {
		// any admin can create or delete
		await draft.remove()
		res.json({ message: 'Draft Removed' })
	} else {
		res.status(404)
		throw new Error('Draft not found')
	}
})

export { getDrafts, getDraftById, addDraft, updateDraft, deleteDraft }
