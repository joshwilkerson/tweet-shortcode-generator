import React, { useState, useEffect } from "react"
import { string, func } from "prop-types"

const BitlyLink = props => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")
	const [displayLink, setDisplayLink] = useState("")
	const encodedUrl = encodeURIComponent(props.url)

	const getShortURL = () => {
		const token = process.env.API_TOKEN
		const basePath = "https://api-ssl.bitly.com/v3/shorten"

		let fetchURL = `${basePath}?access_token=${token}&longUrl=${encodedUrl}&format=json`

		fetch(fetchURL)
			.then(response => response.json())
			.then(data => {
				const shortUrl = data.data.url

				props.setShortUrl(shortUrl)
				setDisplayLink(shortUrl)
				props.setShortUrlLength(shortUrl.length)
				setLoading(false)
			})
			.catch(error => {
				setError(error)
			})
	}

	useEffect(() => {
		getShortURL()
		return () => props.setShortUrl(false)
	}, [])

	return (
		<span className="p-r ml-4p" style={{ top: 1 }}>
			{loading ? (
				"loading"
			) : (
				<a href={displayLink} target="_blank" rel="noopener noreferrer">
					{displayLink}
				</a>
			)}
			{error && <span>error: {error}</span>}
		</span>
	)
}

BitlyLink.propTypes = {
	url: string,
	setShortUrl: func,
	setShortUrlLength: func,
}

export default BitlyLink
