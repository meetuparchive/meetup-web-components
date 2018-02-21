import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import swarmLogo from '../../assets/svg/logo--mSwarm--2color.svg';
import scriptLogo from '../../assets/svg/logo--script.svg';
import withMatchMedia from '../utils/components/withMatchMedia';
import FlexItem from '../layout/FlexItem';
import AvatarMember from '../media/AvatarMember';
import Flex from '../layout/Flex';
import Section from '../layout/Section';

import Icon from '../media/Icon';

import NavItem from './components/NavItem';
import ProfileDropdown from './components/ProfileDropdown';
import NotificationsDropdown from './components/NotificationsDropdown';

const DropdownLoader = ({ label }) => (
	<Section className="valignChildren--center align--center" aria-live="polite">
		<p className="visibility--a11yHide">{label}</p>
		<Icon shape="updates" size="l" />
	</Section>
);

/**
 * @param {Object} props component properties
 * @returns {React.element} Navigation Bar
 */
export class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.onDismissSignUpModal = this.onDismissSignUpModal.bind(this);
		this.onClickSignUpAction = this.onClickSignUpAction.bind(this);

		this.state = {
			isSignUpModalOpen: false,
		};
	}

	onDismissSignUpModal() {
		this.setState(() => ({ isSignUpModalOpen: false }));
	}
	onClickSignUpAction() {
		this.setState(() => ({ isSignUpModalOpen: true }));
	}

	render() {
		const {
			media,
			self,
			notifications,
			unreadNotifications,
			unreadMessages,
			groups,
			localeCode,
		} = this.props;

		const CLASS_UNAUTH_ITEM = 'navItem--unauthenticated';
		const CLASS_AUTH_ITEM = 'navItem--authenticated';
		const isLoggedOut = self.status === 'prereg' || !self.name;

		const notificationContent = notifications ? (
			<NotificationsDropdown
				self={self}
				notifications={notifications}
				onMarkReadAction={this.props.markRead}
				localeCode={localeCode}
			/>
		) : (
			<DropdownLoader label="Loading" />
		);

		// #TODO: links here are HIGHLY!!! temporary, we will
		// be adding this data to the /self endpoint
		// @see https://meetup.atlassian.net/browse/MW-1177
		const profileContent = groups ? (
			<ProfileDropdown profileUrl={`/members/${self.id}`} groups={groups} />
		) : (
			<DropdownLoader label="Loading" />
		);

		const unauthItems = [
			<NavItem
				key={0}
				shrink
				linkTo="meetup.com"
				label="Login"
				className={`${CLASS_UNAUTH_ITEM} navItem--login`}
			/>,
			<NavItem
				key={1}
				shrink
				onAction={this.onClickSignUpAction}
				label="Signup"
				className={CLASS_UNAUTH_ITEM}
			/>,
		];

		const authItems = [
			<NavItem
				key={0}
				shrink
				linkTo="meetup.com"
				label="Explore"
				className={cx(CLASS_AUTH_ITEM, { 'flush--left': !media.isAtMediumUp })}
				icon={<Icon shape="search" size="s" className="atMedium_display--none" />}
			/>,
			<NavItem
				key={1}
				shrink
				linkTo="meetup.com"
				label="Groups"
				className={`atMedium_display--none ${CLASS_AUTH_ITEM}`}
				icon={<Icon shape="groups" size="s" className="display--block" />}
			/>,
			<NavItem
				key={2}
				shrink
				linkTo="meetup.com"
				label="Messages"
				className={cx('navItem--messages', CLASS_AUTH_ITEM)}
				icon={
					<Icon
						shape="messages"
						size="s"
						className="display--block atMedium_display--none"
					/>
				}
				hasUpdates={unreadMessages > 0}
			/>,
			<NavItem
				key={3}
				shrink
				linkTo={media.isAtMediumUp ? false : 'meetup.com'}
				label="Notifications"
				className={cx('navItem--notifications', CLASS_AUTH_ITEM)}
				icon={
					<Icon
						shape="notifications"
						size="s"
						className="display--block atMedium_display--none"
					/>
				}
				onClickAction={
					media.isAtMediumUp && !notifications
						? this.props.getNotificationsQuery
						: false
				}
				dropdownContent={media.isAtMediumUp && notificationContent}
				hasUpdates={unreadNotifications > 0}
			/>,
			<NavItem
				key={4}
				shrink
				linkTo={media.isAtMediumUp ? false : '/profile/'}
				label="Profile"
				labelClassName="navItem-label display--block atMedium_display--none"
				className={cx(CLASS_AUTH_ITEM, 'profileDropdown', {
					'profileDropdown--hasGroups': Boolean(groups && groups.length),
				})}
				icon={
					<Flex noGutters align="center">
						<FlexItem>
							<AvatarMember small member={self} />
						</FlexItem>
						<FlexItem
							shrink
							className="display--none atMedium_display--block"
						>
							<Icon
								shape="chevron-down"
								size="xxs"
								className="padding--left-half"
							/>
						</FlexItem>
					</Flex>
				}
				onClickAction={
					media.isAtMediumUp && !groups ? this.props.getSelfGroupsQuery : false
				}
				dropdownContent={media.isAtMediumUp && profileContent}
			/>,
		];

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
				{/* this.state.isSignUpModalOpen && (
					<SignUpModal
						onDismiss={this.onDismissSignUpModal}
						localeCode={localeCode}
					/>
				)*/}
			</nav>
		);
	}
}

NavBar.propTypes = {
	self: PropTypes.object,
	media: PropTypes.object,
	notifications: PropTypes.array,
	unreadNotifications: PropTypes.number,
	unreadMessages: PropTypes.number,
	groups: PropTypes.array,
};

export default withMatchMedia(NavBar);
