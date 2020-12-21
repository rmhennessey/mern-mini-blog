import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import Paginate from '../components/Paginate.js'
import { listPosts, deletePost, resetPostDetails } from '../actions/postActions'
import {
	POST_CREATE_RESET,
	POST_UPDATE_RESET,
} from '../constants/postConstants'

const PostListScreen = ({ history, match }) => {
	const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()

	const postList = useSelector((state) => state.postList)
	const { loading, error, posts, pages, page } = postList

	const postDelete = useSelector((state) => state.postDelete)
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = postDelete

	const postCreate = useSelector((state) => state.postCreate)
	const { success: successCreate } = postCreate

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		dispatch({ type: POST_CREATE_RESET })
		dispatch({ type: POST_UPDATE_RESET })
		dispatch(resetPostDetails())

		if (!userInfo) {
			history.push('/')
		}
		if (successCreate) {
			history.push(`/posts/all`)
		} else {
			dispatch(listPosts('', pageNumber))
		}
	}, [dispatch, history, userInfo, successDelete, successCreate, pageNumber])

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure you want to delete this post?')) {
			dispatch(deletePost(id))
		}
	}

	return (
		<div style={{ marginTop: '70px' }}>
			<Row className='align-items-center'>
				<Col>
					<h1>Posts</h1>
				</Col>
				<Col className='text-right'>
					<Link className='btn btn-light my-3' to='/posts/create'>
						<i className='fas fa-plus'></i> Create Post
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
							{posts.map((post) => (
								<tr key={post._id}>
									<td>{post.title}</td>
									<td>{post.subtitle}</td>
									<td>{post.tags}</td>
									<td>
										<LinkContainer
											to={`/posts/${post._id}/edit`}
											style={{ marginRight: '10px' }}
										>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => deleteHandler(post._id)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Paginate pages={pages} page={page} isAdmin={true} />
				</>
			)}
		</div>
	)
}

export default PostListScreen
