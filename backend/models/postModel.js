import mongoose from 'mongoose'
import slugify from 'slugify'
const Schema = mongoose.Schema

// const linkSchema = mongoose.Schema({
// 	linkTitle: {
// 		type: String,
// 	},
// 	link: {
// 		type: String,
// 	},
// 	post: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		required: true,
// 		ref: 'Post',
// 	},
// })

const postSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		title: {
			type: String,
			required: true,
			unique: true,
		},
		slug: String,
		subtitle: {
			type: String,
		},
		body: {
			type: String,
			required: true,
		},
		tags: {
			type: [String],
			required: true,
		},
		isPinned: false,
		links: [
			{
				linkTitle: { type: String },
				link: { type: String },
			},
		],
	},
	{
		timestamps: true,
	}
)

postSchema.pre('save', function (next) {
	this.slug = slugify(this.title, {
		lower: true,
		remove: /[*+~.()'"!:@]/g,
	})
	next()
})

const Post = mongoose.model('Post', postSchema)

export default Post
