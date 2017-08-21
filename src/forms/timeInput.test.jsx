
import React from 'react';
import { shallow } from 'enzyme';
import TimeInput from './TimeInput';

/* eslint-disable */

describe('TimeInput', function() {

	let component,
		inputEl;

	const timeValue = '22:00',
		newTime = '23:00';

	const onChangeMock = jest.fn();

	beforeEach(() => {
		component = shallow(
			<TimeInput
				name='time'
				value={timeValue}
				onChange={onChangeMock}
				required />
		);
		inputEl = component.find('input');
	});

	afterEach(() => {
		component = null;
		inputEl = null;
	});

	it('renders a time html input with expected props', function() {
		expect(component).toMatchSnapshot();
	});

	it('takes a value in HH:mm format', function() {
		expect(inputEl.prop('value')).toEqual(timeValue);
	});

	it('calls internal onChange when value is changed', function() {
		const onChangeSpy = jest.spyOn(TimeInput.prototype, 'onChange');
		let input = shallow(<TimeInput
			name='time'
			value={timeValue}
			onChange={onChangeMock}
			required />
		).find('input');
		input.simulate('change', { target: { value: newTime } });
		expect(onChangeSpy).toHaveBeenCalled();
	});

	it('calls onChange prop when value is changed', function() {
		inputEl.simulate('change', { target: { value: newTime } });
		expect(onChangeMock).toHaveBeenCalled();
	});

	it('calls datepicker callback with value if one is provided', function() {
		const callbackSpy = jest.fn();

		component = shallow(
			<TimeInput
				name='time'
				value={timeValue}
				datetimePickerCallback={callbackSpy}
				required />
		);
		inputEl = component.find('input');
		inputEl.simulate('change', { target: { value: newTime } });
		expect(callbackSpy).toHaveBeenCalledWith(newTime);
	});
});


