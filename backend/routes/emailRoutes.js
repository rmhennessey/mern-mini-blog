import express from 'express'
const router = express.Router()
import asyncHandler from 'express-async-handler'
import {
	getEmails,
	getEmailById,
	addEmail,
} from '../controllers/emailController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getEmails).post(addEmail)
router.route('/:id').get(protect, getEmailById)

export default router
