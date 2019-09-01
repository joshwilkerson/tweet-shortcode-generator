import React from "react"
import Layout from "./layout"
import Intro from "./intro"
import TweetBuilder from "./tweet_builder"

const App = () => {
	return (
		<Layout>
			<Intro />
			<TweetBuilder />
		</Layout>
	)
}

export default App
