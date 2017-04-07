import React from 'react';
import TestUtils from 'react-addons-test-utils';
import DateTimePicker from './DateTimePicker';
import CalendarComponent from './CalendarComponent';
import TimeInput from './TimeInput';

describe('DateTimePicker', function() {

	let dateTimeComponent;

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
				forceCalendar
			/>
		);
	});

	afterEach(() => {
		dateTimeComponent = null;
	});

	it('exists', function() {
		dateTimeComponent = TestUtils.renderIntoDocument(<DateTimePicker name='start_time' value={datetime} forceCalendar />);
		expect(() => TestUtils.findRenderedComponentWithType(dateTimeComponent, CalendarComponent)).not.toThrow();
		expect(() => TestUtils.findRenderedComponentWithType(dateTimeComponent, TimeInput)).not.toThrow();
	});

	it('values for date and time are set in child components', function() {
		const timeComponent = TestUtils.findRenderedComponentWithType(dateTimeComponent, TimeInput);
		const timeInputEl = TestUtils.findRenderedDOMComponentWithTag(timeComponent, 'input');
		const calendarComponent = TestUtils.findRenderedComponentWithType(dateTimeComponent, CalendarComponent);
		expect(calendarComponent.flatpickr.selectedDates[0])
			.toEqual(new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate()));
		expect(timeInputEl.value).toEqual(dateTimeComponent.parseTimeFromDateTime(datetime));
	});

	it('renders a date component only if specified', function() {
		dateTimeComponent = TestUtils.renderIntoDocument(
			<DateTimePicker name='start_time'
				value={datetime}
				forceCalendar
				dateOnly
			/>
		);
		expect(() => TestUtils.findRenderedComponentWithType(dateTimeComponent, CalendarComponent)).not.toThrow();
		expect(() => TestUtils.findRenderedComponentWithType(dateTimeComponent, TimeInput)).toThrow();
	});

	it('passes options and sets a date range to select from', function() {
		const min = new Date(),
			max = new Date();
		max.setDate(max.getDate() + 5);
		dateTimeComponent = TestUtils.renderIntoDocument(
			<DateTimePicker name='start_time'
				value={datetime}
				forceCalendar
				datepickerOptions={{ minDate: min, maxDate: max }}
			/>
		);
		const calendarComponent = TestUtils.findRenderedComponentWithType(dateTimeComponent, CalendarComponent);
		expect(calendarComponent.flatpickr.instanceConfig.minDate).toEqual(min);
		expect(calendarComponent.flatpickr.instanceConfig.maxDate).toEqual(max);
	});

	describe('accepts different value types', function() {
		it('accepts a Date as a value', function() {
			dateTimeComponent = TestUtils.renderIntoDocument(
				<DateTimePicker name='start_time'
					value={new Date(dateStr)}
					forceCalendar
				/>
			);
			expect(dateTimeComponent.getDateTime()).toEqual(new Date(dateStr));
		});

		it('accepts a datetime object as value', function() {
			dateTimeComponent = TestUtils.renderIntoDocument(
				<DateTimePicker name='start_time'
					value={datetime}
					forceCalendar
				/>
			);
			expect(dateTimeComponent.getDateTime()).toEqual(datetime);
		});

		it('accepts a date string value', function() {
			dateTimeComponent = TestUtils.renderIntoDocument(
				<DateTimePicker name='start_time'
					value={dateStr}
					forceCalendar
				/>
			);
			expect(dateTimeComponent.getDateTime()).toEqual(new Date(Date.UTC(year, month, day)));
		});
	});

	describe('callbacks passed to child components are working', function() {
		let focusSpy,
			blurSpy,
			dateInputEl,
			timeInputEl;

		beforeEach(() => {
			focusSpy = spyOn(DateTimePicker.prototype, 'onFocus').and.callThrough();
			blurSpy = spyOn(DateTimePicker.prototype, 'onBlur');
			dateTimeComponent = TestUtils.renderIntoDocument(
				<DateTimePicker name='start_time'
					value={dateStr}
					forceCalendar
				/>
			);
			timeInputEl = TestUtils.findRenderedDOMComponentWithTag(dateTimeComponent.timeComponent, 'input');
			dateInputEl = TestUtils.findRenderedDOMComponentWithTag(dateTimeComponent.dateComponent, 'input');
		});

		afterEach(() => {
			focusSpy = null;
			blurSpy = null;
			dateInputEl = null;
			timeInputEl = null;
		});

		it('has an onFocus callback that gets called when time input is focused', function() {
			TestUtils.Simulate.focus(timeInputEl);
			expect(focusSpy).toHaveBeenCalled();
		});

		it('has an onFocus callback that gets called when calendar input is focused', function() {
			TestUtils.Simulate.focus(dateInputEl);
			expect(focusSpy).toHaveBeenCalled();
		});

		it('has an onFocus callback that applied focused class', function() {
			dateTimeComponent.onFocus();
			expect(() => TestUtils.findRenderedDOMComponentWithClass(dateTimeComponent, 'focused')).not.toThrow();
		});

		it('has an onBlur callback that gets called when time input is blurred', function() {
			TestUtils.Simulate.blur(dateInputEl);
			expect(blurSpy).toHaveBeenCalled();
		});

		it('has an onBlur callback that gets called when calendar input is blurred', function() {
			TestUtils.Simulate.blur(dateInputEl);
			expect(blurSpy).toHaveBeenCalled();
		});

	});

	describe('onChangeCallback\'s get called when child components change', function() {
		it('has setTime callback called when time input changes', function() {
			const setTimeSpy = spyOn(DateTimePicker.prototype, 'setTime');
			dateTimeComponent = TestUtils.renderIntoDocument(
				<DateTimePicker name='start_time'
					value={dateStr}
					forceCalendar
				/>
			);
			const timeInputEl = TestUtils.findRenderedDOMComponentWithTag(dateTimeComponent.timeComponent, 'input');
			TestUtils.Simulate.change(timeInputEl);
			expect(setTimeSpy).toHaveBeenCalled();
		});

		it('has setDate callback called when date input changes', function() {
			const setDateSpy = spyOn(DateTimePicker.prototype, 'setDate');
			dateTimeComponent = TestUtils.renderIntoDocument(
				<DateTimePicker name='start_time'
					value={dateStr}
					forceCalendar
				/>
			);

			dateTimeComponent.dateComponent.flatpickr.setDate(dateStr, true);
			expect(setDateSpy).toHaveBeenCalled();
		});

		it('has setDateTime callback called when datetime input changes', function() {
			const setDateTimeSpy = spyOn(DateTimePicker.prototype, 'setDateTime');
			dateTimeComponent = TestUtils.renderIntoDocument(
				<DateTimePicker name='start_time'
					value={dateStr}
				/>
			);
			dateTimeComponent.setState({ isDateTimeLocalSupported: true }); // forcing datetimelocal
			const dateTimeInputEl = TestUtils.findRenderedDOMComponentWithTag(dateTimeComponent, 'input');
			TestUtils.Simulate.change(dateTimeInputEl);
			expect(setDateTimeSpy).toHaveBeenCalled();
		});

	});

	describe('onChangeCallback in props', () => {
		let changeCallbackSpy;

		beforeEach(() => {
			changeCallbackSpy = jest.fn();
			dateTimeComponent = TestUtils.renderIntoDocument(
				<DateTimePicker name='start_time'
					value={dateStr}
					onChangeCallback={changeCallbackSpy}
					forceCalendar
				/>
			);
		});

		it('is called when time input changes', () => {
			const dateTimeInputEl = TestUtils.findRenderedDOMComponentWithTag(dateTimeComponent.timeComponent, 'input');
			TestUtils.Simulate.change(dateTimeInputEl);
			expect(changeCallbackSpy).toHaveBeenCalled();
		});

		it('is called when date input changes', () => {
			dateTimeComponent.dateComponent.flatpickr.setDate(dateStr, true);
			expect(changeCallbackSpy).toHaveBeenCalledWith(expect.any(Date));
		});
	});
});
