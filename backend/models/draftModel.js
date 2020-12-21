import mongoose from 'mongoose'
import slugify from 'slugify'
const Schema = mongoose.Schema

const draftSchema = new Schema(
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

draftSchema.pre('save', function (next) {
	this.slug = slugify(this.title, { lower: true })
	next()
})

const Draft = mongoose.model('Draft', draftSchema)

export default Draft
