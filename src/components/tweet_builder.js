import React, { useState, useEffect, Fragment } from "react"
import { string } from "prop-types"
import { CopyToClipboard } from "react-copy-to-clipboard"
import URLShortener from "./url_shortener"

import { Icon } from "react-icons-kit"
import { check } from "react-icons-kit/fa/check"

const TweetBuilder = () => {
	const [url, setUrl] = useState("")
	const [tweet, setTweet] = useState("")
	const [user, setUser] = useState("@StevenPHenke")
	const [copied, setCopied] = useState(false)
	const [shortcode, setShortcode] = useState("")
	const [includeUrl, setIncludeUrl] = useState(false)
	const [includeHandle, setIncludeHandle] = useState(false)

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
		if (charactersRemaining >= 15) {
			return "status--ok"
		} else if (charactersRemaining < 15 && charactersRemaining > 0) {
			return "status--warning"
		} else {
			return "status--error"
		}
	}

	const renderUrl = () => {
		let result
		if (includeUrl && url) {
			result = ` url="${url}"`
		} else {
			result = ` url="no"`
		}
		return result
	}

	const renderUsername = () => {
		let result
		if (includeHandle) {
			result = ` via="${user}"`
		} else {
			result = ` via="no"`
		}
		return result
	}

	const renderCopyButtonText = () => {
		if (copied) {
			return (
				<Fragment>
					Copied <Icon icon={check} />
				</Fragment>
			)
		} else {
			return "Copy to Clipboard"
		}
	}

	const updateUser = e => {
		setUser(e.target.value)
	}

	const handleCopyClick = () => {
		setCopied(true)
		setTimeout(() => setCopied(false), 2500)
	}

	return (
		<div>
			<label className="mb-1">Tweet Body</label>
			<textarea
				value={tweet}
				onChange={e => setTweet(e.target.value)}
				className="mb-0"
			/>

			<div className={`character-count ${characterLimitInidicator()} mb-3`}>
				remaining characters:
				<span className="ml-4p fw-b">{charactersRemaining}</span>
			</div>

			<div className="d-f fd-r ai-c jc-fs mb-2">
				<input
					type="checkbox"
					id="showURL"
					onChange={() => setIncludeUrl(!includeUrl)}
				/>
				<label htmlFor="showURL">Show URL?</label>
			</div>

			{includeUrl && (
				<URLShortener setUrl={setUrl} url={url} className="mb-3" />
			)}

			<div className="d-f fd-r ai-c jc-fs mb-2">
				<input
					type="checkbox"
					id="showUser"
					onChange={() => setIncludeHandle(!includeHandle)}
				/>
				<label htmlFor="showUser">Show User?</label>
			</div>

			{includeHandle && (
				<input
					className="d-b w-100% mb-3"
					type="text"
					value={user}
					onChange={updateUser}
				/>
			)}

			<div
				className={`shortcode-preview ${!tweet ? "hidden" : "mb-2"}`}
				ref={shortcodeElem}
			>
				[bctt tweet="{tweet}"{renderUrl()}
				{renderUsername()}]
			</div>

			<CopyToClipboard text={shortcode} onCopy={handleCopyClick}>
				<button
					className={`btn btn-lg ${copied ? "btn-success" : "btn-primary"}`}
				>
					{renderCopyButtonText()}
				</button>
			</CopyToClipboard>
		</div>
	)
}

TweetBuilder.propTypes = {
	url: string,
}

export default TweetBuilder
