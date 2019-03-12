import React from 'react';
import { MOCK_GROUP } from 'meetup-web-mocks/lib/api';
import { shallow } from 'enzyme';

import ProfileDropdown from './ProfileDropdown';

const MOCK_PROPS = {
	groupHome: jest.fn(),
	groups: [
		{ ...MOCK_GROUP, name: 'hello 1', urlname: '1111', id: '1111' },
		{ ...MOCK_GROUP, name: 'hello 2', urlname: '2222', id: '2222' },
		{ ...MOCK_GROUP, name: 'hello 3', urlname: '3333', id: '3333' },
		{ ...MOCK_GROUP, name: 'hello 4', urlname: '4444', id: '4444' },
	],
	allGroupsLabel: 'All Groups',
	allGroupsLink: 'meetup.com/find',
	profile: {
		link: 'meetup.com',
		label: 'Profile',
	},
	settings: {
		link: 'meetup.com',
		label: 'Settings',
	},
	help: {
		link: 'meetup.com',
		label: 'Help',
	},
	logout: {
		link: 'meetup.com',
		label: 'Logout',
	},
};

describe('Profile Dropdown', () => {
	const wrapper = shallow(<ProfileDropdown {...MOCK_PROPS} />);
	it('should match snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should show the draft group at the top ProfileDropdown for authenticated screens', () => {
		const mockPropsModified = MOCK_PROPS;

		mockPropsModified.groupDraft = {
			urlname: 'meetup.com/groups',
			name: 'Name of the group',
			status: 'In progress',
			actionTitle: 'Finish group',
		};

		const wrapperWithDrafts = shallow(<ProfileDropdown {...MOCK_PROPS} />);

		expect(wrapperWithDrafts.find('.profileDropdown-draft-group').length).toBe(1);
	});
});
