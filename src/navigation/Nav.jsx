import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import swarmLogo from '../../assets/svg/logo--mSwarm--2color.svg';
import scriptLogo from '../../assets/svg/logo--script.svg';
import withMatchMedia from '../utils/components/withMatchMedia';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Icon from '../media/Icon';
import AvatarMember from '../media/AvatarMember';

import NavItem from './components/NavItem';
import ProfileDropdown from './components/profile/ProfileDropdown';
import NotificationsDropdown from './components/notifications/NotificationsDropdown';

const CLASS_UNAUTH_ITEM = 'navItem--unauthenticated';
const CLASS_AUTH_ITEM = 'navItem--authenticated';

export const DropdownLoader = ({ label }) => (
	<Section className="valignChildren--center align--center" aria-live="polite">
		<p className="visibility--a11yHide">{label}</p>
		<Icon shape="updates" size="l" />
	</Section>
);

/**
 * @param {Object} props component properties
 * @returns {React.element} Navigation Bar
 */
export class Nav extends React.Component {
	/**
	 * @return {React.element} the navbar component
	 */
	render() {
		const {
			media,
			self,
			logoAccessible,
			navItems,
			dropdownLoaderLabel,
			localeCode,
		} = this.props;
		const {
			login,
			signup,
			proDashboard,
			explore,
			messages,
			notifications,
			groups,
			profile,
		} = navItems;
		const isLoggedOut = self.status === 'prereg' || !self.name;

		const showScriptLogo = Boolean(media.isAtLargeUp || isLoggedOut);
		const showSwarmLogo = Boolean(
			media.isAtMediumUp && !media.isAtLargeUp && !isLoggedOut
		);
		const notificationContent = notifications.list ? (
			<NotificationsDropdown
				self={self}
				notifications={notifications.list}
				onMarkReadAction={notifications.notificationsDropdown.markRead}
				localeCode={localeCode}
				emptyContentLabel={notifications.notificationsDropdown.emptyContentLabel}
				notificationsTitleLabel={notifications.label}
				generateClassicUrl={
					notifications.notificationsDropdown.generateClassicUrl
				}
			/>
		) : (
			<DropdownLoader label={dropdownLoaderLabel} />
		);

		const profileContent = groups ? (
			<ProfileDropdown
				settings={profile.profileDropdown.settings}
				help={profile.profileDropdown.help}
				logout={profile.profileDropdown.logout}
				groupHome={profile.profileDropdown.groupHome}
				allGroupsLabel={profile.profileDropdown.allGroupsLabel}
				profile={profile}
				groups={groups.list}
			/>
		) : (
			<DropdownLoader label={dropdownLoaderLabel} />
		);

		let unauthItems = [
			{
				shrink: true,
				linkTo: login.link,
				label: login.label,
				className: `${CLASS_UNAUTH_ITEM} navItem--login`,
			},
			{
				shrink: true,
				onAction: () => {},
				label: signup.label,
				className: CLASS_UNAUTH_ITEM,
			},
		];

		let authItems = [
			self.isProMember && {
				shrink: true,
				linkTo: proDashboard.link,
				label: proDashboard.label,
				className: cx(
					'text--blue text--bold navItemLink--create display--none atMedium_display--block'
				),
			},
			{
				shrink: true,
				linkTo: explore.link,
				label: explore.label,
				className: cx(CLASS_AUTH_ITEM, { 'flush--left': !media.isAtMediumUp }),
				icon: <Icon shape="search" size="s" className="atMedium_display--none" />,
			},
			{
				shrink: true,
				linkTo: groups.link,
				label: groups.label,
				className: `atMedium_display--none ${CLASS_AUTH_ITEM}`,
				icon: <Icon shape="groups" size="s" className="display--block" />,
			},
			{
				shrink: true,
				linkTo: messages.link,
				label: messages.label,
				className: cx('navItem--messages', CLASS_AUTH_ITEM),
				icon: (
					<Icon
						shape="messages"
						size="s"
						className="display--block atMedium_display--none"
					/>
				),
				hasUpdates: messages.unreadMessages > 0,
			},
			{
				shrink: true,
				linkTo: media.isAtMediumUp ? false : notifications.link,
				label: notifications.label,
				className: cx('navItem--notifications', CLASS_AUTH_ITEM),
				icon: (
					<Icon
						shape="notifications"
						size="s"
						className="display--block atMedium_display--none"
					/>
				),
				onClickAction:
					media.isAtMediumUp && notifications.list.length == 0
						? notifications.getNotificationsQuery
						: false,
				dropdownContent: media.isAtMediumUp && notificationContent,
				hasUpdates: notifications.unreadNotifications > 0,
			},
			{
				shrink: true,
				linkTo: media.isAtMediumUp ? false : '/profile/',
				label: profile.Label,
				labelClassName: 'navItem-label display--block atMedium_display--none',
				className: cx(CLASS_AUTH_ITEM, 'profileDropdown', {
					'profileDropdown--hasGroups': Boolean(
						groups.list && groups.list.length
					),
				}),
				icon: (
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
				),
				onClickAction:
					media.isAtMediumUp && groups.list.length == 0
						? profile.getSelfGroupsQuery
						: false,
				dropdownContent: media.isAtMediumUp && profileContent,
			},
		];

		unauthItems = unauthItems.map((item, i) => {
			return (
				<NavItem
					key={i}
					shrink={item.shrink}
					linkTo={item.linkTo && item.linkTo}
					label={item.label}
					className={item.className}
					onAction={item.onAction && item.onAction}
				/>
			);
		});

		authItems = authItems.map((item, i) => {
			return (
				item && (
					<NavItem
						key={i}
						shrink={item.shrink && item.shrink}
						linkTo={item.linkTo && item.linkTo}
						label={item.label && item.label}
						labelClassName={item.labelClassName && item.labelClassName}
						className={item.className && item.className}
						icon={item.icon && item.icon}
						onClickAction={item.onClickAction && item.onClickAction}
						dropdownContent={item.dropdownContent && item.dropdownContent}
						hasUpdates={item.hasUpdates && item.hasUpdates}
					/>
				)
			);
		});

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
	localeCode: 'en-US',
};
Nav.propTypes = {
	self: PropTypes.object,
	media: PropTypes.object,
	authItems: PropTypes.array,
	unauthItems: PropTypes.array,
	logoAccessible: PropTypes.string,
};

export default withMatchMedia(Nav);
