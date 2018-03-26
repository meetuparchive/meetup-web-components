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
import Avatar from '../media/Avatar';
import SignupModal from '../SignupModal';

import NavItem from './components/NavItem';
import ProfileDropdown from './components/profile/ProfileDropdown';
import NotificationsDropdown from './components/notifications/NotificationsDropdown';

const CLASS_UNAUTH_ITEM = 'navItem--unauthenticated';
const CLASS_AUTH_ITEM = 'navItem--authenticated';

export const DropdownLoader = ({ label }) => (
	<div className="valignChildren--center align--center" aria-live="polite">
		<p className="visibility--a11yHide">{label}</p>
		<Icon shape="updates" size="l" />
	</div>
);

/**
 * @param {Object} props component properties
 * @returns {React.element} Navigation Bar
 */
export class Nav extends React.Component {
	/**
	 * @constructor
	 * @param {Object} props properties passed into component
	 */
	constructor(props) {
		super(props);
		this.onDismissSignupModal = this.onDismissSignupModal.bind(this);
		this.onClickSignupAction = this.onClickSignupAction.bind(this);
		this.state = { isSignupModalOpen: false };
	}

	/**
	 * Triggers the SignupModal to be closed
	 * @return {undefined}
	 */
	onDismissSignupModal() {
		this.setState(() => ({ isSignupModalOpen: false }));
	}

	/**
	 * Triggers the SignupModal to be rendered
	 * @return {undefined}
	 */
	onClickSignupAction() {
		this.setState(() => ({ isSignupModalOpen: true }));
	}
	/**
	 * @return {React.element} the navbar component
	 */
	render() {
		const { media, self, navItems, localeCode, className, ...other } = this.props;
		const {
			login,
			signup,
			proDashboard,
			explore,
			messages,
			notifications,
			groups,
			profile,
			updatesLabel,
			logo,
			dropdownLoaderLabel,
		} = navItems;
		const isLoggedOut = self.status === 'prereg' || !self.name;
		const classNames = cx('padding--all', className);
		const proLogo = ((proDashboard.mainAccount || {}).group_photo || {}).thumb_link;
		const proLetter = ((proDashboard.mainAccount || {}).name || '')
			.slice(0, 1)
			.toUpperCase();

		const showScriptLogo = Boolean(media.isAtLargeUp || isLoggedOut);
		const showSwarmLogo = Boolean(
			media.isAtMediumUp && !media.isAtLargeUp && !isLoggedOut
		);
		const notificationContent =
			notifications.list.length > 0 ? (
				<NotificationsDropdown
					self={self}
					notifications={notifications.list}
					onMarkReadAction={notifications.notificationsDropdown.markRead}
					localeCode={localeCode}
					emptyContentLabel={
						notifications.notificationsDropdown.emptyContentLabel
					}
					notificationsTitleLabel={notifications.label}
					generateClassicUrl={
						notifications.notificationsDropdown.generateClassicUrl
					}
				/>
			) : (
				<DropdownLoader label={dropdownLoaderLabel} />
			);

		const profileContent =
			groups.list.length > 0 ? (
				<ProfileDropdown
					settings={profile.profileDropdown.settings}
					help={profile.profileDropdown.help}
					logout={profile.profileDropdown.logout}
					groupHome={profile.profileDropdown.groupHome}
					allGroupsLabel={profile.profileDropdown.allGroupsLabel}
					allGroupsLink={profile.profileDropdown.allGroupsLink}
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
				onAction: this.onClickSignupAction,
				label: signup.label,
				className: CLASS_UNAUTH_ITEM,
			},
		];

		let authItems = [
			self.isProMember && {
				shrink: true,
				linkTo: proDashboard.link,
				label: media.isAtMediumUp ? proDashboard.label : proDashboard.mobileLabel,
				className: `${CLASS_AUTH_ITEM} navItemLink--dashboard atMedium_display--block`,
				icon: (
					<Flex noGutters align="center">
						<FlexItem>
							{proLogo ? (
								<Avatar
									src={proLogo}
									className="display--block atMedium_display--none margin--left circular"
									small
								/>
							) : (
								<div className="proDashboard-noLogo atMedium_display--none circular margin--left text--secondary">
									{proLetter}
								</div>
							)}
						</FlexItem>
						<FlexItem
							shrink
							className="display--block atMedium_display--none"
						>
							<Icon
								shape="chevron-down"
								size="xxs"
								className="padding--left-half"
							/>
						</FlexItem>
					</Flex>
				),
			},
			{
				shrink: true,
				linkTo: explore.link,
				label: explore.label,
				className: CLASS_AUTH_ITEM,
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
				className: `navItem--messages ${CLASS_AUTH_ITEM}`,
				icon: (
					<Icon
						shape="messages"
						size="s"
						className="display--block atMedium_display--none"
					/>
				),
				hasUpdates: messages.unreadMessages > 0,
				updatesLabel: updatesLabel,
			},
			{
				shrink: true,
				linkTo: media.isAtMediumUp ? '' : notifications.link,
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
					media.isAtMediumUp && notifications.list.length === 0
						? notifications.getNotificationsQuery
						: false,
				dropdownContent: media.isAtMediumUp && notificationContent,
				hasUpdates: notifications.unreadNotifications > 0,
				updatesLabel: updatesLabel,
			},
			{
				shrink: true,
				linkTo: media.isAtMediumUp ? '' : profile.link,
				label: profile.label,
				labelClassName: 'navItem-label display--block atMedium_display--none',
				className: cx(CLASS_AUTH_ITEM, 'profileDropdown', {
					'profileDropdown--hasGroups': Boolean(
						groups.list && groups.list.length
					),
					'display--none': self.isProMember && !media.isAtMediumUp,
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
					media.isAtMediumUp && groups.list.length === 0
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
					linkTo={item.linkTo}
					label={item.label}
					className={item.className}
					onAction={item.onAction}
				/>
			);
		});

		authItems = authItems.map((item, i) => {
			return (
				item && (
					<NavItem
						key={i}
						shrink={item.shrink}
						linkTo={item.linkTo}
						label={item.label}
						labelClassName={item.labelClassName}
						className={item.className}
						icon={item.icon}
						onClickAction={item.onClickAction}
						dropdownContent={item.dropdownContent}
						hasUpdates={item.hasUpdates}
					/>
				)
			);
		});

		return (
			<nav
				aria-label="Header navigation"
				role="navigation"
				className={classNames}
				id="globalNav"
				{...other}
			>
				<Flex
					align={media.isAtMediumUp ? 'center' : 'top'}
					justify="spaceBetween"
					className="span--100 navBar"
				>
					{showSwarmLogo && (
						<NavItem
							linkTo={logo.link}
							className="logo logo--swarm flush--left"
							icon={
								<img
									src={swarmLogo}
									alt={logo.logoAccessible}
									height="48px"
								/>
							}
						/>
					)}

					{showScriptLogo && (
						<NavItem
							linkTo={logo.link}
							className="logo logo--script flush--left"
							linkClassName="display--block"
							icon={
								<img
									src={scriptLogo}
									alt={logo.logoAccessible}
									height="44px"
								/>
							}
						/>
					)}

					{this.state.isSignupModalOpen && (
						<SignupModal
							signupOptions={signup.signupModal}
							onDismiss={this.onDismissSignupModal}
						/>
					)}

					{isLoggedOut ? unauthItems : authItems}
				</Flex>
			</nav>
		);
	}
}

Nav.defaultProps = {
	localeCode: 'en-US',
};

Nav.propTypes = {
	self: PropTypes.object,
	media: PropTypes.object,
	navItems: PropTypes.object,
};

export default withMatchMedia(Nav);
