import React, { useState } from "react"
import { Button } from "./shared_elements"
import { Route } from "react-router-dom"

const Settings = () => {
	const ls_API_key = localStorage.getItem("bctt_API_key")
	const [APIKey, setAPIKey] = useState(ls_API_key ? ls_API_key : "")

	return (
		<div className="d-b p-4">
			<h2 className="mt-0">Settings</h2>
			<label>Bit.ly Generic API Key</label>

			<input
				type="text"
				value={APIKey}
				className="w-100% d-b mb-1"
				onChange={e => setAPIKey(e.target.value)}
			/>
			<Route
				render={({ history }) => (
					<Button
						size="md"
						text="Save"
						theme="success"
						className="mr-4p"
						onClick={() => {
							localStorage.setItem("bctt_API_key", APIKey)
							history.push("/")
						}}
					/>
				)}
			/>
		</div>
	)
}

export default Settings
