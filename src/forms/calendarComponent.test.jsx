import React from 'react';
import { mount } from 'enzyme';
import CalendarComponent, { CLASSES } from './CalendarComponent';
import Flatpickr from 'react-flatpickr';

const SELECTOR_ERROR = '.text--error';

describe('CalendarComponent', () => {
	const onChangePropMock = jest.fn();
	const MOCK_VALUE = new Date('2020-10-12');
	const MOCK_PROPS = {
		id: 'beyonce',
		name: 'halo',
		label: "Enter Your Favorite Day",
		helperText: "I'm here to help",
		className: 'beyonce-halo',
		value: new Date('2012-10-12'),
		datepickerOptions: { dateFormat: 'm-d-Y' },
		error: 'this is an error',
		onChange: onChangePropMock,
	};

	const calendarComponent = mount(
		<CalendarComponent {...MOCK_PROPS} />
	);
	const suppressErrorComponent = mount(
		<CalendarComponent
			suppressError
			{...MOCK_PROPS}
		/>
	);
	const fpComponent = calendarComponent.find(Flatpickr);

	it('matches snapshot', () => {
		expect(calendarComponent).toMatchSnapshot();
	});

	it('sets helper text when passed as prop', () => {
		const helperEl = calendarComponent.find(`.${CLASSES.helperText}`);
		expect(helperEl.text()).toBe(MOCK_PROPS.helperText);
	});

	it('shows error message when `error` prop is passed', () => {
		const errorEl = calendarComponent.find(SELECTOR_ERROR);
		expect(errorEl.text()).toBe(MOCK_PROPS.error);
	});

	it('does NOT render error message when `suppressError` prop is passed', () => {
		const errorEl = suppressErrorComponent.find(SELECTOR_ERROR);
		expect(errorEl.length).toBe(0);
	});

	it('calls onChange prop if one is provided, as with redux-form', () => {
		expect(onChangePropMock).not.toHaveBeenCalled();
		fpComponent.props().onChange(MOCK_VALUE);
		expect(onChangePropMock).toHaveBeenCalledWith(MOCK_VALUE);
	});

	it('sets correct htmlFor, label text, and field id', () => {
		const labelEl = calendarComponent.find('label');
		const fieldEl = fpComponent.find('input');
		expect(labelEl.text()).toBe(MOCK_PROPS.label);
		expect(labelEl.prop('htmlFor')).toBe(MOCK_PROPS.id);
		expect(fieldEl.prop('id')).toBe(MOCK_PROPS.id);
	});
});
