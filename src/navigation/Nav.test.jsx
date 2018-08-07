import React from 'react';
import { shallow } from 'enzyme';
import { MOCK_MEMBER } from 'meetup-web-mocks/lib/api';

import { Nav } from './Nav';
import { navItems } from './nav.story';

const MOCK_PROPS = {
	navItems,
	media: {
		isAtSmallUp: false,
		isAtMediumUp: false,
		isAtLargeUp: false,
	},
	self: { status: 'prereg' },
	groups: {
		link: 'meetup.com/groups',
		label: 'Groups',
		list: [
			{ urlname: '/mason-mocks', name: 'Mason Mocks' },
			{ urlname: '/chicken-scratch', name: 'Chicken Scratch' },
		],
	},
};

const wrapper = props => shallow(<Nav {...MOCK_PROPS} {...props} />);

describe('Nav', () => {
	it('should match the snapshot for unauthenticated small screens', () => {
		expect(wrapper()).toMatchSnapshot();
	});

	it('should match the snapshot for unauthenticated medium screens', () => {
		expect(
			wrapper({
				self: MOCK_MEMBER,
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for authenticated medium screens', () => {
		expect(
			wrapper({
				media: { isAtMediumUp: true },
				self: MOCK_MEMBER,
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for groups loading state', () => {
		expect(
			wrapper({
				media: { isAtMediumUp: true },
				self: MOCK_MEMBER,
				groups: {
					link: 'meetup.com/groups',
					label: 'Groups',
					list: undefined,
				},
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for notifications loading state', () => {
		expect(
			wrapper({
				media: { isAtMediumUp: true },
				self: MOCK_MEMBER,
				notifications: {
					link: 'meetup.com/notifications',
					label: 'Notifications',
					unreadNotifications: 0,
					list: undefined,
				},
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for unread notifications', () => {
		expect(
			wrapper({
				media: { isAtMediumUp: true },
				self: MOCK_MEMBER,
				notifications: {
					link: 'meetup.com/notifications',
					label: 'Notifications',
					unreadNotifications: 3,
					list: [],
				},
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for unauthenticated medium screens', () => {
		expect(
			wrapper({
				media: { isAtMediumUp: true },
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for unauthenticated large screens', () => {
		expect(wrapper({ media: { isAtLargeUp: true } })).toMatchSnapshot();
	});

	it('should match the snapshot for authenticated large screens', () => {
		expect(
			wrapper({
				media: { isAtLargeUp: true },
				self: MOCK_MEMBER,
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot with logo photo', () => {
		expect(
			wrapper({
				self: MOCK_MEMBER,
				navItems: {
					...navItems,
					proDashboard: {
						mainAccount: {
							urlname: '/mason-mocks',
							name: 'Mason Mocks',
							group_photo: {
								thumb_link: 'https://placeimg.com/640/480/any',
							},
						},
					},
				},
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot without a logo photo', () => {
		expect(
			wrapper({
				self: MOCK_MEMBER,
				navItems: {
					...navItems,
					mainAccount: {
						urlname: '/mason-mocks',
						name: 'Mason Mocks',
						group_photo: {},
					},
				},
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for authenticated pro admins', () => {
		expect(
			wrapper({
				self: { ...MOCK_MEMBER, is_pro_admin: true },
				navItems: {
					...navItems,
					proDashboard: {
						mainAccount: {
							urlname: '/mason-mocks',
							name: 'Mason Mocks',
							group_photo: {
								thumb_link: 'https://placeimg.com/640/480/any',
							},
						},
					},
				},
			})
		).toMatchSnapshot();
	});
});
