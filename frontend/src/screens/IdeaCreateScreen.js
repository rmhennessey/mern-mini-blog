import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import { login } from '../actions/userActions'
import { createIdea } from '../actions/ideaActions'

const CreateIdeaScreen = ({ history }) => {
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [tags, setTags] = useState('')

	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const ideaCreate = useSelector((state) => state.ideaCreate)
	const { success } = ideaCreate

	useEffect(() => {
		if (!userInfo || success) {
			history.push('/ideas/all')
		}
	}, [history, userInfo, success])

	const submitHandler = (e) => {
		e.preventDefault()
		// DISPATCH CREATE IDEA ACTION
		dispatch(createIdea(title, body, tags))
	}

	return (
		<div style={{ marginTop: '70px' }}>
			{/* ADD CANCEL BUTTON */}
			<h1>Add New Idea</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='formIdeaTitle'>
					<Form.Label>Title</Form.Label>
					<Form.Control
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						type='text'
						placeholder='Enter idea title'
					/>
				</Form.Group>

				<Form.Group controlId='formIdeaBody'>
					<Form.Label>Body</Form.Label>
					<Form.Control
						value={body}
						onChange={(e) => setBody(e.target.value)}
						type='text'
						placeholder='Enter idea body'
					/>
				</Form.Group>

				<Form.Group controlId='formIdeaTags'>
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

export default CreateIdeaScreen
