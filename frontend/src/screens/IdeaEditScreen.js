import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {
	listIdeaDetails,
	resetIdeaDetails,
	updateIdea,
} from '../actions/ideaActions'

const IdeaEditScreen = ({ match, history }) => {
	const ideaId = match.params.id

	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [tags, setTags] = useState('')

	const dispatch = useDispatch()

	const ideaDetails = useSelector((state) => state.ideaDetails)
	const { loading, error, success, idea } = ideaDetails

	const ideaUpdate = useSelector((state) => state.ideaUpdate)
	const { success: updateSuccess } = ideaUpdate

	useEffect(() => {
		if (updateSuccess === true) {
			history.push('/ideas/all')
		}

		if (!success) {
			dispatch(listIdeaDetails(match.params.id))
		} else {
			setTitle(idea.title)
			setBody(idea.body)
			setTags(idea.tags)
		}
	}, [dispatch, history, match, updateSuccess, success, ideaId, idea])

	const backClickHandler = () => {
		dispatch(resetIdeaDetails())
	}

	const submitHandler = (e) => {
		e.preventDefault()
		// DISPATCH UPDATE IDEA ACTION
		dispatch(updateIdea({ _id: ideaId, title, body, tags }))
	}

	return (
		<div style={{ marginTop: '70px' }}>
			<Link
				to='/ideas/all'
				className='btn btn-light my-3'
				onClick={() => backClickHandler()}
			>
				Cancel Update
			</Link>
			<FormContainer>
				<h1>Update Idea</h1>
				{/* {userLoading && <Loader />}
				{userError && <Message>{userError}</Message>}
				{updateLoading && <Loader />}
				{updateError && <Message>{updateError}</Message>} */}
				{/* {userLoading && <Loader />}
				{userError && <Message>{userError}</Message>} */}
				{/* {allIdeasLoading && <Loader />}
				{allIdeasError && <Message>{allIdeasError}</Message>} */}
				{loading ? (
					<Loader />
				) : error ? (
					<Message>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='formIdeaTitle'>
							<Form.Label>Edit Title</Form.Label>
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
				)}
			</FormContainer>
		</div>
	)
}

export default IdeaEditScreen
