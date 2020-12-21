import express from 'express'
const router = express.Router()
import asyncHandler from 'express-async-handler'
import {
	authUser,
	registerUser,
	getUserProfile,
	getAllUsers,
	getUserById,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(getAllUsers)
router.route('/profile').get(protect, getUserProfile)
router.route('/:id').get(protect, getUserById)
router.post('/login', authUser)

export default router
