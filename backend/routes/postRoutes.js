import express from 'express'
const router = express.Router()
import {
	getPosts,
	getPostById,
	getPostBySlug,
	addPost,
	updatePost,
	deletePost,
} from '../controllers/postController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getPosts).post(protect, addPost)
router
	.route('/:id')
	.get(getPostById)
	.put(protect, updatePost)
	.delete(protect, deletePost)
router.route('/slug/:slug').get(getPostBySlug)

export default router
