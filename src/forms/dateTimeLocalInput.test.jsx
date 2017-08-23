import React from 'react';
import { shallow } from 'enzyme';
import DateTimeLocalInput from './DateTimeLocalInput';

describe('DateTimeLocal input', function() {
	let component,
		inputEl;

	const value = '2000-01-01T00:01',
		newValue = '2017-06-01T08:30',
		min = '1999-12-31T23:55',
		max = '2017-06-30T16:30';

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
					required
					onChange={onChangePropSpy}
					onChangeCallback={callbackSpy}
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
