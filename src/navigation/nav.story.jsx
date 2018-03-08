import React from 'react';
import { storiesOf } from '@storybook/react';
import { MOCK_MEMBER } from 'meetup-web-mocks/lib/api';

import { decorateWithInfo } from '../utils/decorators';

import Nav from './Nav';

const navItems = {
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
	},
	explore: {
		link: 'meetup.com/explore',
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
		list: [],
		markRead: () => {},
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
	.addDecorator(decorateWithInfo)
	.add('authenticated', () => <Nav self={MOCK_MEMBER} navItems={navItems} />)
	.add('authenticated Pro member', () => (
		<Nav
			self={{
				...MOCK_MEMBER,
				isProMember: true,
			}}
			navItems={navItems}
		/>
	))
	.add('unauthenticated', () => (
		<Nav self={{ status: 'prereg' }} navItems={navItems} />
	));
