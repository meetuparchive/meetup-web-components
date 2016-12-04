import React from 'react';
import {
	// Chunk,
	Flex,
	// FlexItem,
	// Section,
} from './layoutUtils';

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
				<Flex>
					{children}
				</Flex>
			</nav>
		);
	}
}

export default Nav;

