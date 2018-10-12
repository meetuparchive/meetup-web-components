import React from 'react';
import UncontrolledTextarea, { overrideValue } from './UncontrolledTextarea';
import { shallow } from 'enzyme';

describe('UncontrolledTextarea', () => {
	const props = {
		value: 'Batman',
		name: 'superhero',
		id: 'super',
		rows: 3,
		minHeight: 100,
		maxHeight: 300,
	};

	it('should set its value on input change', () => {
		const component = shallow(<UncontrolledTextarea {...props} required />);
		expect(component).toMatchSnapshot();
		component.setState({ value: 'New text value!' });
		expect(component).toMatchSnapshot();
	});

	it('should set state to value on `overrideValue`', () => {
		const newValue = 'someValue';
		const newState = overrideValue({ value: newValue });

		expect(newState.value).toEqual(newValue);
	});

	it('should set state to value on `overrideValue`', () => {
		const component = shallow(<UncontrolledTextarea {...props} required />);
		component.setProps({ value: undefined });
		expect(component.state().value).toBe('');
		expect(overrideValue({})).toEqual({ value: '' });
	});
});
