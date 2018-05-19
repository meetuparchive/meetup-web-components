import React from 'react';
import { shallow, mount } from 'enzyme';
import { CalendarComponent } from './CalendarComponent';

describe('CalendarComponent', () => {
	// Flatpickr invokes `onChange` with an array arg of `selectedDates`.
	// the first index is the latest date selected.
	const MOCK_VALUE = [new Date('2020-10-12')];

	const MOCK_PROPS = {
		id: 'beyonce',
		name: 'halo',
		label: 'Enter Your Favorite Day',
		helperText: "I'm here to help",
		className: 'beyonce-halo',
		value: new Date('2012-10-12'),
		datepickerOptions: { dateFormat: 'm-d-Y' },
		error: 'this is an error',
	};

	const calendarComponent = shallow(<CalendarComponent {...MOCK_PROPS} />);
	const suppressErrorComponent = shallow(
		<CalendarComponent suppressError {...MOCK_PROPS} />
	);

	it('standard props matches snapshot', () => {
		expect(calendarComponent).toMatchSnapshot();
	});

	it('suppressed error matches snapshot', () => {
		expect(suppressErrorComponent).toMatchSnapshot();
	});

	it('should pass a single date object to `onChange` prop', () => {
		const spyableChange = jest.fn();
		const expectedOnChangeArg = MOCK_VALUE[0];
		const component = mount(
			<CalendarComponent onChange={spyableChange} {...MOCK_PROPS} />
		);

		expect(spyableChange).not.toHaveBeenCalled();
		component.instance().onFlatPickerChange(MOCK_VALUE);
		expect(spyableChange).toHaveBeenCalledWith(
			expectedOnChangeArg,
			undefined,
			undefined
		);
	});
});
