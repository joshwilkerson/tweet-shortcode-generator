import React from "react"
import { string, func } from "prop-types"

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
	value: string,
	id: string,
	label: string,
	onChange: func,
}
