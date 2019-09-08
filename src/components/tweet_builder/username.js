import React, { Fragment, useState, useEffect } from "react"
import { func } from "prop-types"

const Username = props => {
	const ls_save_username = localStorage.getItem("bctt_save_username") === "true"
	const ls_username = localStorage.getItem("bctt_username")

	const [username, setUsername] = useState(
		ls_username != null && ls_save_username ? ls_username : ""
	)
	const [saveUsername, setSaveUsername] = useState(
		ls_save_username ? ls_save_username : false
	)

	const handleUpdateUsername = e => {
		setUsername(e.target.value)
		localStorage.setItem("bctt_username", e.target.value)
	}

	const handleSaveUsername = () => {
		if (saveUsername) {
			setSaveUsername(false)
			localStorage.setItem("bctt_save_username", "false")
		} else {
			setSaveUsername(true)
			localStorage.setItem("bctt_save_username", "true")
		}
	}

	useEffect(() => {
		props.setUsername(username)
		return () => props.setUsername("")
	})

	const debug = false

	return (
		<Fragment>
			<div className="content-well mb-3">
				<label>Username</label>
				<input
					type="text"
					value={username}
					onChange={handleUpdateUsername}
					className="d-b w-100%"
					placeholder="Username"
				/>
				<div className="mt-2">
					<input
						type="checkbox"
						className="checkbox checkbox-sm"
						id="saveUsername"
						value={saveUsername}
						checked={saveUsername}
						onChange={handleSaveUsername}
					/>
					<label htmlFor="saveUsername">Remember me?</label>
				</div>
			</div>

			{debug && (
				<div className="debug">
					<p>username: {username}</p>
					<p>saveUsername: {saveUsername ? "true" : "false"}</p>
					<p>ls_save_username: {ls_save_username ? "true" : "false"}</p>
					<p>ls_username: {ls_username}</p>
				</div>
			)}
		</Fragment>
	)
}

Username.propTypes = {
	setUsername: func,
}

export default Username
