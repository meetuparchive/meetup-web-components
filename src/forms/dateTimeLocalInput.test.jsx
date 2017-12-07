import React from 'react';
import { shallow } from 'enzyme';
import { DateTimeLocalInput } from './DateTimeLocalInput';

describe('DateTimeLocal input', function() {
	let component,
		inputEl,
		onChangeSpy;

	const value = '2000-01-01T00:01',
		newValue = '2017-06-01T08:30',
		min = '1999-12-31T23:55',
		max = '2017-06-30T16:30';

	const onChangePropMock = jest.fn(),
		callbackMock = jest.fn();

	const props = {
		name: 'datetime',
		value,
		min,
		max,
		required: true,
		onChange:onChangePropMock,
		onChangeCallback: callbackMock,
	};

	beforeEach(() => {
		onChangeSpy = jest.spyOn(DateTimeLocalInput.prototype, 'onChange');
		component = shallow(<DateTimeLocalInput {...props}/>);
		inputEl = component.find('input');
	});

	afterEach(() => {
		component = null;
		inputEl = null;
		onChangeSpy.mockClear();
	});

	it('should render an input with type time and expected attrs', function() {
		expect(component).toMatchSnapshot();
	});

	it('calls internal onChange when value changed', function() {
		inputEl.simulate('change', { target: { value: newValue } });
		expect(onChangeSpy).toHaveBeenCalled();
	});

	it('calls onChange prop if one is provided, as with redux-form', function() {
		component.instance().onChange({ target: { value: newValue } });
		expect(onChangePropMock).toHaveBeenCalledWith(newValue);
	});
});
