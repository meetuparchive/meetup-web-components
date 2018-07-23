import React from 'react';
import { shallow } from 'enzyme';

import { MOCK_GROUP } from 'meetup-web-mocks/lib/api';

import AdminBar from './AdminBar';

describe('AdminBar', () => {
	const group = { ...MOCK_GROUP, ...{ event_sample: [] } };
	it('renders correctly', () => {
		const MOCK_PROPS = {
			group: group,
			isAdmin: true,
		};
		const component = shallow(<AdminBar {...MOCK_PROPS} />);
		expect(component).toMatchSnapshot();
	});
	it('renders nothing if user is not an admin and nodeEnv is prod', () => {
		const MOCK_PROPS = {
			group: group,
			isAdmin: false,
			nodeEnv: 'production',
		};
		const component = shallow(<AdminBar {...MOCK_PROPS} />);
		expect(component).toMatchSnapshot();
	});
	it('renders warning when nodeEnv is development and using isProdApi', () => {
		const MOCK_PROPS = {
			isAdmin: false,
			isProdApi: true,
			nodeEnv: 'development',
		};
		const component = shallow(<AdminBar {...MOCK_PROPS} />);
		expect(component).toMatchSnapshot();
	});
	it('renders correctly when no org exists', () => {
		const mockProps = group;
		delete mockProps.organizer;
		const MOCK_PROPS = {
			group: mockProps,
			isAdmin: true,
		};
		const component = shallow(<AdminBar {...MOCK_PROPS} />);
		expect(component).toMatchSnapshot();
	});
	it('renders correctly when QLd', () => {
		const MOCK_PROPS = {
			group: group,
			isAdmin: true,
			isQL: true,
			self: {
				name: 'testing name',
			},
		};
		const component = shallow(<AdminBar {...MOCK_PROPS} />);
		expect(component).toMatchSnapshot();
	});
	it('renders correctly when isProdApi', () => {
		const MOCK_PROPS = {
			group: group,
			isAdmin: true,
			isProdApi: true,
			self: {
				name: 'testing name',
			},
		};
		const component = shallow(<AdminBar {...MOCK_PROPS} />);
		expect(component).toMatchSnapshot();
	});
});
