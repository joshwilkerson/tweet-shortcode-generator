import React, { useState, useEffect, Fragment } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"

import BitlyLink from "./bitly_link"

import { Icon } from "react-icons-kit"
import { check } from "react-icons-kit/fa/check"

const TweetBuilder = () => {
	const debug = false

	const ls_save_username = localStorage.getItem("bctt_save_username") === "true"
	const ls_username = localStorage.getItem("bctt_username")

	const [tweet, setTweet] = useState("")

	const [includeUrl, setIncludeUrl] = useState(false)
	const [url, setUrl] = useState("")
	const urlFormatted = url.startsWith("http")

	const [useShortUrl, setUseShortUrl] = useState(false)
	const [shortUrl, setShortUrl] = useState("")
	const [shortUrlLength, setShortUrlLength] = useState(0)

	const [includeUsername, setIncludeUsername] = useState(false)
	const [username, setUsername] = useState(
		ls_username != null && ls_save_username ? ls_username : ""
	)
	const [saveUsername, setSaveUsername] = useState(false)

	const [includePrompt, setIncludePrompt] = useState(false)
	const [prompt, setPrompt] = useState("Click to Tweet")

	const [copied, setCopied] = useState(false)
	const [shortcode, setShortcode] = useState("")

	const getUrlLength = () => {
		let length
		if (useShortUrl) {
			length = shortUrlLength
		} else if (includeUrl) {
			length = url.length
		} else {
			length = 0
		}
		return length
	}

	const displayRemainingCharacters = () => {
		const characterLimit = 280
		const tweetLength = tweet.length
		const usernameLength = includeUsername ? username.length : 0

		return characterLimit - tweetLength - getUrlLength() - usernameLength
	}

	const characterCountStatus = () => {
		const charactersRemaining = displayRemainingCharacters()

		if (charactersRemaining >= 15) {
			return "success"
		} else if (charactersRemaining < 15 && charactersRemaining > 0) {
			return "warning"
		} else {
			return "error"
		}
	}

	const renderShortcodePreview = () => {
		const shortcodeUrl = () => {
			let result
			if (includeUrl && url) {
				result = ` url="${shortUrl ? shortUrl : url}"`
			} else {
				result = ` url="no"`
			}
			return result
		}

		const shortcodeUsername = () => {
			let result
			if (includeUsername) {
				result = ` username="${username}"`
			} else {
				result = ` username="no"`
			}
			return result
		}

		const shortcodePrompt = () => {
			let result
			if (includePrompt) {
				result = ` prompt="${prompt}"`
			} else {
				result = ""
			}
			return result
		}

		return `[bctt tweet="${tweet}"${shortcodeUrl()}${shortcodeUsername()}${shortcodePrompt()}]`
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

	const handleCopyClick = () => {
		setCopied(true)
		setTimeout(() => setCopied(false), 2500)
	}

	const handleUpdateUrl = e => {
		const tweet = e.target.value
		setUrl(tweet)

		if (tweet === "") {
			setUseShortUrl(false)
		}

		if (shortUrl) {
			setShortUrl("")
			setUseShortUrl(false)
		}
	}

	const handleUpdateUsername = e => {
		setUsername(e.target.value)
		localStorage.setItem("bctt_username", e.target.value)
	}

	const handleSaveUsername = () => {
		if (saveUsername) {
			setSaveUsername(false)
			localStorage.setItem("bctt_save_username", "false")
		} else {
			setSaveUsername(true)
			localStorage.setItem("bctt_save_username", "true")
		}
	}

	let shortcodeElem = React.createRef()

	useEffect(() => {
		localStorage.setItem(
			"bctt_save_username",
			ls_save_username ? ls_save_username : false
		)

		setSaveUsername(ls_save_username ? ls_save_username : false)
		setShortcode(shortcodeElem.current.innerHTML)
	})

	return (
		<div className="tweet-builder">
			<label className="mb-1">Tweet Body</label>
			<textarea
				value={tweet}
				onChange={e => setTweet(e.target.value)}
				placeholder="Paste tweet text here..."
			/>

			<div className={`alert alert--${characterCountStatus()} mb-1`}>
				remaining characters:
				<span className="ml-4p fw-b">{displayRemainingCharacters()}</span>
			</div>

			<div className="d-f fd-r ai-c jc-fs my-2">
				<input
					type="checkbox"
					className="checkbox"
					id="showUrl"
					value={includeUrl}
					checked={includeUrl}
					onChange={() => setIncludeUrl(includeUrl ? false : true)}
				/>
				<label htmlFor="showUrl">Include URL</label>
			</div>

			{includeUrl && (
				<div className="content-well">
					<label>URL</label>
					<input
						type="text"
						value={url}
						onChange={handleUpdateUrl}
						className={`d-b w-100% mb-2 ${url && !urlFormatted && "error"}`}
						placeholder="URL"
					/>
					<div className="d-f ai-c">
						<input
							type="checkbox"
							className="checkbox checkbox-sm"
							id="useShortUrl"
							value={useShortUrl}
							checked={useShortUrl}
							disabled={!urlFormatted}
							onChange={() => setUseShortUrl(useShortUrl ? false : true)}
						/>
						<label htmlFor="useShortUrl">Shorten URL with Bit.ly</label>
						{useShortUrl && (
							<BitlyLink
								url={url}
								setShortUrl={setShortUrl}
								setShortUrlLength={setShortUrlLength}
							/>
						)}
					</div>

					{url && !urlFormatted && (
						<span className="d-b w-100% mt-2 alert alert--error">
							URL must start with "http://" or "https:'//"
						</span>
					)}
				</div>
			)}

			<div className="d-f fd-r ai-c jc-fs my-2">
				<input
					type="checkbox"
					className="checkbox"
					id="showUsername"
					value={includeUsername}
					checked={includeUsername}
					onChange={() => setIncludeUsername(includeUsername ? false : true)}
				/>
				<label htmlFor="showUsername">Include username</label>
			</div>

			{includeUsername && (
				<div className="content-well">
					<label>Username</label>
					<input
						type="text"
						value={username}
						onChange={handleUpdateUsername}
						className="d-b w-100%"
						placeholder="Username"
					/>
					<div className="mt-2">
						<input
							type="checkbox"
							className="checkbox checkbox-sm"
							id="saveUsername"
							value={saveUsername}
							checked={saveUsername}
							onChange={handleSaveUsername}
						/>
						<label htmlFor="saveUsername">Remember me?</label>
					</div>
				</div>
			)}

			<div className="d-f fd-r ai-c jc-fs my-2">
				<input
					type="checkbox"
					className="checkbox"
					id="showPrompt"
					value={includePrompt}
					checked={includePrompt}
					onChange={() => setIncludePrompt(includePrompt ? false : true)}
				/>
				<label htmlFor="showPrompt">Custom prompt text</label>
			</div>

			{includePrompt && (
				<div className="content-well">
					<label>Custom prompt</label>
					<input
						type="text"
						value={prompt}
						onChange={e => setPrompt(e.target.value)}
						className="d-b w-100%"
						placeholder="Enter custom prompt text"
					/>
				</div>
			)}

			<div
				className={`shortcode-preview mt-2 ${!tweet ? "hidden" : "mb-2"}`}
				ref={shortcodeElem}
			>
				{renderShortcodePreview()}
			</div>

			<CopyToClipboard text={shortcode} onCopy={handleCopyClick}>
				<button
					className={`btn btn-lg ${copied ? "btn-success" : "btn-primary"}`}
					disabled={!tweet}
				>
					{renderCopyButtonText()}
				</button>
			</CopyToClipboard>

			{debug && (
				<div style={{ border: "1px solid hotpink" }} className="mt-4 p-3">
					<span className="d-b">tweet: {tweet}</span>
					<span className="d-b">
						includeUrl: {includeUrl ? "true" : "false"}
					</span>
					<span className="d-b">url: {url}</span>
					<span className="d-b">
						urlFormatted: {urlFormatted ? "true" : "false"}
					</span>
					<span className="d-b">
						useShortUrl: {useShortUrl ? "true" : "false"}
					</span>
					<span className="d-b">shortUrl: {shortUrl}</span>
					<span className="d-b">
						includeUsername: {includeUsername ? "true" : "false"}
					</span>
					<span className="d-b">
						saveUsername: {saveUsername ? "true" : "false"}
					</span>
					<span className="d-b">username: {username}</span>
					<span className="d-b">
						includePrompt: {includePrompt ? "true" : "false"}
					</span>
					<span className="d-b">prompt: {prompt}</span>
					<span className="d-b">shortcode: {shortcode}</span>
				</div>
			)}
		</div>
	)
}

export default TweetBuilder
