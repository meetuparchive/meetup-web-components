import React from 'react';
import TestUtils from 'react-addons-test-utils';
import DateTimePicker from './DateTimePicker';
// import DateTimeLocalInput from './DateTimeLocalInput';
import FlatPickrComponent from './FlatPickrComponent';
// import TimeInput from './TimeInput';

describe('DateTimePicker', function() {

	let dateTimeComponent;
		// flatpickrComponent,
		// timeComponent,
		// dateTimeLocalComponent,
		// dateEl,
		// timeEl;
	/*
	beforeEach(() => {
		dateTimeComponent = TestUtils.renderIntoDocument(<DateTimePicker name='start_time' forceFlatpickr />);
		flatpickrComponent = TestUtils.findRenderedComponentWithType(dateTimeComponent, FlatPickrComponent);
		dateTimeLocalComponent = TestUtils.findRenderedComponentWithType(dateTimeComponent, DateTimeLocalInput);
		timeComponent = TestUtils.findRenderedComponentWithType(dateTimeComponent, TimeInput);
	});

	afterEach(() => {
		dateTimeComponent = null;
		timeComponent = null;
		flatpickrComponent = null;
		timeComponent = null;
		dateEl = null;
		timeEl = null;
	});
	*/

	it('exists', function() {
		dateTimeComponent = TestUtils.renderIntoDocument(<DateTimePicker name='start_time' forceFlatpickr />);
		console.log(dateTimeComponent);
		expect(() => TestUtils.findRenderedComponentWithType(dateTimeComponent, FlatPickrComponent)).not.toThrow();
		// expect(() => TestUtils.findRenderedComponentWithType(dateTimeComponent, TimeInput)).not.toThrow();
		// var child = ReactTestUtils.findRenderedComponentWithType(profile, Avatar);
		// expect(ReactTestUtils.isCompositeComponentWithType(child, Avatar)).toBe(true);
	});
	/*
	it('sets a default value for date and time', function() {});

	it('allows for date only', function() {});

	it('sets a date range to select from', function() {});
	*/
});
