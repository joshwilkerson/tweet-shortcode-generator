import React from "react"
import { Icon } from "react-icons-kit"
import { twitter } from "react-icons-kit/fa/twitter"
import Colors from "./utils/colors"

const Intro = () => {
	return (
		<div>
			<h2 className="m-0">
				<Icon
					icon={twitter}
					style={{ color: Colors.primary }}
					size={36}
					className="mr-1"
				/>
				Tweet Shortcode Generator
			</h2>
			<p>
				A user-friendly tool to create shortcodes for the{" "}
				<em>Better Click To Tweet</em> Wordpress plugin.
			</p>
		</div>
	)
}

export default Intro
