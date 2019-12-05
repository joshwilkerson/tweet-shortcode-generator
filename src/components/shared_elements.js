import React, { Fragment } from "react"
import ClipLoader from "react-spinners/ClipLoader"
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
	const {
		disabled = false,
		text,
		theme = "primary",
		onClick,
		size = "md",
		className,
		isLoading = false,
		...rest
	} = props

	return (
		<button
			{...rest}
			disabled={disabled}
			className={`btn btn-${theme} btn-${size} ${className ? className : ""}`}
			onClick={onClick}
		>
			{isLoading ? (
				<ClipLoader
					sizeUnit={"em"}
					size={1}
					color={"#fff"}
					css={{ animationDuration: "1.15s", borderWidth: "2px", margin: 0 }}
				/>
			) : (
				<Fragment>{text}</Fragment>
			)}
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
	isLoading: bool,
}
