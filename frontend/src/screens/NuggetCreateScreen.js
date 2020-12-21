import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { createNugget } from '../actions/nuggetActions'

const NuggetCreateScreen = ({ history }) => {
	const [title, setTitle] = useState('')
	const [episode, setEpisode] = useState('')
	const [tags, setTags] = useState('')

	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin

	const nuggetCreate = useSelector((state) => state.nuggetCreate)
	const { success } = nuggetCreate

	useEffect(() => {
		if (!userInfo) {
			history.push('/')
		}
		if (success) {
			history.push('/nuggets/all')
		}
	}, [history, userInfo, success])

	const submitHandler = (e) => {
		e.preventDefault()
		// DISPATCH CREATE POST ACTION
		dispatch(createNugget(title, episode, tags))
	}

	return (
		<div style={{ marginTop: '70px' }}>
			{/* ADD CANCEL BUTTON */}
			{loading && <Loader />}
			{error && <Message />}
			<h1>Add New Nugget</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='formNuggetTitle'>
					<Form.Label>Title</Form.Label>
					<Form.Control
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						type='text'
						placeholder='Enter nugget'
					/>
				</Form.Group>

				<Form.Group controlId='formIdeaBody'>
					<Form.Label>Episode</Form.Label>
					<Form.Control
						value={episode}
						onChange={(e) => setEpisode(e.target.value)}
						type='text'
						placeholder='Enter episode'
					/>
				</Form.Group>

				<Form.Group controlId='formNuggetTags'>
					<Form.Label>Tags</Form.Label>
					<Form.Control
						value={tags}
						onChange={(e) => setTags(e.target.value)}
						type='text'
						placeholder='Enter idea tags'
					/>
				</Form.Group>

				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
		</div>
	)
}

export default NuggetCreateScreen
