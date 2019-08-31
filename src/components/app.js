import React, { useState } from "react"

import URLShortener from "./url_shortener"
import TweetBuilder from "./tweet_builder"

const App = () => {
	const [url, setUrl] = useState("")

	const updateUrl = url => {
		setUrl(url)
	}

	console.log(`api key ${process.env.API_TOKEN}`)

	return (
		<div style={{ padding: 20 }}>
			<URLShortener updateUrl={updateUrl} />
			<TweetBuilder url={url} />
		</div>
	)
}

export default App
