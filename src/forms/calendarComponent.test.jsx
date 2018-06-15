import React from 'react';
import { shallow, mount } from 'enzyme';
import { convert, LocalDate } from 'js-joda';
import Flatpickr from 'react-flatpickr';

import { CalendarComponent } from './CalendarComponent';

describe('CalendarComponent', () => {
	const [Y, M, D] = [2020, 10, 12];
	// Flatpickr invokes `onChange` with an array arg of `selectedDates`.
	// the first index is the latest date selected.
	const MOCK_VALUE = [LocalDate.of(Y, M, D)];

	const MOCK_PROPS = {
		id: 'beyonce',
		name: 'halo',
		label: 'Enter Your Favorite Day',
		helperText: "I'm here to help",
		className: 'beyonce-halo',
		value: MOCK_VALUE[0],
		datepickerOptions: { dateFormat: 'm-d-Y' },
		error: 'this is an error',
	};

	const calendarComponent = shallow(<CalendarComponent {...MOCK_PROPS} />);
	const suppressErrorComponent = shallow(
		<CalendarComponent suppressError {...MOCK_PROPS} />
	);

	it('passes expected props to Flatpickr', () => {
		const pickrProps = calendarComponent.find(Flatpickr).props();
		expect(pickrProps).toMatchObject({
			id: 'beyonce',
			options: {
				altInput: true,
				altFormat: 'D M d, Y',
				dateFormat: 'm-d-Y',
			},
			'aria-label': 'Use arrow keys to navigate the calendar',
			className: 'input--dateTimePicker select--reset field--error beyonce-halo',
			value: expect.any(Date),
		});
		const { value: d } = pickrProps;
		// test the local timezone year-month-day values explicitly
		// note `M-1` is used for month because JS indexes months starting with 0
		expect([d.getFullYear(), d.getMonth(), d.getDate()]).toEqual([Y, M - 1, D]);
	});

	it('passes `true` suppressError prop to Flatpickr', () => {
		expect(suppressErrorComponent.find(Flatpickr).props('suppressError')).toBe(true);
	});

	it('should pass a single date object to `onChange` prop', () => {
		const spyableChange = jest.fn();
		const expectedOnChangeArg = MOCK_VALUE[0];
		const component = mount(
			<CalendarComponent onChange={spyableChange} {...MOCK_PROPS} />
		);

		expect(spyableChange).not.toHaveBeenCalled();
		component
			.instance()
			.onFlatPickerChange(MOCK_VALUE.map(v => convert(v)).map(x => x.toDate()));
		expect(spyableChange).toHaveBeenCalledWith(
			expectedOnChangeArg,
			undefined,
			undefined
		);
	});
});
