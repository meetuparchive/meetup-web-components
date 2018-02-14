import React from 'react';
import { shallow } from 'enzyme';
import ProfileDropdown from './ProfileDropdown';

const groups = [
	{ status: 'active', name: 'hello 1', urlname: '1111', id: '1111' },
	{ status: 'active', name: 'hello 2', urlname: '2222', id: '2222' },
	{ status: 'active', name: 'hello 3', urlname: '3333', id: '3333' },
	{ status: 'active', name: 'hello 4', urlname: '4444', id: '4444' },
];

describe('Profile Dropdown', () => {
	it('renders to DOM', () => {
		const wrapper = shallow(
			<ProfileDropdown
				self={{ id: '1234' }}
				notifications={[]}
				groups={groups}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});
});
