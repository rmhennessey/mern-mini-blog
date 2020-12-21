import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listDrafts } from '../actions/draftActions'

const DraftScreen = ({ match }) => {
	const dispatch = useDispatch()

	const draftList = useSelector((state) => state.draftList)
	const { loading, error, drafts } = draftList

	useEffect(() => {
		dispatch(listDrafts(match.params.slug))
		// Added this so it opens at top of page. Was opening at bottom
		window.scrollTo(0, 0)
	}, [dispatch, match])

	return (
		<div style={{ marginTop: '70px' }}>
			<Link className='btn btn-light my-3' to='/drafts/all'>
				See All Drafts
			</Link>

			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<Col>
					{drafts.map((draft) => (
						<>
							{draft.slug === match.params.slug ? (
								<Card
									style={{
										width: '80%',
										margin: 'auto',
										border: 'none',
									}}
								>
									<Card.Body>
										<Card.Title>
											<h1>{draft.title}</h1>
										</Card.Title>
										<Card.Subtitle className='mb-2 text-muted'>
											<h4>{draft.subtitle}</h4>
										</Card.Subtitle>
										<div className='displayLinebreak'>
											<Card.Text>{draft.body}</Card.Text>
										</div>
										{/* <Card.Link href={`/${post.slug}`}>Read Full Post</Card.Link> */}
									</Card.Body>
								</Card>
							) : (
								''
							)}
						</>
					))}
				</Col>
			)}
		</div>
	)
}

export default DraftScreen
