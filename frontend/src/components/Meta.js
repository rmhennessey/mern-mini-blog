import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, url, type, summary }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='og:description' content={description} />
			<meta property='og:url' content={url} />
			<meta property='og:type' content={type} />

			<meta name='twitter:card' content={summary} />
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={description} />
			<meta name='twitter:url' content={url} />
			{/* <meta
				name='twitter:image'
				content=""
			></meta> */}
		</Helmet>
	)
}

Meta.defaultProps = {
	title: 'Religion of Rogan',
	description: 'Forging Meaning in the Madness',
	url: 'www.religionofrogan.com',
	type: 'website',
}

export default Meta
