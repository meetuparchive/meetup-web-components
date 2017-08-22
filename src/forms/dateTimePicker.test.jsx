/* eslint-disable */
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import DateTimePicker from './DateTimePicker';
import DateTimeLocalInput from './DateTimeLocalInput';
import CalendarComponent from './CalendarComponent';
import TimeInput from './TimeInput';

describe('DateTimePicker', function() {

	let dateTimeComponent;

	const 	year = 2018,
			month = 0,
			day = 1,
			hours = 23,
			minutes = 11;

	const datetime = new Date(Date.UTC(year, month, day, hours, minutes)),
			dateStr = `${year}-0${month+1}-0${day}`,
			minDate = new Date(),
			maxDate = new Date();
	
	maxDate.setDate(maxDate.getDate() + 5);

	const datepickerOptions = { minDate, maxDate };
	// timeProps

	describe('renders child components as expected', () => {
		beforeEach(() => {
			dateTimeComponent = shallow(
				<DateTimePicker
					id='event_start'
					name='start_time'
					value={datetime}
					error='Too late'
					datepickerOptions
					forceCalendar
				/>
			);
		});

		afterEach(() => {
			dateTimeComponent = null;
		});

		it('passes expected props and value to calendar and time', function() {
			// visually check:
			//  Calendar and TimeInput are in snapshot
			// name, id, required etc attrs areas expected
			// datepickerOpts in snapshot, with date range
			// datepickerCallback is passed down to each
			
			expect(dateTimeComponent).toMatchSnapshot();
		});

		it('sets datetime in state', function() {
			expect(dateTimeComponent.state('datetime')).toEqual(datetime);
		});

		it('has child components with prop.value equal to its state date and time', () => {
			dateTimeComponent = mount(
				<DateTimePicker 
					name='start_time'
					value={datetime}
					error='Too late'
					datepickerOptions
					forceCalendar
				/>
			);
			const timeComponent = dateTimeComponent.find(TimeInput);
			const calendarComponent = dateTimeComponent.find(CalendarComponent);
			const instance = dateTimeComponent.instance();
			
			expect(timeComponent.prop('value')).toEqual(instance.parseTimeFromDateTime(datetime));
			expect(calendarComponent.prop('value')).toEqual(instance.getDate());
		});


		it('renders a date component only if dateOnly specified, with no focus and blur props', function() {
			let dateComponentOnly = shallow(
				<DateTimePicker name='start_time'
					forceCalendar
					datepickerOptions
					dateOnly
				/>
			);
			expect(dateComponentOnly).toMatchSnapshot();
			dateComponentOnly = null;
		});

		it('renders a datetimelocal component if browser supports', function() {
			dateTimeComponent.instance().setState({ isDateTimeLocalSupported: true });
			const dateTimeLocalInput = dateTimeComponent.find(DateTimeLocalInput)
			expect(dateTimeLocalInput).not.toBeNull();
			// check value?

		});

		describe('accessibility concerns', () => {

			it('renders a fieldset for date and time, with optional offscreen legend for a11y', function() {
				let dateComponentOnly = shallow(
					<DateTimePicker name='start_time'
						forceCalendar
						datepickerOptions
						dateOnly
					/>
				);
				expect(dateComponentOnly).toMatchSnapshot();
				dateComponentOnly = null;
			});

			it('provides aria-invalid and aria-describedby attrs on calendar when there is an error', function() {
				let dateComponent = shallow(
					<DateTimePicker name='start_time'
						forceCalendar
						error='Too late'
					/>
				);
				expect(dateComponent).toMatchSnapshot();
			});
		})
	});



	describe('callbacks passed to child components get called', function() {
	// 	let focusSpy,
	// 		blurSpy,
	// 		dateInputEl,
	// 		timeInputEl;

	// 	beforeEach(() => {
	// 		focusSpy = spyOn(DateTimePicker.prototype, 'onFocus').and.callThrough();
	// 		blurSpy = spyOn(DateTimePicker.prototype, 'onBlur');
	// 		dateTimeComponent = TestUtils.renderIntoDocument(
	// 			<DateTimePicker name='start_time'
	// 				value={dateStr}
	// 				forceCalendar
	// 			/>
	// 		);
	// 		timeInputEl = TestUtils.findRenderedDOMComponentWithTag(dateTimeComponent.timeComponent, 'input');
	// 		dateInputEl = TestUtils.findRenderedDOMComponentWithTag(dateTimeComponent.dateComponent, 'input');
	// 	});

	// 	afterEach(() => {
	// 		focusSpy = null;
	// 		blurSpy = null;
	// 		dateInputEl = null;
	// 		timeInputEl = null;
	// 	});

	// 	it('has an onFocus callback that gets called when time input is focused', function() {
	// 		TestUtils.Simulate.focus(timeInputEl);
	// 		expect(focusSpy).toHaveBeenCalled();
	// 	});

	// 	it('has an onFocus callback that gets called when calendar input is focused', function() {
	// 		TestUtils.Simulate.focus(dateInputEl);
	// 		expect(focusSpy).toHaveBeenCalled();
	// 	});

	// 	it('has an onFocus callback that applied focused class', function() {
	// 		dateTimeComponent.onFocus();
	// 		expect(() => TestUtils.findRenderedDOMComponentWithClass(dateTimeComponent, 'focused')).not.toThrow();
	// 	});

	// 	it('has an onBlur callback that gets called when time input is blurred', function() {
	// 		TestUtils.Simulate.blur(dateInputEl);
	// 		expect(blurSpy).toHaveBeenCalled();
	// 	});

	// 	it('has an onBlur callback that gets called when calendar input is blurred', function() {
	// 		TestUtils.Simulate.blur(dateInputEl);
	// 		expect(blurSpy).toHaveBeenCalled();
	// 	});

	// });

	// describe('onChangeCallback\'s get called when child components change', function() {
	// 	it('has setTime callback called when time input changes', function() {
	// 		const setTimeSpy = spyOn(DateTimePicker.prototype, 'setTime');
	// 		dateTimeComponent = TestUtils.renderIntoDocument(
	// 			<DateTimePicker name='start_time'
	// 				value={dateStr}
	// 				forceCalendar
	// 			/>
	// 		);
	// 		const timeInputEl = TestUtils.findRenderedDOMComponentWithTag(dateTimeComponent.timeComponent, 'input');
	// 		TestUtils.Simulate.change(timeInputEl);
	// 		expect(setTimeSpy).toHaveBeenCalled();
	// 	});

	// 	it('has setDate callback called when date input changes', function() {
	// 		const setDateSpy = spyOn(DateTimePicker.prototype, 'setDate');
	// 		dateTimeComponent = TestUtils.renderIntoDocument(
	// 			<DateTimePicker name='start_time'
	// 				value={dateStr}
	// 				forceCalendar
	// 			/>
	// 		);

	// 		dateTimeComponent.dateComponent.flatpickr.setDate(dateStr, true);
	// 		expect(setDateSpy).toHaveBeenCalled();
	// 	});

	// 	it('has setDateTime callback called when datetime input changes', function() {
	// 		const setDateTimeSpy = spyOn(DateTimePicker.prototype, 'setDateTime');
	// 		dateTimeComponent = TestUtils.renderIntoDocument(
	// 			<DateTimePicker name='start_time'
	// 				value={dateStr}
	// 			/>
	// 		);
	// 		dateTimeComponent.setState({ isDateTimeLocalSupported: true }); // forcing datetimelocal
	// 		const dateTimeInputEl = TestUtils.findRenderedDOMComponentWithTag(dateTimeComponent, 'input');
	// 		TestUtils.Simulate.change(dateTimeInputEl);
	// 		expect(setDateTimeSpy).toHaveBeenCalled();
	// 	});

	// });

	// describe('onChangeCallback in props', () => {
	// 	const mockFn = jest.fn();

	// 	beforeEach(() => {
	// 		dateTimeComponent = TestUtils.renderIntoDocument(
	// 			<DateTimePicker name='start_time'
	// 				value={dateStr}
	// 				onChangeCallback={mockFn}
	// 				forceCalendar
	// 			/>
	// 		);
	// 	});

	// 	afterEach(() => {
	// 		mockFn.mockClear();
	// 	});

	// 	it('is called when time input changes', () => {
	// 		const dateTimeInputEl = TestUtils.findRenderedDOMComponentWithTag(dateTimeComponent.timeComponent, 'input');
	// 		TestUtils.Simulate.change(dateTimeInputEl);
	// 		expect(mockFn).toHaveBeenCalledWith(expect.any(Date));
	// 	});

	// 	it('is called when date input changes', () => {
	// 		dateTimeComponent.dateComponent.flatpickr.setDate(dateStr, true);
	// 		expect(mockFn).toHaveBeenCalledWith(expect.any(Date));
	// 	});
	});

});
	



