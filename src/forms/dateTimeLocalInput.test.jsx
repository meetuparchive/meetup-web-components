import React from 'react';
import { shallow } from 'enzyme';
import DateTimeLocalInput from './DateTimeLocalInput';

describe('DateTimeLocal input', function() {
	let component,
		inputEl;

	// use `toISOString()` in order to get correct environment-local date string
	const value = new Date('1999-12-31T23:59:59').toISOString(),
		newValue = new Date('3000-12-31T23:59:59').toISOString(),
		min = new Date('1999-12-30T00:00:00').toISOString(),
		max = new Date('3001-12-31T23:59:59').toISOString();

	beforeEach(() => {
		component = shallow(
			<DateTimeLocalInput
				name="datetime"
				value={value}
				min={min}
				max={max}
				required
			/>
		);
		inputEl = component.find('input');
	});

	afterEach(() => {
		component = null;
		inputEl = null;
	});

	it('should render an input with type time and expected attrs', function() {
		expect(component).toMatchSnapshot();
	});

	it('should set a min value', function() {
		expect(inputEl.prop('min')).toEqual(min);
	});

	it('should set a max value', function() {
		expect(inputEl.prop('max')).toEqual(max);
	});

	describe('onChange', () => {
		let onChangeSpy,
			input;

		const onChangePropSpy = jest.fn(),
			callbackSpy = jest.fn();

		beforeEach(() => {
			onChangeSpy = jest.spyOn(DateTimeLocalInput.prototype, 'onChange');
			input = shallow(
				<DateTimeLocalInput
					name="datetime"
					value={value}
					min={min}
					max={max}
					onChange={onChangePropSpy}
					datetimePickerCallback={callbackSpy}
					required
				/>
			).find('input');
		});

		afterEach(() => {
			inputEl = null;
			onChangeSpy.mockClear();
		});

		it('calls internal onChange when value changed', function() {
			input.simulate('change', { target: { value: newValue } });
			expect(onChangeSpy).toHaveBeenCalled();
		});

		it('calls onChange prop if one is provided, as with redux-form', function() {
			input.simulate('change', { target: { value: newValue } });
			expect(onChangePropSpy).toHaveBeenCalledWith(newValue);
		});

		it('calls a callback with value if one is provided', function() {
			input.simulate('change', { target: { value: newValue } });
			expect(callbackSpy).toHaveBeenCalledWith(newValue);
		});
	});
});
