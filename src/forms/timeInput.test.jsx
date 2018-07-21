import React from 'react';
import { shallow } from 'enzyme';
import TimeInput from './TimeInput';

describe('TimeInput', function() {
	const props = {
		name: 'time',
		value: '11:15',
		onChange: () => {},
		required: true,
	};

	describe('TimeInput, with input[time] support', () => {
		it('renders a time html input with expected props', function() {
			expect(shallow(<TimeInput {...props} />)).toMatchSnapshot();
		});
	});
});
