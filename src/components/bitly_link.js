import React, { useState, useEffect } from "react"
import { string, func } from "prop-types"
import ClipLoader from "react-spinners/ClipLoader"
import Colors from "./colors"

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
		<div className="content-well px-1 py-4p d-if ai-c jc-fs ml-1">
			{loading ? (
				<ClipLoader
					sizeUnit={"px"}
					size={18}
					color={Colors.primary}
					css={{ animationDuration: "1.15s", borderWidth: "2px", margin: 0 }}
				/>
			) : (
				<a href={displayLink} target="_blank" rel="noopener noreferrer">
					{displayLink}
				</a>
			)}
		</div>
	)
}

BitlyLink.propTypes = {
	url: string,
	setShortUrl: func,
	setShortUrlLength: func,
}

export default BitlyLink
