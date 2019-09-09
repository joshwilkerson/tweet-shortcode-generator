import React, { Fragment, useState } from "react"
import { string } from "prop-types"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Button } from "../shared_elements"
import Icon from "../utils/icon"

const CopyButton = props => {
	const { shortcode, tweet } = props
	const [copied, setCopied] = useState(false)

	const renderCopyButtonText = () => {
		if (copied) {
			return (
				<Fragment>
					Copied{" "}
					<Icon
						symbol="check"
						size={14}
						className="p-r ml-2p"
						style={{ top: 1 }}
					/>
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
		<CopyToClipboard text={shortcode} onCopy={handleCopyClick}>
			<Button
				text={renderCopyButtonText()}
				theme={copied ? "success" : "primary"}
				size="md"
				disabled={!tweet}
			/>
		</CopyToClipboard>
	)
}

CopyButton.propTypes = {
	shortcode: string,
	tweet: string,
}

export default CopyButton
