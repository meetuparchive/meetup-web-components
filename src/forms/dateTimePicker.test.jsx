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
			minDate = new Date(dateStr),
			maxDate = new Date(dateStr); // use set dates so snapshot not always changing
	
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
					datepickerOptions={datepickerOptions}
					forceCalendar
				/>
			);
		});

		afterEach(() => {
			dateTimeComponent = null;
		});

		it('passes expected props and value to calendar and time', function() {
			// visually check:
			// Calendar and TimeInput are in snapshot
			// name, id, required etc attrs areas expected
			// datepickerOpts in snapshot, with date range
			// datepickerCallback is passed down to each
			
			expect(dateTimeComponent).toMatchSnapshot();
		});

		it('sets datetime in state', function() {
			expect(dateTimeComponent.state('datetime')).toEqual(datetime);
		});

		it('has TimeInput child component with expected value and datetimePickerCallback props', () => {
			const timeComponent = dateTimeComponent.find(TimeInput);
			const instance = dateTimeComponent.instance();
			expect(timeComponent.prop('value')).toEqual(instance.parseTimeFromDateTime(datetime));
			expect(timeComponent.prop('datetimePickerCallback')).toEqual(instance.setTime);
		});

		it('has child CalendarComponent with expected value and datetimePickerCallback props', () => {
			const calendarComponent = dateTimeComponent.find(CalendarComponent);
		const instance = dateTimeComponent.instance();
			expect(calendarComponent.prop('value')).toEqual(instance.getDate());
			expect(calendarComponent.prop('datetimePickerCallback')).toEqual(instance.setDate);
		});


		it('renders a dateTimeLocalInput if browser supports, with expected value and datetimePickerCallback props', () => {
			const instance = dateTimeComponent.instance();
			instance.setState({ isDateTimeLocalSupported: true });
		
			const dateTimeLocalInput = dateTimeComponent.find(DateTimeLocalInput)
			expect(dateTimeLocalInput).not.toBeNull();
			expect(dateTimeLocalInput.prop('value')).toEqual(instance.state.datetime);
			expect(dateTimeLocalInput.prop('datetimePickerCallback')).toEqual(instance.setDateTime);

		});

		it('renders a date component only if dateOnly specified', function() {
			let dateComponentOnly = shallow(
				<DateTimePicker name='start_time'
					forceCalendar
					datepickerOptions={datepickerOptions}
					dateOnly
				/>
			);
			expect(dateComponentOnly).toMatchSnapshot();
			dateComponentOnly = null;
		});

		describe('accessibility concerns', () => {
			beforeEach(() => {
				dateTimeComponent = shallow(
					<DateTimePicker
						id='event_start'
						name='start_time'
						value={datetime}
						legend='Event start date and time'
						error='Too late'
						datepickerOptions={datepickerOptions}
						forceCalendar
					/>
				);
			});
	
			afterEach(() => {
				dateTimeComponent = null;
			});

			it('renders a fieldset for date and time, with optional offscreen legend for a11y', function() {
				expect(dateTimeComponent).toMatchSnapshot();
			});

			it('provides aria-invalid and aria-describedby attrs on calendar when there is an error', function() {
				expect(dateTimeComponent).toMatchSnapshot();
			});
		})
	});

});
	



