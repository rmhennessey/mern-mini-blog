import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
	const [name, setName] = useState('')
	// const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		if (userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	const submitHandler = (e) => {
		e.preventDefault()
		// DISPATCH LOGIN
		dispatch(login(name, password))
	}

	return (
		<div style={{ marginTop: '70px' }}>
			<FormContainer>
				<h4 style={{ textAlign: 'center' }}>
					Write Like a Motherf🦁cker Today
				</h4>
				{error && <Message>{error}</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='username' style={{ marginTop: '15px' }}>
						<Form.Control
							type='text'
							placeholder='Enter username'
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='password'>
						<Form.Control
							type='password'
							placeholder='Enter password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Button type='submit' variant='primary'>
						Get to Work
					</Button>
				</Form>
			</FormContainer>
		</div>
	)
}

export default LoginScreen
