import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ideaSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		tags: {
			type: [String],
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

const Idea = mongoose.model('Idea', ideaSchema)

export default Idea
