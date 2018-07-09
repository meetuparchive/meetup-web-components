import React from 'react';
import { shallow } from 'enzyme';
import ReduxFormCalendarComponent from './CalendarComponent';

describe('redux-form Calendar Component', function() {
	const attrs = {
		input: {
			id: 'beyonce',
			name: 'halo',
			className: 'beyonce-halo',
			value: new Date(2012, 9, 12),
		},
		meta: {
			error: 'pick a different album',
		},
		onFocus: jest.fn(),
		onBlur: jest.fn(),
		onChange: jest.fn(),
	};

	it('renders a Calendar component with expected attributes from mock data', () => {
		const component = shallow(<ReduxFormCalendarComponent {...attrs} />);
		expect(component).toMatchSnapshot();
	});
});
