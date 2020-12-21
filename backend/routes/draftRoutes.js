import express from 'express'
const router = express.Router()
import {
	getDrafts,
	getDraftById,
	addDraft,
	updateDraft,
	deleteDraft,
} from '../controllers/draftController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getDrafts).post(protect, addDraft)
router
	.route('/:id')
	.get(getDraftById)
	.put(protect, updateDraft)
	.delete(protect, deleteDraft)

export default router
