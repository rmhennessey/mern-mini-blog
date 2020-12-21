import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
// import Paginate from '../components/Paginate.js'
import {
	listDrafts,
	deleteDraft,
	resetDraftDetails,
} from '../actions/draftActions'
import {
	DRAFT_CREATE_RESET,
	DRAFT_UPDATE_RESET,
} from '../constants/draftConstants'

const DraftListScreen = ({ history }) => {
	// const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()

	const draftList = useSelector((state) => state.draftList)
	const { loading, error, drafts } = draftList

	const draftDelete = useSelector((state) => state.draftDelete)
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = draftDelete

	const draftCreate = useSelector((state) => state.draftCreate)
	const { success: successCreate } = draftCreate

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		dispatch({ type: DRAFT_CREATE_RESET })
		dispatch({ type: DRAFT_UPDATE_RESET })
		dispatch(resetDraftDetails())
		// dispatch(listIdeas())

		if (!userInfo) {
			history.push('/')
		}
		if (successCreate) {
			history.push(`/drafts/all`)
		} else {
			dispatch(listDrafts())
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
		if (window.confirm('Are you sure you want to delete this draft?')) {
			dispatch(deleteDraft(id))
		}
	}

	// const createProductHandler = () => {
	// 	dispatch(createProduct())
	// }

	return (
		<div style={{ marginTop: '70px' }}>
			<Row className='align-items-center'>
				<Col>
					<h1>Drafts</h1>
				</Col>
				<Col className='text-right'>
					<Link className='btn btn-light my-3' to='/drafts/create'>
						<i className='fas fa-plus'></i> Create Draft
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
								<th>Subtitle</th>
								<th>Tags</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{drafts.map((draft) => (
								<tr key={draft._id}>
									<td>{draft.title}</td>
									<td>{draft.subtitle}</td>
									<td>{draft.tags}</td>
									<td>
										<LinkContainer
											to={`/drafts/${draft._id}/edit`}
											style={{ marginRight: '10px' }}
										>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => deleteHandler(draft._id)}
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

export default DraftListScreen
