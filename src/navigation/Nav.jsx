import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import swarmLogo from '../../assets/svg/logo--mSwarm--2color.svg';
import scriptLogo from '../../assets/svg/logo--script.svg';
import withMatchMedia from '../utils/components/withMatchMedia';
import Flex from '../layout/Flex';

import NavItem from './NavItem';

/**
 * @param {Object} props component properties
 * @returns {React.element} Navigation Bar
 */
export class Nav extends React.Component {
	/**
	 * @return {React.element} the navbar component
	 */
	render() {
		const { media, self, unauthItems, authItems } = this.props;

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
							icon={<img src={swarmLogo} alt="Meetup Logo" height="48px" />}
						/>
					)}

					{showScriptLogo && (
						<NavItem
							linkTo="meetup.com"
							className="logo logo--script flush--left"
							linkClassName="display--block"
							icon={
								<img src={scriptLogo} alt="Meetup Logo" height="44px" />
							}
						/>
					)}

					<NavItem
						shrink
						linkTo="meetup.com"
						label="Create a Meetup"
						className={cx(
							'text--blue text--bold navItemLink--create display--none atMedium_display--block'
						)}
					/>

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
};

export default withMatchMedia(Nav);
