import mongoose from 'mongoose'
const Schema = mongoose.Schema

const nuggetSchema = new Schema(
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
		episode: {
			type: String,
		},
		tags: {
			type: [String],
		},
	},
	{
		timestamps: true,
	}
)

const Nugget = mongoose.model('Nugget', nuggetSchema)

export default Nugget
