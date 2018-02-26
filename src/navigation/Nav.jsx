import PropTypes from 'prop-types';
import React from 'react';

import withMatchMedia from '../utils/components/withMatchMedia';
import Flex from '../layout/Flex';

/**
 * @param {Object} props component properties
 * @returns {React.element} Navigation Bar
 */
export class Nav extends React.Component {
	/**
	 * @return {React.element} the navbar component
	 */
	render() {
		const { media, self, unauthItems, authItems, logo } = this.props;

		const isLoggedOut = self.status === 'prereg' || !self.name;

		return (
			<nav
				aria-label="Header navigation"
				role="navigation"
				className="padding--all"
			>
				<Flex
					align={media.isAtMediumUp ? 'center' : 'top'}
					justify="spaceBetween"
					className="span--100 navBar"
				>
					{logo}
					{isLoggedOut ? unauthItems : authItems}
				</Flex>
			</nav>
		);
	}
}

Nav.propTypes = {
	self: PropTypes.object,
	media: PropTypes.object,
	authItems: PropTypes.array,
	unauthItems: PropTypes.array,
	logo: PropTypes.array,
};

export default withMatchMedia(Nav);
