import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { listPostSlug } from '../actions/postActions'

const PostScreen = ({ match, history }) => {
	const dispatch = useDispatch()

	// const postList = useSelector((state) => state.postList)
	// const { loading, error, posts } = postList

	const postSlug = useSelector((state) => state.postSlug)
	const { loading, error, success, post } = postSlug

	useEffect(() => {
		dispatch(listPostSlug(match.params.slug))
		window.scrollTo(0, 0)
	}, [dispatch, match])

	return (
		<div style={{ marginTop: '70px' }}>
			<Link className='btn btn-light my-3' to='/'>
				Go Home
			</Link>

			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : success ? (
				<>
					<Meta title={post[0].title} />
					<Col>
						<>
							{post[0].slug === match.params.slug ? (
								<Card
									style={{
										width: '80%',
										margin: 'auto',
										border: 'none',
									}}
								>
									<div className='displayLinebreak'>
										<h5 style={{ color: '#f47b71', fontWeight: 'bold' }}>
											Tags:
										</h5>
									</div>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											marginBottom: '7px',
										}}
									>
										{post[0].tags
											.toString()
											.split(',')
											.map((tag) => (
												<OverlayTrigger
													overlay={
														<Tooltip id='allposts' style={{ zIndex: '2000' }}>
															See all [ {tag} ] tags
														</Tooltip>
													}
													placement='bottom'
												>
													<Button
														variant='primary'
														style={{
															width: 'fit-content',
															marginTop: '7px',
															marginRight: '8px',
														}}
														onClick={() => history.push(`/tag/${tag}`)}
													>
														{tag}
													</Button>
												</OverlayTrigger>
											))}
									</div>
									<Card.Body>
										<Card.Title>
											<h1>{post[0].title}</h1>
										</Card.Title>
										<Card.Subtitle className='mb-2 text-muted'>
											<h4>{post[0].subtitle}</h4>
										</Card.Subtitle>
										<div className='displayLinebreak'>
											<Card.Text>{post[0].body}</Card.Text>
										</div>
									</Card.Body>
									<hr></hr>
									<div className='displayLinebreak'>
										<h5 style={{ color: '#f47b71', fontWeight: 'bold' }}>
											Related Links:
										</h5>
									</div>
									<div style={{ display: 'flex', flexDirection: 'column' }}>
										{post[0].links.map((link) => (
											<a
												href={link.link}
												target='_blank'
												rel='noopener noreferrer'
											>
												{link.linkTitle}
											</a>
										))}
									</div>
								</Card>
							) : (
								''
							)}
						</>
					</Col>
				</>
			) : (
				<h2>Post Not Found</h2>
			)}
		</div>
	)
}

export default PostScreen
