import React from 'react';
import { shallow } from 'enzyme';

import DashboardDropdown from './DashboardDropdown';

const MOCK_PROPS = {
	mobileTabs: {
		analytics: {
			link: 'meetup.com',
			label: 'Analytics',
		},
		members: {
			link: 'meetup.com',
			label: 'Members',
		},
		groups: {
			link: 'meetup.com',
			label: 'Groups',
		},
		templates: {
			link: 'meetup.com',
			label: 'Templates',
		},
		publicProfile: {
			link: 'meetup.com',
			label: 'Public Profile',
		},
		profile: {
			link: 'meetup.com',
			label: 'Your profile',
		},
		contact: {
			link: 'meetup.com',
			label: 'Contact',
		},
		help: {
			link: 'meetup.com',
			label: 'Help',
		},
		logout: {
			link: 'meetup.com',
			label: 'Logout',
		},
	},
	dismissAction: jest.fn(),
};

describe('Profile Dropdown', () => {
	const wrapper = shallow(<DashboardDropdown {...MOCK_PROPS} />);
	it('should match snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
