import React from 'react';
import { storiesOf } from '@storybook/react';

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
		list: [],
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
	},
	profile: {
		link: 'meetup.com/profile',
		label: 'Profile',
		getSelfGroupsQuery: () => {},
	},
};

storiesOf('Nav', module)
	.addDecorator(decorateWithInfo)
	.add('authenticated', () => (
		<Nav
			self={{
				id: 1234,
				name: 'John Q. Testington',
				status: 'active',
			}}
			navItems={navItems}
		/>
	))
	.add('unauthenticated', () => (
		<Nav
			self={{
				status: 'prereg',
			}}
			navItems={navItems}
		/>
	));
