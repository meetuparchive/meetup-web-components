import React from 'react';
import DateTimePicker from './DateTimePicker';
import { shallow } from 'enzyme';

describe('redux-form DateTimePicker', () => {
	const minDate = new Date('December 31, 1999 23:59:00'),
		maxDate = new Date(minDate.getTime() + (1000 * 60 * 60 * 2));

	const attrs = {
		input: {
			label: 'Start time',
			name: 'starttime',
			id: 'eventStart',
			value: minDate,
			required: true
		},
		meta: {
			error: 'Not a valid date'
		},
		datepickerOptions: {
			minDate: minDate,
			maxDate: maxDate,
			dateOnly: true
		}
	};

	let component;

	beforeEach(() => {
		component = shallow(<DateTimePicker {...attrs} />);
	});

	afterEach(() => {
		component = null;
	});

	it('should render a DateTimePicker with expected props from mock attributes', () => {
		expect(component).toMatchSnapshot();
	});

});

