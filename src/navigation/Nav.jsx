import PropTypes from 'prop-types';
import React from 'react';

import swarmLogo from '../../assets/svg/logo--mSwarm--2color.svg';
import scriptLogo from '../../assets/svg/logo--script.svg';
import withMatchMedia from '../utils/components/withMatchMedia';
import Flex from '../layout/Flex';

import NavItem from './components/NavItem';

/**
 * @param {Object} props component properties
 * @returns {React.element} Navigation Bar
 */
export class Nav extends React.Component {
	/**
	 * @return {React.element} the navbar component
	 */
	render() {
		const { media, self, unauthItems, authItems, logoAccessible } = this.props;

		const isLoggedOut = self.status === 'prereg' || !self.name;

		const showScriptLogo = Boolean(media.isAtLargeUp || isLoggedOut);
		const showSwarmLogo = Boolean(
			media.isAtMediumUp && !media.isAtLargeUp && !isLoggedOut
		);

		return (
			<nav
				aria-label="Header navigation"
				role="navigation"
				className="padding--all"
				id="globalNav"
			>
				<Flex
					align={media.isAtMediumUp ? 'center' : 'top'}
					justify="spaceBetween"
					className="span--100 navBar"
				>
					{showSwarmLogo && (
						<NavItem
							linkTo="meetup.com"
							className="logo logo--swarm flush--left"
							icon={
								<img src={swarmLogo} alt={logoAccessible} height="48px" />
							}
						/>
					)}

					{showScriptLogo && (
						<NavItem
							linkTo="meetup.com"
							className="logo logo--script flush--left"
							linkClassName="display--block"
							icon={
								<img
									src={scriptLogo}
									alt={logoAccessible}
									height="44px"
								/>
							}
						/>
					)}

					{isLoggedOut ? unauthItems : authItems}
				</Flex>
			</nav>
		);
	}
}

Nav.defaultProps = {
	logoAccessible: 'Meetup Logo',
};
Nav.propTypes = {
	self: PropTypes.object,
	media: PropTypes.object,
	authItems: PropTypes.array,
	unauthItems: PropTypes.array,
	logoAccessible: PropTypes.string,
};

export default withMatchMedia(Nav);
