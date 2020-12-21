import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			// split token at the space, so Bearer is at position 0, token at 1
			token = req.headers.authorization.split(' ')[1]

			// decoded gives us the user's id which we will use to find
			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			// again, we can find the user from jwt decoded id
			req.user = await User.findById(decoded.id).select('-password')

			next()
		} catch (error) {
			console.error(error)
			res.status(401)
			throw new Error('Not authorized. Token failed')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not authorized. No Token.')
	}
})

const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next()
	} else {
		res.status(401)
		throw new Error('Not authorized as admin')
	}
}

export { protect, admin }
