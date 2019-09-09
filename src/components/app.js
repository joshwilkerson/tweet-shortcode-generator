import React, { Fragment } from "react"
import { BrowserRouter, Route } from "react-router-dom"

import Layout from "./layout"
import Nav from "./nav"
import Intro from "./intro"
import TweetBuilder from "./tweet_builder"
import Settings from "./settings"

const Home = () => {
	return (
		<Fragment>
			<Intro />
			<TweetBuilder />
		</Fragment>
	)
}

const App = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Nav />

				<Route exact path="/" component={Home} />
				<Route path="/settings" component={Settings} />
			</Layout>
		</BrowserRouter>
	)
}

export default App
