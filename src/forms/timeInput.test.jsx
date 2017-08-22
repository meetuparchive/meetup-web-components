
import React from 'react';
import { shallow } from 'enzyme';
import TimeInput from './TimeInput';

/* eslint-disable */

describe('TimeInput', function() {

	let component,
		inputEl;

	const timeValue = '22:00',
		newTime = '23:00',
		onChangeMock = jest.fn();

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

	describe('onChange', () => {
		const callbackSpy = jest.fn();	
		let onChangeSpy;	

		beforeEach(() => {
			onChangeSpy = jest.spyOn(TimeInput.prototype, 'onChange');
			
			inputEl = shallow(<TimeInput
				name='time'
				value={timeValue}
				onChange={onChangeMock}
				datetimePickerCallback={callbackSpy}
				required />
			).find('input');
		});

		afterEach(() => {
			inputEl = null;
			onChangeSpy.mockClear();
		});

		it('calls internal onChange when value is changed', function() {
			inputEl.simulate('change', { target: { value: newTime } });
			expect(onChangeSpy).toHaveBeenCalled();
		});

		it('calls onChange prop when value is changed', function() {
			inputEl.simulate('change', { target: { value: newTime } });
			expect(onChangeMock).toHaveBeenCalled();
		});

		it('calls datepicker callback with value if one is provided', function() {
			inputEl.simulate('change', { target: { value: newTime } });
			expect(callbackSpy).toHaveBeenCalledWith(newTime);
		});
	});
});


