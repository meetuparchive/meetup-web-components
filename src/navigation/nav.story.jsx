import React from 'react';
import { Router, Route } from 'react-router';
import { storiesOf } from '@storybook/react';
import { MOCK_MEMBER } from 'meetup-web-mocks/lib/api';
import { MOCK_NOTIFICATIONS_LIST } from 'meetup-web-mocks/lib/notifications/api';
import withMatchMedia from '../utils/components/withMatchMedia';
import { createMemoryHistory } from 'history';

import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';

import Nav from './Nav';

const TestNav = withMatchMedia(Nav);

const updatedNotif = MOCK_NOTIFICATIONS_LIST.map(notif => {
	const timeSince = new Date('1995-12-17T03:24:00');
	return { ...notif, formattedTimeSince: timeSince.toDateString() };
});

export const navItemsFactory = () => {
	return {
		dropdownLoaderLabel: 'Loading',
		updatesLabel: 'Updates',
		logo: { logoAccessible: 'Meetup Logo', link: 'meetup.com' },
		login: { link: 'meetup.com/login', label: 'Login' },
		create: { link: 'meetup.com/create', label: 'Create a Meetup' },
		signup: {
			label: 'Sign up',
			signupModal: {
				orLabel: 'Or',
				title: 'Signup',
				google: { link: 'google.com', label: 'Google' },
				facebook: { link: 'facebook.com', label: 'Facebook' },
				email: { link: 'meetup.com/email', label: 'Email' },
				login: {
					text: 'Already a member?',
					label: 'Login',
					link: 'meetup.com/login',
				},
				googleOnClick: () => null,
				facebookOnClick: () => null,
				emailOnClick: () => null,
				onOpen: () => null,
			},
		},
		proDashboard: {
			link: 'meetup.com/pro',
			label: 'Pro Dashboard',
			mobileLabel: 'Dashboard',
			mainAccount: { urlname: '/mason-mocks', name: 'Mason Mocks' },
			mobileTabs: {
				analytics: { link: 'meetup.com/analytics', label: 'Analytics' },
				members: { link: 'meetup.com/members', label: 'Members' },
				groups: { link: 'meetup.com/groups', label: 'Groups' },
				templates: { link: 'meetup.com/templates', label: 'Templates' },
				profile: { link: 'meetup.com/profile', label: 'Profile' },
				publicProfile: { link: 'meetup.com/settings', label: 'Public Profile' },
				contact: { link: 'meetup.com/contact', label: 'Contact' },
				help: { link: 'meetup.com/help', label: 'Help' },
				logout: { link: 'meetup.com/logout', label: 'Logout' },
			},
		},
		explore: { link: 'meetup.com/find/events', label: 'Explore' },
		experiences: { link: 'meetup.com/experiences', label: 'Experiences' },
		groups: {
			link: 'meetup.com/groups',
			label: 'Groups',
			list: [
				{ urlname: '/mason-mocks', name: 'Mason Mocks' },
				{ urlname: '/chicken-scratch', name: 'Chicken Scratch' },
			],
		},
		messages: {
			link: 'meetup.com/messages',
			label: 'Messages',
			unreadMessage: 1,
		},
		notifications: {
			link: 'meetup.com/notifications',
			label: 'Notifications',
			unreadNotifications: 0,
			list: [...updatedNotif],
			notificationsDropdown: {
				markRead: () => {},
				emptyContentLabel: "You don't have any notifications yet",
				generateClassicUrl: () => {},
			},
		},
		profile: {
			link: 'meetup.com/profile',
			label: 'Profile',
			getSelfGroupsQuery: () => {},
			profileDropdown: {
				payments: {
					link: 'meetup.com/payments/payments_made',
					label: 'Payments made',
				},
				settings: { link: 'meetup.com/settings', label: 'Settings' },
				help: { link: 'meetup.com/help', label: 'Help' },
				logout: { link: 'meetup.com/logout', label: 'Logout' },
				allGroupsLabel: 'See all groups',
				allGroupsLink: 'meetup.com/groups',
				groupHome: () => {},
			},
		},
	};
};

const navItems = navItemsFactory();

storiesOf('Site Chrome/Nav', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.addParameters({ info: { propTables: [Nav] } })
	.addDecorator(story => (
		<Router history={createMemoryHistory('/')}>
			<Route path="/" component={() => story()} />
		</Router>
	))
	.add('authenticated', () => (
		<TestNav
			self={MOCK_MEMBER}
			navItems={navItems}
			style={{ width: '100%' }}
			media={{ isAtMediumUp: true, isAtLargeUp: true }}
		/>
	))
	.add('authenticated but members groups has not been loaded', () => {
		const groups = { ...navItems.groups, list: undefined };
		const items = { ...navItems, groups };
		return (
			<TestNav
				self={MOCK_MEMBER}
				navItems={items}
				style={{ width: '100%' }}
				media={{ isAtMediumUp: true, isAtLargeUp: true }}
			/>
		);
	})
	.add('authenticated but notifications has not been loaded', () => {
		const notifications = { ...navItems.notifications, list: undefined };
		const items = { ...navItems, notifications };
		return (
			<TestNav
				self={MOCK_MEMBER}
				navItems={items}
				style={{ width: '100%' }}
				media={{ isAtMediumUp: true, isAtLargeUp: true }}
			/>
		);
	})
	.add('authenticated but notifications and groups are empty', () => {
		const notifications = { ...navItems.notifications, list: [] };
		const groups = { ...navItems.groups, list: [] };
		const items = { ...navItems, notifications, groups };
		return (
			<TestNav
				self={MOCK_MEMBER}
				navItems={items}
				style={{ width: '100%' }}
				media={{ isAtMediumUp: true, isAtLargeUp: true }}
			/>
		);
	})
	.add('authenticated but with draft group at the top', () => {
		const navItemsModified = {
			...navItems,
			groupDraft: {
				editLink: 'create',
				name: 'Name of the group',
				status: 'In progress',
				actionTitle: 'Finish group',
			},
		};

		return (
			<TestNav
				self={MOCK_MEMBER}
				navItems={navItemsModified}
				style={{ width: '100%' }}
				media={{ isAtMediumUp: true, isAtLargeUp: true }}
			/>
		);
	})
	.add('authenticated Pro admins', () => (
		<TestNav
			self={{
				is_pro_admin: true,
				...MOCK_MEMBER,
			}}
			navItems={navItems}
			style={{ width: '100%' }}
			media={{ isAtMediumUp: true, isAtLargeUp: true }}
		/>
	))
	.add('unauthenticated', () => (
		<TestNav
			self={{ status: 'prereg' }}
			navItems={navItems}
			style={{ width: '100%' }}
			media={{ isAtMediumUp: true, isAtLargeUp: true }}
		/>
	))
	.add('unauthenticated with no create link', () => (
		<TestNav
			self={{ status: 'prereg' }}
			navItems={{ ...navItems, create: undefined }}
			style={{ width: '100%' }}
			media={{ isAtMediumUp: true, isAtLargeUp: true }}
		/>
	));
