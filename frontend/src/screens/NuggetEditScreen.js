import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {
	listNuggetDetails,
	resetNuggetDetails,
	updateNugget,
} from '../actions/nuggetActions'

const NuggetEditScreen = ({ match, history }) => {
	const nuggetId = match.params.id

	const [title, setTitle] = useState('')
	const [episode, setEpisode] = useState('')
	const [tags, setTags] = useState('')

	const dispatch = useDispatch()

	const nuggetDetails = useSelector((state) => state.nuggetDetails)
	const { loading, error, success, nugget } = nuggetDetails

	const nuggetUpdate = useSelector((state) => state.nuggetUpdate)
	const { success: updateSuccess } = nuggetUpdate

	useEffect(() => {
		if (updateSuccess === true) {
			history.push('/nuggets/all')
		}

		if (!success) {
			dispatch(listNuggetDetails(match.params.id))
		} else {
			setTitle(nugget.title)
			setEpisode(nugget.episode)
			setTags(nugget.tags)
		}
	}, [dispatch, history, match, updateSuccess, success, nuggetId, nugget])

	const backClickHandler = () => {
		dispatch(resetNuggetDetails())
	}

	const submitHandler = (e) => {
		e.preventDefault()
		// DISPATCH UPDATE IDEA ACTION
		dispatch(updateNugget({ _id: nuggetId, title, episode, tags }))
	}

	return (
		<div style={{ marginTop: '70px' }}>
			<Link
				to='/nuggets/all'
				className='btn btn-light my-3'
				onClick={() => backClickHandler()}
			>
				Cancel Update
			</Link>
			<FormContainer>
				<h1>Update Nugget</h1>
				{/* {updateLoading && <Loader />}
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
							<Form.Label>Edit Episode</Form.Label>
							<Form.Control
								value={episode}
								onChange={(e) => setEpisode(e.target.value)}
								type='text'
								placeholder='Enter nugget episode'
							/>
						</Form.Group>

						<Form.Group controlId='formIdeaTags'>
							<Form.Label>Edit Tags</Form.Label>
							<Form.Control
								value={tags}
								onChange={(e) => setTags(e.target.value)}
								type='text'
								placeholder='Enter nugget tags'
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

export default NuggetEditScreen
