import React from "react"
import Colors from "./utils/colors"
import Icon from "./utils/icon"

const Intro = () => {
	return (
		<div>
			<div className="d-f ai-c mb-3">
				<Icon
					symbol="twitter"
					size={42}
					color={Colors.primary}
					className="d-ib mr-1"
				/>
				<h2 className="m-0">Tweet Shortcode Generator</h2>
			</div>
			<p>
				A user-friendly tool to create shortcodes for the{" "}
				<em>Better Click To Tweet</em> Wordpress plugin.
			</p>
		</div>
	)
}

export default Intro
