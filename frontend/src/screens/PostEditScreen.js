import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {
	listPostDetails,
	resetPostDetails,
	updatePost,
} from '../actions/postActions'

const PostEditScreen = ({ match, history }) => {
	const postId = match.params.id

	const [title, setTitle] = useState('')
	const [subtitle, setSubtitle] = useState('')
	const [body, setBody] = useState('')
	const [tags, setTags] = useState('')
	const [isPinned, setIsPinned] = useState('')
	const [links, setLinks] = useState([{ linkTitle: '', link: '' }])

	const dispatch = useDispatch()

	const postDetails = useSelector((state) => state.postDetails)
	const { loading, error, success, post } = postDetails

	const postUpdate = useSelector((state) => state.postUpdate)
	const { success: updateSuccess } = postUpdate

	useEffect(() => {
		if (updateSuccess === true) {
			history.push('/posts/all')
		}

		if (!success) {
			dispatch(listPostDetails(match.params.id))
		} else {
			setTitle(post.title)
			setSubtitle(post.subtitle)
			setBody(post.body)
			setTags(post.tags)
			setLinks(post.links)
			setIsPinned(post.isPinned)
		}
	}, [dispatch, history, match, updateSuccess, success, postId, post])

	const backClickHandler = () => {
		dispatch(resetPostDetails())
	}

	const submitHandler = (e) => {
		e.preventDefault()
		// DISPATCH UPDATE IDEA ACTION
		dispatch(
			updatePost({ _id: postId, title, subtitle, body, tags, links, isPinned })
		)
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
		<>
			<div style={{ marginTop: '70px' }}>
				{loading ? (
					<Loader />
				) : error ? (
					<Message>{error}</Message>
				) : success ? (
					<>
						<Link
							to='/posts/all'
							className='btn btn-light my-3'
							onClick={() => backClickHandler()}
						>
							Cancel Update
						</Link>
						<FormContainer>
							<h1>Update Post</h1>
							<Form onSubmit={submitHandler}>
								<>
									{post.isPinned === false ? (
										<Form.Check
											type='switch'
											id='pinned-switch'
											label='Pin Post'
											style={{ marginBottom: '7px' }}
											value={isPinned}
											onChange={(e) => setIsPinned(true)}
										/>
									) : (
										<Form.Check
											type='switch'
											id='pinned-switch'
											label='UnPin Post'
											style={{ marginBottom: '7px' }}
											value={isPinned}
											onChange={(e) => setIsPinned(false)}
										/>
									)}
								</>

								<Form.Group controlId='formPostTitle'>
									<Form.Label>Edit Title</Form.Label>
									<Form.Control
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										type='text'
										placeholder='Enter idea title'
									/>
								</Form.Group>

								<Form.Group controlId='formPostSubtitle'>
									<Form.Label>Edit Subtitle</Form.Label>
									<Form.Control
										value={subtitle}
										onChange={(e) => setSubtitle(e.target.value)}
										type='text'
										placeholder='Enter subtitle'
									/>
								</Form.Group>

								<Form.Group controlId='formPostBody'>
									<Form.Label>Body</Form.Label>
									<Form.Control
										as='textarea'
										rows={15}
										value={body}
										onChange={(e) => setBody(e.target.value)}
										type='text'
										placeholder='Enter post body'
									/>
								</Form.Group>

								<Form.Group controlId='formPostTags'>
									<Form.Label>Tags</Form.Label>
									<Form.Control
										value={tags}
										onChange={(e) => setTags(e.target.value)}
										type='text'
										placeholder='Enter post tags'
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
											<Form.Group
												controlId='formBlogTags'
												style={{ width: '45%' }}
											>
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
											<Form.Group
												controlId='formBlogTags'
												style={{ width: '45%' }}
											>
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

								<Button variant='primary' type='submit'>
									Update
								</Button>
							</Form>
						</FormContainer>
					</>
				) : (
					''
				)}
			</div>
		</>
	)
}

export default PostEditScreen
