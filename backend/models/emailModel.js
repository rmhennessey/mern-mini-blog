import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const emailSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
)

const Email = mongoose.model('Email', emailSchema)

export default Email
