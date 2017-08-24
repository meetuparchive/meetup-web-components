import React from 'react';
import { shallow } from 'enzyme';
import DateTimeLocalInput from './DateTimeLocalInput';

describe('DateTimeLocal input', function() {
	let component,
		inputEl,
		handleChangeSpy;

	const value = '2000-01-01T00:01',
		newValue = '2017-06-01T08:30',
		min = '1999-12-31T23:55',
		max = '2017-06-30T16:30';

	const onChangePropMock = jest.fn();

	const props = {
		name: 'datetime',
		value,
		min,
		max,
		required: true,
		onChange:onChangePropMock
	};

	beforeEach(() => {
		handleChangeSpy = jest.spyOn(DateTimeLocalInput.prototype, 'handleChange');
		component = shallow(<DateTimeLocalInput {...props} />);
		inputEl = component.find('input');
	});

	afterEach(() => {
		component = null;
		inputEl = null;
		handleChangeSpy.mockClear();
	});

	it('should render an input with type time and expected attrs', function() {
		expect(component).toMatchSnapshot();
	});

	it('calls internal handleChange when value changed', function() {
		const eventObj = { target: { value: newValue } };
		inputEl.simulate('change', eventObj);
		expect(handleChangeSpy).toHaveBeenCalled();
	});

	it('calls onChange prop if one is provided, as with redux-form', function() {
		component.instance().handleChange({ target: { value: newValue } });
		expect(onChangePropMock).toHaveBeenCalledWith(newValue);
	});
});
