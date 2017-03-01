import React from 'react';
import TestUtils from 'react-addons-test-utils';
import DateTimePicker from './DateTimePicker';
// import DateTimeLocalInput from './DateTimeLocalInput';
import FlatpickrComponent from './FlatpickrComponent';
import TimeInput from './TimeInput';

describe('DateTimePicker', function() {

	let dateTimeComponent,
		flatpickrComponent,
		timeComponent;
		// dateTimeLocalComponent;

	const date1 = '2018-01-01',
		time1 = '23:11';

	beforeEach(() => {
		dateTimeComponent = TestUtils.renderIntoDocument(
			<DateTimePicker name='start_time'
				value={{date: date1, time: time1}}
				forceFlatpickr />);
		flatpickrComponent = TestUtils.findRenderedComponentWithType(dateTimeComponent, FlatpickrComponent);
		timeComponent = TestUtils.findRenderedComponentWithType(dateTimeComponent, TimeInput);
	});

	afterEach(() => {
		dateTimeComponent = null;
		timeComponent = null;
		flatpickrComponent = null;
	});

	it('exists', function() {
		dateTimeComponent = TestUtils.renderIntoDocument(<DateTimePicker name='start_time' forceFlatpickr />);
		expect(() => TestUtils.findRenderedComponentWithType(dateTimeComponent, FlatpickrComponent)).not.toThrow();
		expect(() => TestUtils.findRenderedComponentWithType(dateTimeComponent, TimeInput)).not.toThrow();
	});

	it('values for date and time are set in state', function() {
		expect(dateTimeComponent.state.value).toEqual({ date: date1, time: time1 });
	});

	it('values for date and time are set in child components', function() {
		const timeInputEl = TestUtils.findRenderedDOMComponentWithTag(timeComponent, 'input');
		expect(flatpickrComponent.flatpickr.input.value).toEqual(date1);
		expect(timeInputEl.value).toEqual(time1);
	});

	it('renders a date component only if specified', function() {
		dateTimeComponent = TestUtils.renderIntoDocument(
			<DateTimePicker name='start_time'
				forceFlatpickr
				dateOnly />);
		expect(() => TestUtils.findRenderedComponentWithType(dateTimeComponent, FlatpickrComponent)).not.toThrow();
		expect(() => TestUtils.findRenderedComponentWithType(dateTimeComponent, TimeInput)).toThrow();
	});

	it('passes options and sets a date range to select from', function() {
		const min = new Date(),
			max = new Date();
		max.setDate(max.getDate() + 5);
		dateTimeComponent = TestUtils.renderIntoDocument(
			<DateTimePicker name='start_time'
				forceFlatpickr
				datepickerOptions={{ minDate: min, maxDate: max }}
			/>);
		flatpickrComponent = TestUtils.findRenderedComponentWithType(dateTimeComponent, FlatpickrComponent);
		expect(flatpickrComponent.flatpickr.instanceConfig.minDate).toEqual(min);
		expect(flatpickrComponent.flatpickr.instanceConfig.maxDate).toEqual(max);
	});
});
