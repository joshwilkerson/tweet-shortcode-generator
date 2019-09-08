import React, { Fragment } from "react"
import { string, bool, object } from "prop-types"

const ShortcodePreview = props => {
	const {
		tweet,
		url,
		includeUsername,
		username,
		useCustomPrompt,
		promptText,
		shortcodeElem,
	} = props

	const renderShortcodePreview = () => {
		const shortcodeUrl = () => {
			let result
			if (url) {
				result = ` url="${url}"`
			} else {
				result = ` url="no"`
			}
			return result
		}

		const shortcodeUsername = () => {
			let result
			if (includeUsername && username) {
				result = ` username="${username}"`
			} else {
				result = ` username="no"`
			}
			return result
		}

		const shortcodePrompt = () => {
			let result
			if (useCustomPrompt) {
				result = ` prompt="${promptText}"`
			} else {
				result = ""
			}
			return result
		}

		return `[bctt tweet="${tweet}"${shortcodeUrl()}${shortcodeUsername()}${shortcodePrompt()}]`
	}

	const debug = false

	return (
		<Fragment>
			<div
				className={`shortcode-preview mt-2 ${!tweet ? "hidden" : "mb-2"}`}
				ref={shortcodeElem}
			>
				{renderShortcodePreview()}
			</div>
			{debug && (
				<div className="debug">
					<p>includeUsername (typeof): {typeof includeUsername}</p>
				</div>
			)}
		</Fragment>
	)
}

ShortcodePreview.propTypes = {
	tweet: string,
	url: string,
	includeUsername: bool,
	username: string,
	useCustomPrompt: bool,
	promptText: string,
	shortcodeElem: object,
}

export default ShortcodePreview
