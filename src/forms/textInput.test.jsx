import React from 'react';
import { TextInput } from './TextInput';
import { mount } from 'enzyme';

const LABEL_TEXT = 'Super Hero',
	VALUE = 'Batman',
	NAME_ATTR = 'superhero',
	MAX_LEN = 20;

const DEFAULT_PROPS = {
	label: LABEL_TEXT,
	id: NAME_ATTR,
	name: NAME_ATTR,
	maxLength: MAX_LEN,
	value: VALUE,
	onChange: jest.fn(),
};

const renderComponent = (props = {}) =>
	mount(<TextInput {...DEFAULT_PROPS} {...props} />);

describe('TextInput', function() {
	it('renders a required HTML <input> with expected attributes for mock data', () => {
		expect(renderComponent()).toMatchSnapshot();
	});

	it('should pass along specific props to the input element', () => {
		const inputEl = renderComponent({
			isSearch: true,
			disabled: true,
			required: true,
		}).find('input');

		// should have a name prop
		expect(inputEl.prop('name')).toEqual(NAME_ATTR);

		// should have a value prop
		expect(inputEl.prop('value')).toEqual(VALUE);

		// should have type set to search
		expect(inputEl.prop('type')).toEqual('search');

		// should have disabled prop
		expect(inputEl.prop('disabled')).not.toBeNull();

		// should have required prop
		expect(inputEl.prop('required')).not.toBeNull();
	});

	it('should call onChange `props` function when input is changed', () => {
		DEFAULT_PROPS.onChange.mockClear();

		const inputEl = renderComponent().find('input');
		const mockEvent = {
			target: {
				value: `${VALUE}`,
				setCustomValidity: jest.fn(),
			},
		};

		inputEl.simulate('change', mockEvent);

		expect(DEFAULT_PROPS.onChange).toHaveBeenCalled();
	});

	// TODO: THIS TEST FAILS FOR A REAL REASON!
	// WE NEED TO ADD SUPPORT FOR `iconShape` PROP TO THE SWARM-COMPONENTS TEXTINPUT
	it('should show an icon when iconShape prop is specified', () => {
		const component = renderComponent({
			iconShape: 'search',
		});
		expect(component.find('svg').exists()).toBe(true);
	});

	it('should have a label when label is given', () => {
		const labelEl = renderComponent()
			.find('label')
			.getDOMNode();
		expect(labelEl.textContent).toEqual(LABEL_TEXT);
	});
});
