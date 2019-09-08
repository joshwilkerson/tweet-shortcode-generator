import React, { Fragment, useState, useEffect } from "react"
import { string } from "prop-types"

const DisplayRemainingCharacters = props => {
	const { tweet, url, username } = props
	const [status, setStatus] = useState("success")
	const [urlLength, setUrlLength] = useState(0)

	const characterLimit = 280
	const tweetLength = tweet.length
	const usernameLength = username ? username.length : 0
	const charactersRemaining =
		characterLimit - tweetLength - urlLength - usernameLength

	const debug = false

	useEffect(() => {
		if (charactersRemaining >= 15) {
			setStatus("success")
		} else if (charactersRemaining < 15 && charactersRemaining > 0) {
			setStatus("warning")
		} else {
			setStatus("error")
		}

		if (url.length > 0 && typeof url.length === "number") {
			setUrlLength(url.length)
		}
	})

	return (
		<Fragment>
			<div className={`alert alert--${status} mb-3`}>
				remaining characters:
				<span className="ml-4p fw-b">{charactersRemaining}</span>
			</div>
			{debug && (
				<div className="debug">
					<p>url: {url}</p>
					<p>urlLength: {urlLength}</p>
				</div>
			)}
		</Fragment>
	)
}

DisplayRemainingCharacters.propTypes = {
	tweet: string,
	url: string,
	username: string,
}

export default DisplayRemainingCharacters
