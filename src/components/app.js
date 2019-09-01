import React from "react"
import Intro from "./intro"
import TweetBuilder from "./tweet_builder"

const App = () => {
	return (
		<div style={{ padding: 20 }}>
			<Intro />
			<TweetBuilder />
		</div>
	)
}

export default App
