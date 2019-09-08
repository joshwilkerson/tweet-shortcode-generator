import React from "react"
import { string, func } from "prop-types"

const PromptText = props => {
	const { promptText, setPromptText } = props

	return (
		<div className="content-well mb-2">
			<label>Custom prompt</label>
			<input
				type="text"
				value={promptText}
				onChange={e => setPromptText(e.target.value)}
				className="d-b w-100%"
				placeholder="Enter custom prompt text"
				autoFocus
			/>
		</div>
	)
}

PromptText.propTypes = {
	promptText: string,
	setPromptText: func,
}

export default PromptText
