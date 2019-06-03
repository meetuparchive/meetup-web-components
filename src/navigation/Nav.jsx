import PropTypes from 'prop-types';
import * as React from 'react';
import cx from 'classnames';

import UXCaptureInlineMark from 'mwp-app-render/lib/components/uxcapture/UXCaptureInlineMark';
import UXCaptureImageLoad from 'mwp-app-render/lib/components/uxcapture/UXCaptureImageLoad';

import swarmLogo from '../../assets/svg/logo--mSwarm--2color.svg';
import scriptLogo from '../../assets/svg/logo--script.svg';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Icon from '../media/Icon';
import AvatarMember from '../media/AvatarMember';
import Avatar from '../media/Avatar';
import SignupModal from '../SignupModal';

import NavItem from './components/NavItem';
import ProfileDropdown from './components/profile/ProfileDropdown';
import NotificationsDropdown from './components/notifications/NotificationsDropdown';
import DashboardDropdown from './components/dashboard/DashboardDropdown';

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
		this.onClickMobileDropdownAction = this.onClickMobileDropdownAction.bind(this);
		this.onClickDropdownAction = this.onClickDropdownAction.bind(this);
		this.onDismissDropdown = this.onDismissDropdown.bind(this);
		this.state = { isSignupModalOpen: false, showMobileDashboard: false };
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
	 * Triggers the Mobile Pro Dashbard to be rendered
	 * @return {undefined}
	 */
	onClickMobileDropdownAction() {
		this.setState(() => ({ showMobileDashboard: true }));
		if (this.props.markAllAsReadOnOpen) {
			this.markAllNotifAsRead();
		}
	}

	/**
	 * Triggers the notifications dropdown action
	 * @return {undefined}
	 */
	onClickDropdownAction() {
		const { notifications } = this.props.navItems;
		const isNotificationsLoaded = Boolean(notifications.list);

		if (isNotificationsLoaded) {
			this.markAllNotifAsRead();
			return;
		}
		const action = notifications.getNotificationsQuery();
		if (action && action.meta && action.meta.request) {
			action.meta.request.then(([resp]) => {
				const { value: notifications } = resp.response;
				this.markAllNotifAsRead(notifications);
			});
		}
		return action;
	}

	/**
	 * Triggers the Mobile Pro Dashbard to be closed
	 * @return {undefined}
	 */
	onDismissDropdown() {
		this.setState(() => ({ showMobileDashboard: false }));
	}

	markAllNotifAsRead = notifications => {
		const { notificationsDropdown, list } = this.props.navItems.notifications;
		const notificationsList = notifications || list;

		if (notificationsList && notificationsList.length) {
			const newList = [...notificationsList];

			newList.sort((a, b) => parseInt(b.updated) - parseInt(a.updated));
			notificationsDropdown.markRead(newList[0].id);
		}
	};

	/**
	 * @return {React.element} the navbar component
	 */
	render() {
		const {
			media,
			self,
			navItems,
			localeCode,
			className,
			markAllAsReadOnOpen, // eslint-disable-line no-unused-vars
			uxCapture,
			...other
		} = this.props;
		const {
			login,
			create,
			signup,
			proDashboard,
			explore,
			messages,
			notifications,
			groups,
			groupDraft,
			profile,
			updatesLabel,
			logo,
			dropdownLoaderLabel,
			experiences,
		} = navItems;
		const isLoggedOut = self.status === 'prereg' || !self.name;
		const classNames = cx('padding--all globalNav', className);
		const proLogo = ((proDashboard.mainAccount || {}).group_photo || {}).thumb_link;
		const proLetter = ((proDashboard.mainAccount || {}).name || '')
			.slice(0, 1)
			.toUpperCase();

		const showScriptLogo = Boolean(media.isAtLargeUp || isLoggedOut);
		const showSwarmLogo = Boolean(
			media.isAtMediumUp && !media.isAtLargeUp && !isLoggedOut
		);
		const isGroupsLoaded = Boolean(groups.list);
		const isNotificationsLoaded = Boolean(notifications.list);

		const notificationContent = isNotificationsLoaded ? (
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

		const profileContent = isGroupsLoaded ? (
			<ProfileDropdown
				settings={profile.profileDropdown.settings}
				help={profile.profileDropdown.help}
				logout={profile.profileDropdown.logout}
				groupHome={profile.profileDropdown.groupHome}
				allGroupsLabel={profile.profileDropdown.allGroupsLabel}
				allGroupsLink={profile.profileDropdown.allGroupsLink}
				profile={profile}
				groups={groups.list}
				groupDraft={groupDraft}
			/>
		) : (
			<DropdownLoader label={dropdownLoaderLabel} />
		);

		const createMeetupLink = create && {
			shrink: true,
			linkTo: create.link,
			label: create.label,
			linkClassName: create.linkClassName,
			className: `${CLASS_UNAUTH_ITEM} navItemLink--createMeetup`,
		};

		let unauthItems = [
			media.isAtMediumUp && createMeetupLink,
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
			self.is_pro_admin && {
				shrink: true,
				linkTo: media.isAtMediumUp ? proDashboard.link : '',
				onAction: !media.isAtMediumUp && this.onClickMobileDropdownAction,
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
								className="padding--halfLeft"
							/>
						</FlexItem>
					</Flex>
				),
			},
			media.isAtMediumUp && !self.is_pro_admin && createMeetupLink,
			media.isAtMediumUp && {
				shrink: true,
				linkTo: experiences.link,
				label: experiences.label,
				linkClassName: experiences.linkClassName,
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
				onClickAction: media.isAtMediumUp && this.onClickDropdownAction,
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
					'display--none': self.is_pro_admin && !media.isAtMediumUp,
				}),
				icon: (
					<Flex noGutters align="center" aria-label={profile.label}>
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
					media.isAtMediumUp && !isGroupsLoaded
						? (...args) => {
								profile.getSelfGroupsQuery(...args);
								profile.getSelfGroupDraftQuery(...args);
						  }
						: undefined,
				dropdownContent: media.isAtMediumUp && profileContent,
			},
		];

		unauthItems = unauthItems.filter(Boolean).map((item, i) => {
			return (
				<NavItem
					key={i}
					shrink={item.shrink}
					linkTo={item.linkTo}
					label={item.label}
					className={item.className}
					linkClassName={item.linkClassName}
					onAction={item.onAction}
				/>
			);
		});

		authItems = authItems.filter(Boolean).map((item, i) => {
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
						onAction={item.onAction}
						hasUpdates={item.hasUpdates}
						linkClassName={item.linkClassName}
					/>
				)
			);
		});

		const scriptLogoAttr = {
			src: scriptLogo,
			alt: logo.logoAccessible,
			height: '44px',
		};

		const scriptLogoIcon = uxCapture ? (
			<React.Fragment>
				<UXCaptureImageLoad
					mark="ux-image-onload-script-logo"
					{...scriptLogoAttr}
				/>
				<UXCaptureInlineMark mark="ux-image-inline-script-logo" />
			</React.Fragment>
		) : (
			<img {...scriptLogoAttr} />
		);

		return (
			<nav
				aria-label="Header navigation"
				role="navigation"
				className={classNames}
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
							className="logo logo--swarm align--left"
							linkClassName="display--inlineBlock"
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
							className="logo logo--script align--left"
							linkClassName="display--inlineBlock"
							icon={scriptLogoIcon}
						/>
					)}

					{this.state.isSignupModalOpen && (
						<SignupModal
							signupOptions={signup.signupModal}
							onDismiss={this.onDismissSignupModal}
						/>
					)}
					{this.state.showMobileDashboard && (
						<DashboardDropdown
							dismissAction={this.onDismissDropdown}
							mobileTabs={proDashboard.mobileTabs}
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
	uxCapture: false,
};

Nav.propTypes = {
	/** Data for the current user */
	self: PropTypes.object,

	/** Info about viewport size */
	media: PropTypes.object,

	/** Data for links and buttons to render into the nav */
	navItems: PropTypes.object,

	/** The locale code of the current user */
	localeCode: PropTypes.string,
	markAllAsReadOnOpen: PropTypes.bool,

	/** Add uxCapture marks in the nav */
	uxCapture: PropTypes.bool,
};

export default Nav;
