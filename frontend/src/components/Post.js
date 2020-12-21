import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Post = ({ post }) => {
	return (
		<>
			{post.isPinned === false ? (
				<Card
					style={{
						width: '80%',
						margin: 'auto',
						marginTop: '20px',
						marginBottom: '20px',
					}}
				>
					<Card.Body>
						<Card.Title>{post.title}</Card.Title>
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

export default Post
