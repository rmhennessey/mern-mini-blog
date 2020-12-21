import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import postRoutes from './routes/postRoutes.js'
import draftRoutes from './routes/draftRoutes.js'
import ideaRoutes from './routes/ideaRoutes.js'
import nuggetRoutes from './routes/nuggetRoutes.js'
import emailRoutes from './routes/emailRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/posts', postRoutes)
app.use('/api/drafts', draftRoutes)
app.use('/api/ideas', ideaRoutes)
app.use('/api/nuggets', nuggetRoutes)
app.use('/api/emails', emailRoutes)
app.use('/api/users', userRoutes)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')))

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	)
} else {
	app.get('/', (req, res) => {
		res.send('Welcome to the jungle...')
	})
}

//Middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Welcome to the [${process.env.NODE_ENV}] Jungle on port ${PORT}`.yellow
			.bold
	)
)
