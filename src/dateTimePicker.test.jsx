import React from 'react';
import TestUtils from 'react-addons-test-utils';
import DateTimePicker from './DateTimePicker';
import CalendarComponent from './CalendarComponent';
import TimeInput from './TimeInput';

fdescribe('DateTimePicker', function() {

	let dateTimeComponent,
		calendarComponent,
		timeComponent;
		// dateTimeLocalComponent;

	const year = 2018,
		month = 0,
		day = 1,
		dateStr = `${year}-0${month+1}-0${day}`,
		hours = 23,
		minutes = 11,
		datetime = new Date(Date.UTC(year, month, day, hours, minutes));

	// datetime.setHours(hours, minutes);

	beforeEach(() => {
		dateTimeComponent = TestUtils.renderIntoDocument(
			<DateTimePicker name='start_time'
				value={datetime}
				forceCalendar />);
		calendarComponent = TestUtils.findRenderedComponentWithType(dateTimeComponent, CalendarComponent);
		timeComponent = TestUtils.findRenderedComponentWithType(dateTimeComponent, TimeInput);
	});

	afterEach(() => {
		dateTimeComponent = null;
		timeComponent = null;
		calendarComponent = null;
	});

	it('exists', function() {
		dateTimeComponent = TestUtils.renderIntoDocument(<DateTimePicker name='start_time' forceCalendar />);
		expect(() => TestUtils.findRenderedComponentWithType(dateTimeComponent, CalendarComponent)).not.toThrow();
		expect(() => TestUtils.findRenderedComponentWithType(dateTimeComponent, TimeInput)).not.toThrow();
	});

	it('values for date and time are set in state', function() {
		expect(dateTimeComponent.state.datetime).toEqual(datetime);
	});

	it('accepts a Date as a value', function() {
		dateTimeComponent = TestUtils.renderIntoDocument(
			<DateTimePicker name='start_time'
				value={new Date(dateStr)}
				forceCalendar />);
		expect(dateTimeComponent.state.datetime).toEqual(new Date(dateStr));
	});

	it('accepts a datetime object as value', function() {
		dateTimeComponent = TestUtils.renderIntoDocument(
			<DateTimePicker name='start_time'
				value={datetime}
				forceCalendar />);
		expect(dateTimeComponent.state.datetime).toEqual(datetime);
	});

	it('accepts a date string value', function() {
		dateTimeComponent = TestUtils.renderIntoDocument(
			<DateTimePicker name='start_time'
				value={dateStr}
				forceCalendar />);
		expect(dateTimeComponent.state.datetime).toEqual(new Date(Date.UTC(year, month, day)));
	});

	it('values for date and time are set in child components', function() {
		const timeInputEl = TestUtils.findRenderedDOMComponentWithTag(timeComponent, 'input');
		expect(calendarComponent.flatpickr.selectedDates[0])
			.toEqual(new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate()));
		expect(timeInputEl.value).toEqual(dateTimeComponent.parseTimeFromDateTime(datetime));
	});

	it('renders a date component only if specified', function() {
		dateTimeComponent = TestUtils.renderIntoDocument(
			<DateTimePicker name='start_time'
				forceCalendar
				dateOnly />);
		expect(() => TestUtils.findRenderedComponentWithType(dateTimeComponent, CalendarComponent)).not.toThrow();
		expect(() => TestUtils.findRenderedComponentWithType(dateTimeComponent, TimeInput)).toThrow();
	});

	it('passes options and sets a date range to select from', function() {
		const min = new Date(),
			max = new Date();
		max.setDate(max.getDate() + 5);
		dateTimeComponent = TestUtils.renderIntoDocument(
			<DateTimePicker name='start_time'
				forceCalendar
				datepickerOptions={{ minDate: min, maxDate: max }}
			/>);
		calendarComponent = TestUtils.findRenderedComponentWithType(dateTimeComponent, CalendarComponent);
		expect(calendarComponent.flatpickr.instanceConfig.minDate).toEqual(min);
		expect(calendarComponent.flatpickr.instanceConfig.maxDate).toEqual(max);
	});
});
