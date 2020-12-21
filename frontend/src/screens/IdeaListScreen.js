import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
// import Paginate from '../components/Paginate.js'
import { listIdeas, deleteIdea, resetIdeaDetails } from '../actions/ideaActions'
import {
	IDEA_CREATE_RESET,
	IDEA_UPDATE_RESET,
} from '../constants/ideaConstants'

const IdeaListScreen = ({ history }) => {
	// const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()

	const ideaList = useSelector((state) => state.ideaList)
	const { loading, error, ideas } = ideaList

	const ideaDelete = useSelector((state) => state.ideaDelete)
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = ideaDelete

	const ideaCreate = useSelector((state) => state.ideaCreate)
	const { success: successCreate } = ideaCreate

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		dispatch({ type: IDEA_CREATE_RESET })
		dispatch({ type: IDEA_UPDATE_RESET })
		dispatch(resetIdeaDetails())
		// dispatch(listIdeas())

		if (!userInfo) {
			history.push('/')
		}
		if (successCreate) {
			history.push(`/ideas/all`)
		} else {
			dispatch(listIdeas())
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
		if (window.confirm('Are you sure you want to delete this idea?')) {
			dispatch(deleteIdea(id))
		}
	}

	// const createProductHandler = () => {
	// 	dispatch(createProduct())
	// }

	return (
		<div style={{ marginTop: '70px' }}>
			<Row className='align-items-center'>
				<Col>
					<h1>Ideas</h1>
				</Col>
				<Col className='text-right'>
					<Link className='btn btn-light my-3' to='/ideas/create'>
						<i className='fas fa-plus'></i> Create Idea
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
								<th>Body</th>
								<th>Tags</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{ideas.map((idea) => (
								<tr key={idea._id}>
									<td>{idea.title}</td>
									<td>{idea.body}</td>
									<td>{idea.tags}</td>
									<td>
										<LinkContainer
											to={`/ideas/${idea._id}/edit`}
											style={{ marginRight: '10px' }}
										>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => deleteHandler(idea._id)}
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

export default IdeaListScreen
