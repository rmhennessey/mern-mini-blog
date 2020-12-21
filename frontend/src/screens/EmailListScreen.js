import React, { useEffect } from 'react'
import { Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
// import Paginate from '../components/Paginate.js'
import { listEmails } from '../actions/emailActions'

const EmailListScreen = ({ history }) => {
	// const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()

	const emailList = useSelector((state) => state.emailList)
	const { loading, error, emails } = emailList

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		if (!userInfo) {
			history.push('/')
		} else {
			dispatch(listEmails())
		}
	}, [dispatch, history, userInfo])

	return (
		<div style={{ marginTop: '70px' }}>
			<Row className='align-items-center'>
				<Col>
					<h1>Email List</h1>
				</Col>
			</Row>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							{emails.map((email) => (
								<tr key={email._id}>
									<td>{email.firstName}</td>
									<td>{email.lastName}</td>
									<td>{email.email}</td>
								</tr>
							))}
						</tbody>
					</Table>
					{/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
				</>
			)}
		</div>
	)
}

export default EmailListScreen
