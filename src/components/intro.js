import React from "react"
import { Icon } from "react-icons-kit"
import { twitter } from "react-icons-kit/fa/twitter"

const Intro = () => {
	return (
		<div>
			<h2>
				<Icon icon={twitter} /> Tweet Shortcode Generator
			</h2>
			<p>
				A user-friendly tool to generate shortcodes for the{" "}
				<em>Better Click To Tweet</em> Wordpress plugin.
			</p>
		</div>
	)
}

export default Intro
