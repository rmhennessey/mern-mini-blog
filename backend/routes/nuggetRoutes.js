import express from 'express'
const router = express.Router()
import asyncHandler from 'express-async-handler'
import {
	getNuggets,
	getNuggetById,
	addNugget,
	updateNugget,
	deleteNugget,
} from '../controllers/nuggetController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getNuggets).post(protect, addNugget)
router
	.route('/:id')
	.get(protect, getNuggetById)
	.put(protect, updateNugget)
	.delete(protect, deleteNugget)

export default router
