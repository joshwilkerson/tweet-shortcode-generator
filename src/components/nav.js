import React from "react"
import Icon from "./utils/icon"
import { NavLink } from "react-router-dom"

const Nav = () => {
	return (
		<nav>
			<NavLink exact to="/" activeClassName="active" className="mr-1">
				<Icon symbol="twitter" />
				Tweet Builder
			</NavLink>

			<NavLink to="/settings" activeClassName="active">
				<Icon symbol="cog" />
				Settings
			</NavLink>
		</nav>
	)
}

export default Nav
