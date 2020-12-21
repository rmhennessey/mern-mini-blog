import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'

// @desc        Fetch all posts
// @route       GET /api/posts
// @access      Public
const getPosts = asyncHandler(async (req, res) => {
	// adding pagination for products
	const pageSize = 7 // 👈 this sets the number of items per page
	const page = Number(req.query.pageNumber) || 1

	// req.query allows you to search after ? in route
	const keyword = req.query.keyword
		? {
				body: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {}

	const tag = req.query.tag
		? {
				tags: {
					$regex: req.query.tag,
					$options: 'i',
				},
		  }
		: {}

	const count = await Post.countDocuments({ ...keyword, ...tag })

	// I want to return the newest posts first
	const posts = await Post.find({ ...keyword, ...tag })
		.sort({ createdAt: -1 })
		.limit(pageSize)
		.skip(pageSize * (page - 1))

	res.json({ posts, page, pages: Math.ceil(count / pageSize) })
})

// @desc        Fetch a single session
// @route       GET /api/posts/:id
// @access      Public
const getPostById = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id)

	if (post) {
		res.json(post)
	} else {
		res.status(404)
		throw new Error('Post Not Found')
	}
})

const getPostBySlug = asyncHandler(async (req, res) => {
	const post = await Post.find({ slug: req.params.slug })

	if (post) {
		res.json(post)
	} else {
		res.status(404)
		throw new Error('Post Not Found')
	}
})

// @desc       	Create a post
// @route       POST /api/posts
// @access      Private/Admin
const addPost = asyncHandler(async (req, res) => {
	const {
		user = req.user._id,
		title,
		subtitle,
		body,
		tags,
		links,
		isPinned,
		// linkTitle,
		// link,
	} = req.body

	const post = await Post.create({
		user,
		title,
		subtitle,
		body,
		tags,
		links,
		isPinned,
		// linkTitle,
		// link,
	})

	if (post) {
		res.status(201).json({
			_id: post._id,
			title: post.title,
			subtitle: post.subtitle,
			body: post.body,
			tags: post.tags,
			links: post.links,
			isPinned: post.isPinned,
			// linkTitle: post.linkTitle,
			// link: post.link,
		})
	} else {
		res.status(400)
		throw new Error('Invalid post data')
	}
})

// @desc       	Update a post
// @route       PUT /api/posts/:id
// @access      Private/Admin
const updatePost = asyncHandler(async (req, res) => {
	const { title, subtitle, body, tags, linkTitle, link, isPinned } = req.body

	const post = await Post.findById(req.params.id)

	if (!post) {
		res.status(401)
		throw new Error('Post not found')
	} else if (post) {
		post.title = title
		post.subtitle = subtitle
		post.body = body
		post.tags = tags
		post.linkTitle = linkTitle
		post.link = link
		post.isPinned = isPinned
		// post.linkTitle = linkTitle
		// post.link = link

		const updatedPost = await post.save()
		res.status(201).json(updatedPost)
	} else {
		res.status(404)
		throw new Error('Post not updated')
	}
})

// @desc       	Delete a post
// @route       DELETE /api/post/:id
// @access      Private/Admin
const deletePost = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id)

	if (post) {
		// any admin can create or delete
		await post.remove()
		res.json({ message: 'Post Removed' })
	} else {
		res.status(404)
		throw new Error('Post not found')
	}
})

export { getPosts, getPostById, getPostBySlug, addPost, updatePost, deletePost }
