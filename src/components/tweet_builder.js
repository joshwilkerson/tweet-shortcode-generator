import React, { useState, useEffect } from "react"
import { Checkbox } from "./shared_elements"

import DisplayRemainingCharacters from "./tweet_builder/display_remaining_characters"
import URL from "./tweet_builder/url"
import Username from "./tweet_builder/username"
import PromptText from "./tweet_builder/prompt_text"
import ShortcodePreview from "./tweet_builder/shortcode_preview"
import CopyButton from "./tweet_builder/copy_button"

const TweetBuilder = () => {
	const [tweet, setTweet] = useState("")

	const [includeUrl, setIncludeUrl] = useState(false)
	const [url, setUrl] = useState("")

	const [includeUsername, setIncludeUsername] = useState(false)
	const [username, setUsername] = useState("")

	const [useCustomPrompt, setUseCustomPrompt] = useState(false)
	const [promptText, setPromptText] = useState("Click To Tweet")

	const [shortcode, setShortcode] = useState("")

	let shortcodeElem = React.createRef()

	useEffect(() => {
		setShortcode(shortcodeElem.current.innerHTML)
	})

	const debug = false

	return (
		<div className="tweet-builder p-4 pt-0">
			<label className="mb-1">Tweet Body</label>
			<textarea
				value={tweet}
				onChange={e => setTweet(e.target.value)}
				placeholder="Paste tweet text here..."
				autoFocus
			/>

			<DisplayRemainingCharacters tweet={tweet} url={url} username={username} />

			<Checkbox
				id="includeUrl"
				label="Include URL"
				value={includeUrl}
				onChange={() => setIncludeUrl(includeUrl ? false : true)}
				className="mb-2"
			/>

			{includeUrl && <URL setUrl={setUrl} />}

			<Checkbox
				id="includeUsername"
				label="Include username"
				value={includeUsername}
				onChange={() => setIncludeUsername(includeUsername ? false : true)}
				className="mb-2"
			/>

			{includeUsername && <Username setUsername={setUsername} />}

			<Checkbox
				id="useCustomPrompt"
				label="Custom prompt text"
				value={useCustomPrompt}
				onChange={() => setUseCustomPrompt(useCustomPrompt ? false : true)}
				className="mb-2"
			/>

			{useCustomPrompt && (
				<PromptText promptText={promptText} setPromptText={setPromptText} />
			)}

			<ShortcodePreview
				tweet={tweet}
				url={url}
				includeUsername={includeUsername}
				username={username}
				useCustomPrompt={useCustomPrompt}
				promptText={promptText}
				shortcodeElem={shortcodeElem}
			/>

			<CopyButton tweet={tweet} shortcode={shortcode} />

			{debug && (
				<div className="debug">
					<p>tweet: {tweet}</p>
					<p>includeUrl: {includeUrl ? "true" : "false"}</p>
					<p>url: {url}</p>
					<p>includeUsername: {includeUsername ? "true" : "false"}</p>
					<p>username: {username}</p>
					<p>useCustomPrompt: {useCustomPrompt ? "true" : "false"}</p>
					<p>promptText: {promptText}</p>
					<p>shortcode: {shortcode}</p>
				</div>
			)}
		</div>
	)
}

export default TweetBuilder
