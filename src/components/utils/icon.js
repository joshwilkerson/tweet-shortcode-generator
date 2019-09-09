import React from "react"
import { string, number, object } from "prop-types"

import cog from "../../assets/svg/cog.svg"
import twitter from "../../assets/svg/twitter.svg"
import check from "../../assets/svg/check.svg"

const icons = {
	cog,
	twitter,
	check,
}

const Icon = props => {
	const symbol = icons[`${props.symbol}`]

	const styles = {
		width: props.size && `${props.size}px`,
		height: props.size && `${props.size}px`,
		fill: props.color ? props.color : "currentColor",
		...props.style,
	}

	return (
		<svg
			className={`icon d-ib ${props.className ? props.className : ""}`}
			style={styles}
		>
			<use xlinkHref={symbol} />
		</svg>
	)
}

Icon.propTypes = {
	symbol: string,
	size: number,
	color: string,
	className: string,
	style: object,
}

Icon.defaultProps = {
	style: {},
}

export default Icon
