import React from "react"
import { any } from "prop-types"

const Layout = ({ children }) => {
	return <div className="wrapper">{children}</div>
}

Layout.propTypes = {
	children: any,
}

export default Layout
