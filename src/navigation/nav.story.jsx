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
	updatesLabel: 'Updates',
	login: {
		link: 'meetup.com/login',
		label: 'Login',
	},
	signup: {
		link: 'meetup.com/signup',
		label: 'Signup',
	},
	proDashboard: {
		link: 'meetup.com/pro',
		label: 'Pro Dashboard',
		mobileLabel: 'Dashboard',
		proLogo: MOCK_MEMBER.photo.photo_link,
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
			groupHome: () => {},
		},
	},
};

storiesOf('Nav', module)
	.addDecorator(decorateWithBasics)
	.add('authenticated', () => <Nav self={MOCK_MEMBER} navItems={navItems} />)
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
		<Nav self={{ status: 'prereg' }} navItems={navItems} />
	));
