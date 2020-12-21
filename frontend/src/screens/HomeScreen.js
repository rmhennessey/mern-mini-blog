import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import Post from '../components/Post'
import Pin from '../components/Pin'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { listPosts } from '../actions/postActions'

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword

	const tag = match.params.tag

	const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()

	const postList = useSelector((state) => state.postList)
	const { loading, error, posts, pages, page } = postList

	useEffect(() => {
		dispatch(listPosts(keyword, pageNumber, tag))
	}, [dispatch, keyword, pageNumber, tag])

	return (
		<div style={{ marginTop: '70px' }}>
			<Meta />
			{keyword ? (
				<Link className='btn btn-light my-3' to='/'>
					Go Back
				</Link>
			) : (
				''
			)}
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : pages > 0 ? (
				<>
					{match.params.tag ? (
						<h3>
							All{' '}
							<span
								style={{
									color: '#f47b71',
									fontWeight: 'bold',
								}}
							>
								[ {match.params.tag} ]
							</span>{' '}
							Tags:
						</h3>
					) : match.params.keyword ? (
						<h3>
							Search Results for{' '}
							<span
								style={{
									color: '#f47b71',
									fontWeight: 'bold',
								}}
							>
								[ {match.params.keyword} ]
							</span>{' '}
						</h3>
					) : (
						<div>
							<Col>
								{posts.map((post) => (
									<Pin post={post} key={post._id} />
								))}
							</Col>
							{/* <h3>Latest Blog Posts</h3> */}
						</div>
					)}
					<Col>
						{posts.map((post) => (
							<Post post={post} key={post._id} />
						))}
					</Col>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ''}
						tag={tag ? tag : ''}
					/>
				</>
			) : (
				<>
					<Link className='btn btn-light my-3' to='/'>
						Head Back Home
					</Link>
					<h2 style={{ textAlign: 'center', paddingTop: '12px' }}>
						No results for that search <span>😢</span>
					</h2>
				</>
			)}
		</div>
	)
}

export default HomeScreen
