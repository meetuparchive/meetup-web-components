import React from 'react';
import { shallow } from 'enzyme';
import { MOCK_MEMBER, MOCK_GROUP } from 'meetup-web-mocks/lib/api';

import Nav from './Nav';
import navItems from './nav.story';

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
				navItems: {
					mainAccount: MOCK_GROUP,
				},
			})
		);
	});

	it('should match the snapshot without a logo photo', () => {
		expect(
			wrapper({ navItems: { mainAccount: { ...MOCK_GROUP, group_photo: {} } } })
		);
	});
});
