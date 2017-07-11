import React from 'react';
import TextInput from './TextInput';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('TextInput', function() {
	const onChange = jest.fn();

	const LABEL_TEXT = 'Super Hero',
		VALUE = 'Batman',
		NAME_ATTR = 'superhero',
		MAX_LEN = 20,
		ERROR_TEXT = 'Too wimpy.';

	const formAttrs = {
		id: NAME_ATTR,
		maxLength: MAX_LEN,
		required: true,
		error: ERROR_TEXT,
	};

	describe('snapshot check', () => {
		let component = mount(
			<TextInput
				name={NAME_ATTR}
				label={LABEL_TEXT}
				value={VALUE}
				onChange={onChange}
				{...formAttrs}
			/>
		);

		it('matches snapshot', () => {
			expect(toJson(component)).toMatchSnapshot();
		});

		component = null;
	});

	describe('input prop checks, shallow rendering', () => {
		let inputEl;

		beforeEach(() => {
			inputEl = shallow(
				<TextInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
					onChange={onChange}
					isSearch
					disabled
					{...formAttrs}
				/>
			).find('input');
		});

		afterEach(() => {
			inputEl = null;
		});

		it('should have a name prop', () => {
			expect(inputEl.prop('name')).toEqual(NAME_ATTR);
		});

		it('should have a value prop equal to the one specified', () => {
			expect(inputEl.prop('value')).toEqual(VALUE);
		});

		it('should have prop type search if `isSearch` is set to true', () => {
			expect(inputEl.prop('type')).toEqual('search');
		});

		it('should have a disabled prop when specified', () => {
			expect(inputEl.prop('disabled')).not.toBeNull();
		});

		it('should have a required prop when specified', () => {
			expect(inputEl.prop('required')).not.toBeNull();
		});

		it('should call onChange `props` function when input is changed', () => {
			const newValue = `${VALUE}r`;
			inputEl.simulate('change', { target: { value: newValue }});

			expect(onChange).toHaveBeenCalled();
			// expect(onChange).toHaveBeenCalledWith({ target: { value: newValue }});
		});

		inputEl = null;
	});

	describe('dom checks, full rendering', () => {
		let component;

		beforeEach(() => {
			component = mount(
				<TextInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
					onChange={onChange}
					isSearch
					disabled
					{...formAttrs}
				/>
			);
		});

		afterEach(() => {
			component = null;
		});

		it('should have a label when label is given', () => {
			const labelEl = component.find('label').getDOMNode();
			expect(labelEl.textContent).toEqual(LABEL_TEXT);
		});

		it('should have an error when one is specified', function() {
			const errorEl = component.find('.text--error').getDOMNode();
			expect(errorEl.textContent).toEqual(ERROR_TEXT);
		});
	});
});
