import React from 'react'
import { Link } from 'react-router-dom'
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap'

const Pin = ({ post }) => {
	return (
		<>
			{post.isPinned === true ? (
				<Card
					style={{
						width: '80%',
						margin: 'auto',
						marginTop: '20px',
						marginBottom: '20px',
						border: '1px solid #f47b71',
					}}
				>
					<Card.Body>
						<Card.Title>
							<OverlayTrigger
								overlay={
									<Tooltip id='pinnedposts' style={{ zIndex: '2000' }}>
										Pinned Post
									</Tooltip>
								}
								placement='top'
							>
								<span style={{ width: '12px' }}>🎯 </span>
							</OverlayTrigger>
							{post.title}
						</Card.Title>
						<Card.Subtitle className='mb-2 text-muted'>
							{post.subtitle}
						</Card.Subtitle>
						<Link to={`/${post.slug}`}>Read Full Post</Link>
					</Card.Body>
				</Card>
			) : (
				''
			)}
		</>
	)
}

export default Pin
