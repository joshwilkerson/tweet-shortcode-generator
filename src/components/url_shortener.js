import React from "react"
import { func } from "prop-types"

class URLShortener extends React.Component {
	state = {
		initialUrl: "",
		encodedUrl: "",
		longUrl: "",
		shortUrl: "",
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
		return (
			<div>
				<input
					value={this.state.initialUrl}
					onChange={this.handleInputChange}
				/>
				<button onClick={this.getShortURL}>Get Short URL</button>
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
			</div>
		)
	}
}

URLShortener.propTypes = {
	setUrl: func,
}

export default URLShortener
