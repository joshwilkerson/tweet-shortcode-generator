import React, { Fragment, useState } from "react"
import { string } from "prop-types"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Icon } from "react-icons-kit"
import { check } from "react-icons-kit/fa/check"

const CopyButton = props => {
	const { shortcode, tweet } = props
	const [copied, setCopied] = useState(false)

	const renderCopyButtonText = () => {
		if (copied) {
			return (
				<Fragment>
					Copied <Icon icon={check} />
				</Fragment>
			)
		} else {
			return "Copy to Clipboard"
		}
	}

	const handleCopyClick = () => {
		setCopied(true)
		setTimeout(() => setCopied(false), 2500)
	}

	return (
		<Fragment>
			<CopyToClipboard text={shortcode} onCopy={handleCopyClick}>
				<button
					className={`btn btn-lg ${copied ? "btn-success" : "btn-primary"}`}
					disabled={!tweet}
				>
					{renderCopyButtonText()}
				</button>
			</CopyToClipboard>
		</Fragment>
	)
}

CopyButton.propTypes = {
	shortcode: string,
	tweet: string,
}

export default CopyButton
