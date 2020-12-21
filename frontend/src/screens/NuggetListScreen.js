import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
// import Paginate from '../components/Paginate.js'
import {
	listNuggets,
	deleteNugget,
	resetNuggetDetails,
} from '../actions/nuggetActions'
import {
	NUGGET_CREATE_RESET,
	NUGGET_UPDATE_RESET,
} from '../constants/nuggetConstants'

const NuggetListScreen = ({ history }) => {
	// const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()

	const nuggetList = useSelector((state) => state.nuggetList)
	const { loading, error, nuggets } = nuggetList

	const nuggetDelete = useSelector((state) => state.nuggetDelete)
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = nuggetDelete

	const nuggetCreate = useSelector((state) => state.nuggetCreate)
	const { success: successCreate } = nuggetCreate

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		dispatch({ type: NUGGET_CREATE_RESET })
		dispatch({ type: NUGGET_UPDATE_RESET })
		dispatch(resetNuggetDetails())
		// dispatch(listIdeas())

		if (!userInfo) {
			history.push('/')
		}
		if (successCreate) {
			history.push(`/nuggets/all`)
		} else {
			dispatch(listNuggets())
		}
	}, [
		dispatch,
		history,
		userInfo,
		successDelete,
		successCreate,
		// createdProduct,
		// pageNumber,
	])

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure you want to delete this nugget?')) {
			dispatch(deleteNugget(id))
		}
	}

	// const createProductHandler = () => {
	// 	dispatch(createProduct())
	// }

	return (
		<div style={{ marginTop: '70px' }}>
			<Row className='align-items-center'>
				<Col>
					<h1>Nuggets</h1>
				</Col>
				<Col className='text-right'>
					<Link className='btn btn-light my-3' to='/nuggets/create'>
						<i className='fas fa-plus'></i> Create Nugget
					</Link>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>Title</th>
								<th>Episode</th>
								<th>Tags</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{nuggets.map((nugget) => (
								<tr key={nugget._id}>
									<td>{nugget.title}</td>
									<td>{nugget.episode}</td>
									<td>{nugget.tags}</td>
									<td>
										<LinkContainer
											to={`/nuggets/${nugget._id}/edit`}
											style={{ marginRight: '10px' }}
										>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => deleteHandler(nugget._id)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</td>
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

export default NuggetListScreen
