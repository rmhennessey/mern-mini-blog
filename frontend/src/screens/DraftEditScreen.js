import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {
	listDraftDetails,
	resetDraftDetails,
	updateDraft,
	deleteDraft,
} from '../actions/draftActions'
import { createPost } from '../actions/postActions'

const DraftEditScreen = ({ match, history }) => {
	const draftId = match.params.id

	const [title, setTitle] = useState('')
	const [subtitle, setSubtitle] = useState('')
	const [body, setBody] = useState('')
	const [tags, setTags] = useState('')
	const [isPinned, setIsPinned] = useState(false)
	const [links, setLinks] = useState([{ linkTitle: '', link: '' }])

	const [switched, setSwitched] = useState(false)

	const dispatch = useDispatch()

	const draftDetails = useSelector((state) => state.draftDetails)
	const { loading, error, success, draft } = draftDetails

	const draftUpdate = useSelector((state) => state.draftUpdate)
	const { success: updateSuccess } = draftUpdate

	const postCreate = useSelector((state) => state.postCreate)
	const { success: postSuccess } = postCreate

	useEffect(() => {
		if (updateSuccess === true || postSuccess === true) {
			history.push('/drafts/all')
		}

		if (!success) {
			dispatch(listDraftDetails(match.params.id))
		} else {
			setTitle(draft.title)
			setSubtitle(draft.subtitle)
			setBody(draft.body)
			setTags(draft.tags)
			setLinks(draft.links)
		}
	}, [
		dispatch,
		history,
		match,
		updateSuccess,
		success,
		postSuccess,
		draftId,
		draft,
	])

	const backClickHandler = () => {
		dispatch(resetDraftDetails())
	}

	const submitHandler = (e) => {
		e.preventDefault()
		// DISPATCH UPDATE DRAFT ACTION
		dispatch(
			updateDraft({
				_id: draftId,
				title,
				subtitle,
				body,
				tags,
				links,
				isPinned,
			})
		)
	}

	const publishHandler = (e) => {
		e.preventDefault()
		// DISPATCH CREATE POST ACTION
		dispatch(createPost(title, subtitle, body, tags, links, isPinned))
		deleteDraftOnPublish()
	}

	function deleteDraftOnPublish() {
		dispatch(deleteDraft(draft._id))
	}

	const handleInputChange = (index, event) => {
		const values = [...links]
		if (event.target.name === 'linkTitle') {
			values[index].linkTitle = event.target.value
		} else {
			values[index].link = event.target.value
		}
		setLinks(values)
	}

	const handleAddFields = () => {
		const values = [...links]
		values.push({ linkTitle: '', link: '' })
		setLinks(values)
	}

	return (
		<div style={{ marginTop: '70px' }}>
			<Link
				to='/drafts/all'
				className='btn btn-light my-3'
				onClick={() => backClickHandler()}
			>
				Cancel Update
			</Link>
			<FormContainer>
				<h1>Update Draft</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message>{error}</Message>
				) : (
					<Form onSubmit={submitHandler} type='submit'>
						<Form.Check
							type='switch'
							id='publish-switch'
							label='Switch to Publish'
							style={{ marginBottom: '7px' }}
							value={switched}
							onChange={(e) => setSwitched(true)}
						/>
						<Form.Group controlId='formDraftTitle'>
							<Form.Label>Edit Title</Form.Label>
							<Form.Control
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								type='text'
								placeholder='Enter draft title'
							/>
						</Form.Group>

						<Form.Group controlId='formDraftSubtitle'>
							<Form.Label>Edit Subtitle</Form.Label>
							<Form.Control
								value={subtitle}
								onChange={(e) => setSubtitle(e.target.value)}
								type='text'
								placeholder='Enter subtitle'
							/>
						</Form.Group>

						<Form.Group controlId='formDraftBody'>
							<Form.Label>Body</Form.Label>
							<Form.Control
								as='textarea'
								rows={15}
								value={body}
								onChange={(e) => setBody(e.target.value)}
								type='text'
								placeholder='Enter draft body'
							/>
						</Form.Group>

						<Form.Group controlId='formDraftTags'>
							<Form.Label>Tags</Form.Label>
							<Form.Control
								value={tags}
								onChange={(e) => setTags(e.target.value)}
								type='text'
								placeholder='Enter draft tags'
							/>
						</Form.Group>

						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								flexWrap: 'wrap',
							}}
						>
							{links.map((link, index) => (
								<>
									<Form.Group controlId='formBlogTags' style={{ width: '45%' }}>
										<Form.Label>Link Title</Form.Label>
										<Form.Control
											type='text'
											name='linkTitle'
											value={link.linkTitle}
											// onChange={(e) => setLinks(e.target.value)}
											onChange={(event) => handleInputChange(index, event)}
											placeholder='Enter link title'
										/>
									</Form.Group>
									<Form.Group controlId='formBlogTags' style={{ width: '45%' }}>
										<Form.Label>Link</Form.Label>
										<Form.Control
											name='link'
											value={link.link}
											// onChange={(e) => setLinks(e.target.value)}
											onChange={(event) => handleInputChange(index, event)}
											type='text'
											placeholder='Enter link'
										/>
									</Form.Group>
								</>
							))}
							<div>
								<OverlayTrigger
									overlay={
										<Tooltip id='allposts' style={{ zIndex: '2000' }}>
											Add Link
										</Tooltip>
									}
									placement='top'
								>
									<Button
										onClick={() => handleAddFields()}
										variant='outline-dark'
										className='p-2'
										style={{
											border: 'none',
											height: '40px',
											marginTop: '7px',
										}}
									>
										<i className='fas fa-link'></i>
									</Button>
								</OverlayTrigger>
							</div>
						</div>

						{switched === false ? (
							<Button variant='primary' type='submit'>
								Update Draft
							</Button>
						) : (
							<Button variant='primary' type='submit' onClick={publishHandler}>
								Publish
							</Button>
						)}
					</Form>
				)}
			</FormContainer>
		</div>
	)
}

export default DraftEditScreen
