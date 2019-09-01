import React from "react"
import { func, string } from "prop-types"

class URLShortener extends React.Component {
	state = {
		initialUrl: this.props.url || "",
		encodedUrl: "",
		longUrl: "",
		shortUrl: "",
		error: "",
	}

	getShortURL = () => {
		const token = process.env.API_TOKEN
		const basePath = "https://api-ssl.bitly.com/v3/shorten"

		let fetchURL = `${basePath}?access_token=${token}&longUrl=${this.state.encodedUrl}&format=json`

		fetch(fetchURL)
			.then(response => response.json())
			.then(data => {
				this.setState({
					shortUrl: data.data.url,
					longUrl: data.data.long_url,
				})
				this.props.setUrl(this.state.shortUrl)
			})
			.catch(error => {
				this.setState({ error: error })
			})
	}

	handleInputChange = e => {
		const value = e.target.value
		const encodedValue = encodeURIComponent(value)

		this.setState({ initialUrl: value, encodedUrl: encodedValue })
	}

	render() {
		const debug = false

		return (
			<div className={this.props.className}>
				<input
					value={this.state.initialUrl}
					onChange={this.handleInputChange}
					type="text"
					className="d-b w-100%"
				/>
				<button
					onClick={this.getShortURL}
					className="btn btn-primary btn-md mt-1"
					disabled={this.state.encodedUrl === ""}
				>
					Get Short URL
				</button>
				{this.state.shortUrl && (
					<p>
						short url:{" "}
						<a
							href={this.state.shortUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							{this.state.shortUrl}
						</a>
					</p>
				)}

				{debug && (
					<div>
						<p>initialUrl: {this.state.initialUrl}</p>
						<p>encodedUrl: {this.state.encodedUrl}</p>
						<p>longUrl: {this.state.longUrl}</p>
						<p>shortUrl: {this.state.shortUrl}</p>
					</div>
				)}
			</div>
		)
	}
}

URLShortener.propTypes = {
	setUrl: func,
	className: string,
	url: string,
}

URLShortener.defaultProps = {
	className: "",
}

export default URLShortener
