import React from 'react';
import { shallow, mount } from 'enzyme';
import DateTimeLocalInput from './DateTimeLocalInput';

describe('DateTimeLocal input', function() {
	let component,
		inputWrapper,
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
		onChange:onChangePropMock,
	};

	beforeEach(() => {
		handleChangeSpy = jest.spyOn(DateTimeLocalInput.prototype, 'handleChange');
		component = shallow(<DateTimeLocalInput {...props}/>);
		inputWrapper = component.find('input');
	});

	afterEach(() => {
		component = null;
		inputWrapper = null;
		handleChangeSpy.mockClear();
	});

	it('should render an input with type time and expected attrs', function() {
		expect(component).toMatchSnapshot();
	});

	it('if controlled component without paren, should update its value and state on input change', function() {
		const propsWithoutValue = {
			name: 'datetime',
			defaultValue: '2000-01-01T00:01',
			min,
			max,
			required: true
		};
		const eventObj = { target: { value: newValue } };

		component = mount(<DateTimeLocalInput {...propsWithoutValue} />);
		inputWrapper = component.find('input');

		inputWrapper.simulate('change', eventObj);
		expect(component.state('value')).toEqual(newValue);
		expect(component.find('input').getDOMNode().getAttribute('value')).toEqual(newValue);
		// here is where I would like to confirm the value of the actual input to make sure 
		// the value from state went through
	});

	it('calls internal onChange when value changed', function() {
		const eventObj = { target: { value: newValue } };
		inputWrapper.simulate('change', eventObj);
		expect(handleChangeSpy).toHaveBeenCalledWith(eventObj);
	});

	it('calls onChange prop if one is provided, as with redux-form', function() {
		component.instance().handleChange({ target: { value: newValue } });
		expect(onChangePropMock).toHaveBeenCalledWith(newValue);
	});
});
