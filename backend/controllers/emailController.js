import asyncHandler from 'express-async-handler'
import Email from '../models/emailModel.js'

// @desc        Fetch all emails
// @route       GET /api/emails
// @access      Private
const getEmails = asyncHandler(async (req, res) => {
	const emails = await Email.find({})
	res.json(emails)
})

// @desc        Fetch a single email
// @route       GET /api/emails/:id
// @access      Private
const getEmailById = asyncHandler(async (req, res) => {
	const email = await Email.findById(req.params.id)

	if (email) {
		res.json(email)
	} else {
		res.status(404)
		throw new Error('Email Not Found')
	}
})

// @desc       	Create an email
// @route       POST /api/emails
// @access      Public
const addEmail = asyncHandler(async (req, res) => {
	const { firstName, lastName, email } = req.body

	const signUp = await Email.create({
		firstName,
		lastName,
		email,
	})

	if (signUp) {
		res.status(201).json({
			_id: signUp._id,
			firstName: signUp.firstName,
			lastName: signUp.lastName,
			email: signUp.email,
		})
	} else {
		res.status(400)
		throw new Error('Invalid email data')
	}
})

export { getEmails, getEmailById, addEmail }
