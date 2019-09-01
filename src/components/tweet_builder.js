import React, { useState, useEffect } from "react"
import { string } from "prop-types"
import { CopyToClipboard } from "react-copy-to-clipboard"
import URLShortener from "./url_shortener"

const TweetBuilder = () => {
	const [url, setUrl] = useState("")
	const [tweet, setTweet] = useState("")
	const [copied, setCopied] = useState(false)
	const [shortcode, setShortcode] = useState("")
	const [includeUrl, setIncludeUrl] = useState(false)
	const [includeHandle, setIncludeHandle] = useState(false)

	const user = "@StevenPHenke"
	const userLength = includeHandle ? user.length : 0
	const tweetLength = tweet.length
	const urlLength = includeUrl ? url.length : 0
	const characterLimit = 280
	const charactersRemaining =
		characterLimit - tweetLength - urlLength - userLength - 3

	let shortcodeElem = React.createRef()

	useEffect(() => {
		setShortcode(shortcodeElem.current.innerHTML)
	})

	const characterLimitInidicator = () => {
		if (charactersRemaining > 15) {
			return "status--ok"
		} else if (charactersRemaining < 10 && charactersRemaining > 0) {
			return "status--warning"
		} else {
			return "status--error"
		}
	}

	const renderUrl = () => {
		let result
		if (includeUrl) {
			result = ` url="${url}`
		} else {
			result = null
		}
		return result
	}

	const renderUsername = () => {
		let result
		if (includeHandle) {
			result = ` via="${user}"`
		} else {
			result = null
		}
		return result
	}

	return (
		<div>
			<URLShortener setUrl={setUrl} />

			<textarea value={tweet} onChange={e => setTweet(e.target.value)} />

			<br />
			<br />
			<input
				type="checkbox"
				id="showURL"
				onChange={() => setIncludeUrl(!includeUrl)}
			/>
			<label htmlFor="showURL">Show URL?</label>

			<br />
			<br />
			<input
				type="checkbox"
				id="showUser"
				onChange={() => setIncludeHandle(!includeHandle)}
			/>
			<label htmlFor="showUser">Show User?</label>

			<br />
			<br />
			<div
				style={{ background: "#ececec", padding: 16, borderRadius: 4 }}
				ref={shortcodeElem}
			>
				[bctt tweet="{tweet}"{renderUrl()}
				{renderUsername()}]
			</div>

			<br />
			<CopyToClipboard text={shortcode} onCopy={() => setCopied(true)}>
				<button>{!copied ? "Copy" : "Copied!"}</button>
			</CopyToClipboard>

			<br />
			<br />
			<div>
				<strong>remaining characters: </strong>
				<span className={`characterCount ${characterLimitInidicator()}`}>
					{charactersRemaining}
				</span>
			</div>
		</div>
	)
}

TweetBuilder.propTypes = {
	url: string,
}

export default TweetBuilder
