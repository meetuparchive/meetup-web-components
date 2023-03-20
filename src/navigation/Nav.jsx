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
			...other
		} = this.props;

		const { isSignupModalOpen, showMobileDashboard, isSearchOpened } = this.state;

		const {
			login,
			create,
			signup,
			proDashboard,
			explore, // eslint-disable-line no-unused-vars
			messages,
			notifications,
			groups,
			groupDraft,
			profile,
			updatesLabel,
			logo,
			dropdownLoaderLabel,
			search,
			tryPro,
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
		const isProAdminDesktop = Boolean(self.is_pro_admin) && media.isAtMediumUp;
		const isCoreDesktop =
			media.isAtMediumUp &&
			Boolean(!self.is_pro_admin) &&
			Boolean(!self.is_pro_org);

		const profileAvatarSize = media.isAtMediumUp ? { medium: true } : { small: true };

		// eslint-disable-next-line no-unused-vars
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
				isProAdminDesktop &&
					Boolean(create.label) &&
					'navItemLink--createMeetupPro'
			),
			onLinkClick: create.onLinkClick,
			actionAttributes: create.actionAttributes,
		};

		const getMessagesIcon = () => {
			if (media.isAtMediumUp) {
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
			if (media.isAtMediumUp) {
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

		const getTryProIcon = () => {
			return (
				<div className="tryProIcon tw-text-white tw-bg-viridian tw-px-1 tw-py-0.5 tw-rounded tw-font-semibold tw-text-xs">
					PRO
				</div>
			);
		};

		const proDashboardIcon = media.isAtMediumUp ? (
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
			isProAdminDesktop && createMeetupLink,
			self.is_pro_admin && {
				shrink: true,
				linkTo: media.isAtMediumUp ? proDashboard.link : '',
				onAction: !media.isAtMediumUp && this.onClickMobileDropdownAction,
				label: media.isAtMediumUp ? proDashboard.label : proDashboard.mobileLabel,
				labelClassName: cx(media.isAtMediumUp && 'navItem-label-pro'),
				className: cx(
					CLASS_AUTH_ITEM,
					'atMedium_display--block',
					!media.isAtMediumUp && 'navItemLink--dashboard'
				),
				linkClassName: cx(media.isAtMediumUp && 'navItemLink-pro'),
				icon: proDashboardIcon,
				onLinkClick: proDashboard.onLinkClick,
			},
			media.isAtMediumUp && !self.is_pro_admin && createMeetupLink,
			{
				shrink: true,
				linkTo: groups.link,
				label: groups.label,
				className: `atMedium_display--none ${CLASS_AUTH_ITEM}`,
				icon: <Icon shape="groups" size="s" className="display--block" />,
			},
			isCoreDesktop && {
				shrink: true,
				linkTo: tryPro.link,
				label: tryPro.label,
				className: 'navItem',
				labelClassName: `navItem-label-pro ${CLASS_AUTH_ITEM}`,
				icon: getTryProIcon(),
				onLinkClick: tryPro.onLinkClick,
				linkClassName: 'navItemLink-pro',
				isTargetBlank: true,
			},
			{
				shrink: true,
				linkTo: messages.link,
				label: messages.label,
				labelClassName: cx(media.isAtMediumUp && 'navItem-label-pro'),
				className: `navItem--messages ${CLASS_AUTH_ITEM}`,
				linkClassName: cx(media.isAtMediumUp && 'navItemLink-pro'),
				counterBadgeClassName: cx(
					media.isAtMediumUp && 'navItem--counterBadgeProMessages'
				),
				icon: getMessagesIcon(),
				hasUpdates: messages.unreadMessages > 0,
				updatesLabel: updatesLabel,
				onLinkClick: messages.onLinkClick,
			},
			{
				shrink: true,
				linkTo: notifications.link,
				label: notifications.label,
				labelClassName: cx(media.isAtMediumUp && 'navItem-label-pro'),
				className: cx('navItem--notifications', CLASS_AUTH_ITEM),
				linkClassName: cx(media.isAtMediumUp && 'navItemLink-pro'),
				counterBadgeClassName: cx(
					media.isAtMediumUp && 'navItem--counterBadgeProNotifications'
				),
				icon: getNotificationsIcon(),
				hasUpdates: notifications.unreadNotifications > 0,
				updatesLabel: updatesLabel,
				onLinkClick: notifications.onLinkClick,
				// if would like to have notification dropdown
				// add onClickAction:this.onClickDropdownAction and dropdownContent:notificationContent
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
						isTargetBlank={item.isTargetBlank}
						actionAttributes={item.actionAttributes}
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
};

export default Nav;
