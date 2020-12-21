import express from 'express'
const router = express.Router()
import asyncHandler from 'express-async-handler'
import {
	getIdeas,
	getIdeaById,
	addIdea,
	updateIdea,
	deleteIdea,
} from '../controllers/ideaController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getIdeas).post(protect, addIdea)
router
	.route('/:id')
	.get(protect, getIdeaById)
	.put(updateIdea)
	.delete(protect, deleteIdea)

export default router
