import React from 'react';

/**
 * Navigation component using SQ2 styles
 * @see {@link http://meetup.github.io/sassquatch2/}
 * @module Nav
 */
class Nav extends React.Component {
	render() {
		const {
			children,
			...other
		} = this.props;

		return (
			<nav
				role='navigation'
				{...other}>
				<ul className='row resetList'>
					{children}
				</ul>
			</nav>
		);
	}
}

export default Nav;

