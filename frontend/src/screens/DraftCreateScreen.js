import React, { useState, useEffect } from 'react'
import { Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createDraft } from '../actions/draftActions'

const DraftCreateScreen = ({ history }) => {
	const [title, setTitle] = useState('')
	const [subtitle, setSubtitle] = useState('')
	const [body, setBody] = useState('')
	const [tags, setTags] = useState('')
	const [isPinned, setIsPinned] = useState(false)
	const [links, setLinks] = useState([{ linkTitle: '', link: '' }])

	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const draftCreate = useSelector((state) => state.draftCreate)
	const { success } = draftCreate

	useEffect(() => {
		if (!userInfo || success) {
			history.push('/drafts/all')
		}
	}, [history, userInfo, success])

	const submitHandler = (e) => {
		e.preventDefault()
		// DISPATCH CREATE POST ACTION
		dispatch(createDraft(title, subtitle, body, tags, links, isPinned))
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
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='formBlogTitle'>
					<Form.Label>Title</Form.Label>
					<Form.Control
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						type='text'
						placeholder='Enter blog title'
					/>
				</Form.Group>
				<Form.Group controlId='formBlogSubtitle'>
					<Form.Label>Subtitle</Form.Label>
					<Form.Control
						value={subtitle}
						onChange={(e) => setSubtitle(e.target.value)}
						type='text'
						placeholder='Enter blog subtitle'
					/>
				</Form.Group>

				<Form.Group controlId='formBlogBody'>
					<Form.Label>Body</Form.Label>
					<Form.Control
						as='textarea'
						rows={15}
						value={body}
						onChange={(e) => setBody(e.target.value)}
						type='text'
						placeholder='Enter blog body'
					/>
				</Form.Group>

				<Form.Group controlId='formBlogTags'>
					<Form.Label>Tags</Form.Label>
					<Form.Control
						value={tags}
						onChange={(e) => setTags(e.target.value)}
						type='text'
						placeholder='Enter blog tags'
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

				<Button variant='primary' type='submit'>
					Save Draft
				</Button>
			</Form>
		</div>
	)
}

export default DraftCreateScreen
