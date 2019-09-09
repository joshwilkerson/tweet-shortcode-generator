import React, { Fragment, useState, useEffect } from "react"
import { func } from "prop-types"
import { Link } from "react-router-dom"

import BitlyLink from "./bitly_link"

const URL = props => {
	const ls_API_key = localStorage.getItem("bctt_API_key")

	const [url, setUrl] = useState("")
	const [useShortUrl, setUseShortUrl] = useState(false)
	const [shortUrl, setShortUrl] = useState("")

	const hasAPIKey = ls_API_key && ls_API_key != "" ? true : false
	const urlFormatted = url.startsWith("http://") || url.startsWith("https://")

	const debug = false

	useEffect(() => {
		props.setUrl(useShortUrl ? shortUrl : url)
	})

	return (
		<Fragment>
			<div className="content-well mb-3">
				<label>URL</label>
				<input
					type="text"
					value={url}
					onChange={e => setUrl(e.target.value)}
					className={`d-b w-100% mb-2`}
					placeholder="URL"
					autoFocus
				/>
				<div className="d-f ai-c">
					<input
						type="checkbox"
						className="checkbox checkbox-sm"
						id="useShortUrl"
						value={useShortUrl}
						checked={useShortUrl}
						disabled={!urlFormatted}
						onChange={() => setUseShortUrl(useShortUrl ? false : true)}
					/>
					<label htmlFor="useShortUrl">Shorten URL with Bit.ly</label>
					{!hasAPIKey && (
						<span className="d-ib w-a alert alert--warning ml-1">
							Bit.ly unavailable. To enbale, add your Generic API Key in{" "}
							<Link to="/settings">settings</Link>
						</span>
					)}

					{useShortUrl && hasAPIKey && (
						<BitlyLink url={url} setShortUrl={setShortUrl} />
					)}
				</div>

				{url && !urlFormatted && (
					<span className="d-b w-100% mt-2 alert alert--error">
						URL must start with "http://" or "https:'//"
					</span>
				)}
			</div>
			{debug && (
				<div className="debug">
					<p>url: {url}</p>
					<p>urlFormatted: {urlFormatted ? "true" : "false"}</p>
					<p>shortUrl: {shortUrl}</p>
					<p>useShortUrl: {useShortUrl ? "true" : "false"}</p>
				</div>
			)}
		</Fragment>
	)
}

URL.propTypes = {
	setUrl: func,
}

export default URL
