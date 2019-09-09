import React from "react"
import { string, func, bool, object, oneOfType } from "prop-types"

export const Checkbox = props => {
	const { value, id, label, onChange, ...rest } = props

	return (
		<div {...rest}>
			<input
				type="checkbox"
				className="checkbox"
				id={id}
				value={value}
				checked={value}
				onChange={onChange}
			/>
			<label htmlFor={id}>{label}</label>
		</div>
	)
}

Checkbox.propTypes = {
	value: bool,
	id: string,
	label: string,
	onChange: func,
}

export const Button = props => {
	const { disabled, text, theme, onClick, size, className, ...rest } = props

	return (
		<button
			{...rest}
			disabled={disabled}
			className={`btn btn-${theme} btn-${size} ${className ? className : ""}`}
			onClick={onClick}
		>
			{text}
		</button>
	)
}

Button.propTypes = {
	disabled: bool,
	text: oneOfType([string, object]),
	theme: string,
	onClick: func,
	size: string,
	className: string,
}

Button.defaultProps = {
	theme: "primary",
	size: "md",
}
