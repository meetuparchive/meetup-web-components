import React from 'react';
import { shallow } from 'enzyme';
import Nav from './Nav';

const wrapper = props => shallow(<Nav {...props} />);

describe('Nav', () => {
	it('should match the snapshot for unauthenticated small screens', () => {
		expect(
			wrapper({
				media: { isAtMediumUp: false },
				self: { status: 'prereg' },
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for unauthenticated medium screens', () => {
		expect(
			wrapper({
				media: { isAtMediumUp: false },
				self: { status: 'active', name: 'Jeff Cleft' },
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for authenticated medium screens', () => {
		expect(
			wrapper({
				media: { isAtMediumUp: true },
				self: { status: 'active', name: 'Jeff Cleft' },
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for unauthenticated medium screens', () => {
		expect(
			wrapper({
				media: { isAtMediumUp: true },
				self: { status: 'prereg' },
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for unauthenticated large screens', () => {
		expect(
			wrapper({ media: { isAtLargeUp: true }, self: { status: 'prereg' } })
		).toMatchSnapshot();
	});

	it('should match the snapshot for authenticated large screens', () => {
		expect(
			wrapper({
				media: { isAtLargeUp: true },
				self: { status: 'active', name: 'Jeff Cleft' },
			})
		).toMatchSnapshot();
	});
});
