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
});
