import React from 'react';
import { storiesOf } from '@storybook/react';
import { MOCK_MEMBER } from 'meetup-web-mocks/lib/api';
import { MOCK_NOTIFICATIONS_LIST } from 'meetup-web-mocks/lib/notifications/api';

import { decorateWithBasics } from '../utils/decorators';

import Nav from './Nav';

const updatedNotif = MOCK_NOTIFICATIONS_LIST.map(notif => {
	const timeSince = new Date(notif.updated);
	return { ...notif, formattedTimeSince: timeSince.toDateString() };
});

const navItems = {
	dropdownLoaderLabel: 'Loading',
	updatesLabel: 'Updates',
	logo: {
		logoAccessible: 'Meetup Logo',
		link: 'meetup.com',
	},
	login: {
		link: 'meetup.com/login',
		label: 'Login',
	},
	signup: {
		link: 'meetup.com/signup',
		label: 'Sign up',
		signupModal: {
			orLabel: 'Or',
			title: 'Signup',
			google: {
				link: 'google.com',
				label: 'Google',
			},
			facebook: {
				link: 'facebook.com',
				label: 'Facebook',
			},
			email: {
				link: 'meetup.com/email',
				label: 'Email',
			},
			login: {
				text: 'Already a member?',
				label: 'Login',
				link: 'meetup.com/login',
			},
		},
	},
	proDashboard: {
		link: 'meetup.com/pro',
		label: 'Pro Dashboard',
		mobileLabel: 'Dashboard',
	},
	explore: {
		link: 'meetup.com/find/events',
		label: 'Explore',
	},
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
			settings: {
				link: 'meetup.com/settings',
				label: 'Settings',
			},
			help: {
				link: 'meetup.com/help',
				label: 'Help',
			},
			logout: {
				link: 'meetup.com/logout',
				label: 'Logout',
			},
			allGroupsLabel: 'All Groups',
			allGroupsLink: 'meetup.com/groups',
			groupHome: () => {},
		},
	},
};

storiesOf('Nav', module)
	.addDecorator(decorateWithBasics)
	.add('authenticated', () => (
		<Nav self={MOCK_MEMBER} navItems={navItems} style={{ width: '100%' }} />
	))
	.add('authenticated Pro member', () => (
		<Nav
			self={{
				...MOCK_MEMBER,
				isProMember: true,
			}}
			navItems={navItems}
			style={{ width: '100%' }}
		/>
	))
	.add('unauthenticated', () => (
		<Nav self={{ status: 'prereg' }} navItems={navItems} style={{ width: '100%' }} />
	));
