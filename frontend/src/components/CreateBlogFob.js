import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	Button,
	Modal,
	OverlayTrigger,
	Tooltip,
	Form,
	Col,
} from 'react-bootstrap'
import { createEmail } from '../actions/emailActions'

const CreateBlogFob = () => {
	// Create Email
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')

	// Modal
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const emailCreate = useSelector((state) => state.emailCreate)
	const { success } = emailCreate

	const submitHandler = (e) => {
		e.preventDefault()
		// DISPATCH CREATE Email ACTION
		dispatch(createEmail(firstName, lastName, email))
		handleClose()
	}

	const createSignUp = (e) => {
		dispatch(createEmail(firstName, lastName, email))
		handleClose()
	}

	return (
		<>
			{success ? (
				''
			) : !userInfo ? (
				<>
					<Link
						to=''
						variant='primary'
						onClick={handleShow}
						className='bottomRight'
					>
						<OverlayTrigger
							overlay={
								<Tooltip id='allposts' style={{ zIndex: '2000' }}>
									Join the Community
								</Tooltip>
							}
							placement='left'
						>
							<i className='far fa-envelope fa-3x'></i>
						</OverlayTrigger>
					</Link>

					<Modal
						show={show}
						onHide={handleClose}
						backdrop='static'
						keyboard={false}
						style={{ marginTop: '14.5%' }}
					>
						<Modal.Header closeButton>
							<Modal.Title>🍄 Sign Up</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							Join the Religion of Rogan congretation for no bull-💩 content
						</Modal.Body>
						<Form onSubmit={submitHandler} type='submit'>
							<Form.Group
								controlId='formEmailName'
								style={{ width: '90%', margin: 'auto', marginBottom: '13px' }}
							>
								<Form.Row>
									<Col>
										<Form.Label>First Name</Form.Label>
										<Form.Control
											placeholder='First name'
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
											type='text'
										/>
									</Col>
									<Col>
										<Form.Label>Last Name</Form.Label>
										<Form.Control
											placeholder='Last name'
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
											type='text'
										/>
									</Col>
								</Form.Row>
							</Form.Group>
							<Form.Group
								controlId='formEmailEntry'
								style={{ width: '90%', margin: 'auto' }}
							>
								<Form.Label>Email address*</Form.Label>
								<Form.Control
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									type='email'
									placeholder='Enter email'
								/>
								<Form.Text className='text-muted'>
									We'll never share your email with anyone else.
								</Form.Text>
								<Form.Text className='text-muted'>*Required</Form.Text>
							</Form.Group>
						</Form>
						<Modal.Footer>
							<Button variant='secondary' onClick={handleClose}>
								No Thanks
							</Button>
							<Button
								onClick={() => createSignUp()}
								variant='primary'
								type='submit'
							>
								Sign Me Up
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			) : (
				<Link to='/posts/create' className='bottomRight'>
					<i className='fas fa-plus-circle fa-3x'></i>
				</Link>
			)}
		</>
	)
}

export default CreateBlogFob
