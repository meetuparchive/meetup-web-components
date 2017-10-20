
import React from 'react';
import { shallow } from 'enzyme';
import TimeInput from './TimeInput';

describe('TimeInput', function() {

	let component,
		inputEl,
		onChangeSpy;

	const onChangePropMock = jest.fn(),
		newTime = '23:00';

	const props = {
		name: 'time',
		value: '22:00',
		onChange: onChangePropMock,
		required: true
	};

	beforeEach(() => {
		onChangeSpy = jest.spyOn(TimeInput.prototype, 'onChange');
		component = shallow(<TimeInput {...props} />);
		inputEl = component.find('input');
	});

	afterEach(() => {
		component = null;
		inputEl = null;
		onChangeSpy.mockClear();
	});

	it('renders a time html input with expected props', function() {
		expect(component).toMatchSnapshot();
	});

	it('calls internal onChange when value is changed', function() {
		inputEl.simulate('change', { target: { value: newTime } });
		expect(onChangeSpy).toHaveBeenCalled();
	});

	it('calls onChange prop when value is changed', function() {
		const e = { target: { value: newTime } };
		component.instance().onChange(e);
		expect(onChangePropMock).toHaveBeenCalledWith(e);
	});

});

