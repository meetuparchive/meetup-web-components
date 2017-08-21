
import React from 'react';
import { shallow } from 'enzyme';
import TimeInput from './TimeInput';

describe('TimeInput', function() {

	let timeInputComponent,
		timeInputEl;

	const timeValue = '22:00',
		newTime = '23:00',
		onChangeSpy = jest.fn();

	beforeEach(() => {
		timeInputComponent = shallow(
			<TimeInput
				name='time'
				value={timeValue}
				onChange={onChangeSpy}
				required />
		);
		timeInputEl = timeInputComponent.find('input');
	});

	afterEach(() => {
		timeInputComponent = null;
		timeInputEl = null;
	});

	it('renders a time html input with expected props', function() {
		expect(timeInputComponent).toMatchSnapshot();
	});

	it('takes a value in HH:mm format', function() {
		expect(timeInputEl.prop('value')).toEqual(timeValue);
	});

	it('calls onChange and when value is changed', function() {
		timeInputEl.simulate('change', { target: { value: newTime } });
		expect(onChangeSpy).toHaveBeenCalled();
	});

	it('calls a callback with value if one is provided', function() {
		jest.spyOn(TimeInput.prototype, 'onChange');
		const callbackSpy = jest.fn();

		timeInputComponent = shallow(
			<TimeInput
				name='time'
				value={timeValue}
				datetimePickerCallback={callbackSpy}
				required />
		);
		timeInputEl = timeInputComponent.find('input');
		timeInputEl.simulate('change', { target: { value: newTime } });
		expect(callbackSpy).toHaveBeenCalledWith(newTime);
	});
});


