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
import NavbarSearch, { NAVBAR_SEARCH_INPUT_ID } from './components/search/NavbarSearch';

import MESSAGE_ICON from '../../assets/svg/message.svg';
import NOTIFICATION_ICON from '../../assets/svg/notification.svg';
import PRO_DASHBOARD_ICON from '../../assets/svg/proDashboard.svg';

const CLASS_UNAUTH_ITEM = 'navItem--unauthenticated';
const CLASS_AUTH_ITEM = 'navItem--authenticated';
const SEARCH_INPUT_MAX_WIDTH = 500;
const SEARCH_INPUT_HEIGHT = 44;

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
		this.onSearchIconClick = this.onSearchIconClick.bind(this);
		this.state = {
			isSignupModalOpen: false,
			showMobileDashboard: false,
			isSearchOpened: false,
		};
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
		if (this.props.navItems.signup.signupModal.onOpen)
			this.props.navItems.signup.signupModal.onOpen();

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

	onSearchIconClick() {
		this.setState(state => ({ isSearchOpened: !state.isSearchOpened }));
		if (typeof document !== 'undefined') {
			const inputEl = document.getElementById(NAVBAR_SEARCH_INPUT_ID);
			if (inputEl) {
				inputEl.focus();
			}
		}
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
			isSearchEnabled,
			onSearchCallback,
			isNewNavActive,
			isNewNavsOrder,
			isProInNavFFEnabled = false,
			...other
		} = this.props;

		const { isSignupModalOpen, showMobileDashboard, isSearchOpened } = this.state;

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
			search,
		} = navItems;
		const isLoggedOut = self.status === 'prereg' || !self.name;
		const classNames = cx('globalNav padding--all', className);
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
		const isNewNavActiveDesktop = isNewNavActive && media.isAtMediumUp;
		const isProAdminEasyCreateGroup =
			Boolean(self.is_pro_admin) && media.isAtMediumUp;
		const isProInNavDesktop = isProInNavFFEnabled && media.isAtMediumUp;

		const profileAvatarSize =
			isNewNavActiveDesktop || isProAdminEasyCreateGroup
				? { medium: true }
				: { small: true };

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
				payments={profile.profileDropdown.payments}
				settings={profile.profileDropdown.settings}
				help={profile.profileDropdown.help}
				logout={profile.profileDropdown.logout}
				groupHome={profile.profileDropdown.groupHome}
				allGroupsLabel={profile.profileDropdown.allGroupsLabel}
				allGroupsLink={profile.profileDropdown.allGroupsLink}
				savedEvents={profile.profileDropdown.savedEvents}
				yourGroups={profile.profileDropdown.yourGroups}
				yourEvents={profile.profileDropdown.yourEvents}
				profile={profile}
				groups={groups.list}
				groupDraft={groupDraft}
				isNewNavActive={isNewNavActive}
				isNewNavsOrder={
					isNewNavsOrder && (localeCode ? localeCode.includes('en') : false)
				}
			/>
		) : (
			<DropdownLoader label={dropdownLoaderLabel} />
		);

		const createMeetupLink = create && {
			shrink: true,
			linkTo: create.link,
			label: create.label,
			linkClassName: create.linkClassName,
			className: cx(
				CLASS_UNAUTH_ITEM,
				'navItemLink--createMeetup',
				isProAdminEasyCreateGroup &&
					Boolean(create.label) &&
					'navItemLink--createMeetupPro'
			),
			onLinkClick: create.onLinkClick,
		};

		const experiencesLink = experiences &&
			experiences.link && {
				shrink: true,
				linkTo: experiences.link,
				label: experiences.label,
				linkClassName: 'navItemLink--experiences',
				icon: <div className="pill">NEW</div>,
			};

		const getMessagesIcon = () => {
			if (isProAdminEasyCreateGroup || isNewNavActiveDesktop) {
				return <img className="proIcon" src={MESSAGE_ICON} />;
			}

			return (
				<Icon
					shape="messages"
					size="s"
					className={cx(
						'display--block',
						!isNewNavActive && 'atMedium_display--none'
					)}
				/>
			);
		};

		const getNotificationsIcon = () => {
			if (isProAdminEasyCreateGroup || isNewNavActiveDesktop) {
				return <img className="proIcon" src={NOTIFICATION_ICON} />;
			}

			return (
				<Icon
					shape="notifications"
					size="s"
					className={cx(
						'display--block',
						!isNewNavActive && 'atMedium_display--none'
					)}
				/>
			);
		};

		const getMessagesLabel = () => {
			if (isProInNavDesktop) {
				return messages.label;
			}

			return isNewNavActiveDesktop && !isProAdminEasyCreateGroup
				? ''
				: messages.label;
		};

		const getNotificataionsLabel = () => {
			if (isProInNavDesktop) {
				return notifications.label;
			}

			return isNewNavActiveDesktop && !isProAdminEasyCreateGroup
				? ''
				: notifications.label;
		};

		const proDashboardIcon = isProAdminEasyCreateGroup ? (
			<img className="proIcon" src={PRO_DASHBOARD_ICON} />
		) : (
			<Flex noGutters align="center">
				<FlexItem>
					{proLogo ? (
						<Avatar
							src={proLogo}
							className="display--block margin--left circular atMedium_display--none"
							small
						/>
					) : (
						<div className="proDashboard-noLogo circular margin--left text--secondary atMedium_display--none">
							{proLetter}
						</div>
					)}
				</FlexItem>
				<FlexItem shrink className="display--block atMedium_display--none">
					<Icon shape="chevron-down" size="xxs" className="padding--halfLeft" />
				</FlexItem>
			</Flex>
		);

		let unauthItems = [
			media.isAtMediumUp && createMeetupLink,
			media.isAtMediumUp && experiencesLink,
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
			isSearchEnabled &&
				!media.isAtMediumUp && {
					shrink: true,
					icon: search.icon,
					className: `${search.className} navItem--searchIcon`,
					onAction: this.onSearchIconClick,
				},
		];

		let authItems = [
			isProAdminEasyCreateGroup && createMeetupLink,
			self.is_pro_admin && {
				shrink: true,
				linkTo: media.isAtMediumUp ? proDashboard.link : '',
				onAction: !media.isAtMediumUp && this.onClickMobileDropdownAction,
				label: media.isAtMediumUp ? proDashboard.label : proDashboard.mobileLabel,
				labelClassName: cx(isProAdminEasyCreateGroup && 'navItem-label-pro'),
				className: cx(
					CLASS_AUTH_ITEM,
					'atMedium_display--block',
					!isProAdminEasyCreateGroup && 'navItemLink--dashboard'
				),
				linkClassName: cx(isProAdminEasyCreateGroup && 'navItemLink-pro'),
				icon: proDashboardIcon,
				onLinkClick: proDashboard.onLinkClick,
			},
			media.isAtMediumUp && !self.is_pro_admin && createMeetupLink,
			media.isAtMediumUp && experiencesLink,
			!isNewNavActive &&
				!isProAdminEasyCreateGroup && {
					shrink: true,
					linkTo: explore.link,
					label: explore.label,
					className: CLASS_AUTH_ITEM,
					icon: (
						<Icon
							shape="search"
							size="s"
							className="atMedium_display--none"
						/>
					),
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
				label: getMessagesLabel(),
				labelClassName: cx(
					(isProAdminEasyCreateGroup || isProInNavDesktop) &&
						'navItem-label-pro'
				),
				className: `navItem--messages ${CLASS_AUTH_ITEM}`,
				linkClassName: cx(
					(isProAdminEasyCreateGroup || isProInNavDesktop) && 'navItemLink-pro'
				),
				counterBadgeClassName: cx(
					isNewNavActiveDesktop &&
						!isProAdminEasyCreateGroup &&
						!isProInNavDesktop &&
						'navItem--counterBadge',
					(isProAdminEasyCreateGroup || isProInNavDesktop) &&
						'navItem--counterBadgeProMessages'
				),
				icon: getMessagesIcon(),
				hasUpdates: messages.unreadMessages > 0,
				updatesLabel: updatesLabel,
				onLinkClick: messages.onLinkClick,
			},
			{
				shrink: true,
				linkTo:
					media.isAtMediumUp &&
					!isNewNavActive &&
					!isProAdminEasyCreateGroup &&
					!isProInNavDesktop
						? ''
						: notifications.link,
				label: getNotificataionsLabel(),
				labelClassName: cx(
					(isProAdminEasyCreateGroup || isProInNavDesktop) &&
						'navItem-label-pro'
				),
				className: cx('navItem--notifications', CLASS_AUTH_ITEM),
				linkClassName: cx(
					(isProAdminEasyCreateGroup || isProInNavDesktop) && 'navItemLink-pro'
				),
				counterBadgeClassName: cx(
					isNewNavActiveDesktop &&
						!isProAdminEasyCreateGroup &&
						!isProInNavDesktop &&
						'navItem--counterBadge',
					(isProAdminEasyCreateGroup || isProInNavDesktop) &&
						'navItem--counterBadgeProNotifications'
				),
				icon: getNotificationsIcon(),
				onClickAction:
					(!isNewNavActive &&
						!isProAdminEasyCreateGroup &&
						!isProInNavDesktop &&
						media.isAtMediumUp &&
						this.onClickDropdownAction) ||
					undefined,
				dropdownContent:
					(!isNewNavActive &&
						!isProAdminEasyCreateGroup &&
						!isProInNavDesktop &&
						media.isAtMediumUp &&
						notificationContent) ||
					undefined,
				hasUpdates: notifications.unreadNotifications > 0,
				updatesLabel: updatesLabel,
				onLinkClick: notifications.onLinkClick,
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
							<AvatarMember
								member={self}
								{...profileAvatarSize}
								badgeType={profile.badgeType}
							/>
						</FlexItem>
						<FlexItem
							shrink
							className="display--none atMedium_display--block"
						>
							<Icon
								shape="chevron-down"
								size="xxs"
								className="padding--halfLeft"
								id="profileChevronIcon"
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
				dropdownContent: media.isAtMediumUp ? profileContent : undefined,
			},
		];

		unauthItems = unauthItems.filter(Boolean).map((item, i) => {
			return (
				<NavItem
					key={i}
					shrink={item.shrink}
					linkTo={item.linkTo}
					label={item.label}
					icon={item.icon}
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
						counterBadgeClassName={item.counterBadgeClassName}
						icon={item.icon}
						onClickAction={item.onClickAction}
						dropdownContent={item.dropdownContent}
						onAction={item.onAction}
						hasUpdates={item.hasUpdates}
						linkClassName={item.linkClassName}
						isNewNavActive={isNewNavActive}
						onLinkClick={item.onLinkClick}
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

		const searchInputStyle = isSearchOpened
			? {
					overflow: 'hidden',
					transition: 'max-height .2s ease-out, opacity .4s ease-in-out',
					height: 'auto',
					maxHeight: '60px',
					opacity: 1,
			  }
			: {
					overflow: 'hidden',
					maxHeight: 0,
					opacity: 0,
					paddingTop: 0,
					transition:
						'max-height .2s ease-out, opacity .1s ease-in-out, padding .1s ease-in-out',
			  };

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
							onLinkClick={logo.onLinkClick}
						/>
					)}

					{showScriptLogo && (
						<NavItem
							shrink={isSearchEnabled && media.isAtMediumUp}
							linkTo={logo.link}
							className="logo logo--script align--left"
							linkClassName="display--inlineBlock"
							icon={scriptLogoIcon}
							onLinkClick={logo.onLinkClick}
						/>
					)}

					{isSearchEnabled &&
						(self.is_pro_admin ? media.isAtLargeUp : media.isAtMediumUp) && (
							<FlexItem>
								<NavbarSearch
									onSearchCallback={onSearchCallback}
									placeholder={search.placeholder}
									style={{
										maxWidth: SEARCH_INPUT_MAX_WIDTH,
										height: SEARCH_INPUT_HEIGHT,
									}}
									isNewNavActive={isNewNavActive}
								/>
							</FlexItem>
						)}

					{isSignupModalOpen && (
						<SignupModal
							signupOptions={signup.signupModal}
							onDismiss={this.onDismissSignupModal}
							appleOnClick={signup.signupModal.appleOnClick}
							googleOnClick={signup.signupModal.googleOnClick}
							facebookOnClick={signup.signupModal.facebookOnClick}
							emailOnClick={signup.signupModal.emailOnClick}
						/>
					)}
					{showMobileDashboard && (
						<DashboardDropdown
							dismissAction={this.onDismissDropdown}
							mobileTabs={proDashboard.mobileTabs}
						/>
					)}

					{isLoggedOut ? unauthItems : authItems}
				</Flex>
				{isSearchEnabled &&
					!media.isAtMediumUp && (
						<div
							className={cx({ 'padding--top': isSearchOpened })}
							style={searchInputStyle}
						>
							<NavbarSearch
								onSearchCallback={onSearchCallback}
								placeholder={search.placeholder}
								style={{ height: SEARCH_INPUT_HEIGHT }}
								isNewNavActive={false}
							/>
						</div>
					)}
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

	isSearchEnabled: PropTypes.bool,
	onSearchCallback: PropTypes.func,

	/** Flag to indicate that new Nav should be shown (same as in build-meetup/homepage) */
	isNewNavActive: PropTypes.bool,

	// Flag to indicate if updated Core nav is shown and for adding Pro to the Core Nav
	isProInNavFFEnabled: PropTypes.bool,
};

export default Nav;
