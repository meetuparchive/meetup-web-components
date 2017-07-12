import React from 'react';

/**
 * Site-wide header component using SQ2 styles
 * @see {@link http://meetup.github.io/sassquatch2/}
 * @module Header
 */
class Header extends React.Component {
	render() {
		const { children, ...other } = this.props;

		const navStyle = {
			borderBottom: '1px solid gray',
			backgroundColor: 'rgba(230, 233, 236, 1)',
		};

		return (
			<header
				style={navStyle}
				role='banner'
				aria-label='Site header'
				{...other}>
				{children}
			</header>
		);
	}
}

export default Header;
