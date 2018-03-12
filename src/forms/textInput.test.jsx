import React from 'react';
import {
	TextInput,
	FIELD_WITH_ICON_CLASS,
} from './TextInput';
import { shallow, mount } from 'enzyme';

describe('TextInput', function() {

	const LABEL_TEXT = 'Super Hero',
		VALUE = 'Batman',
		NAME_ATTR = 'superhero',
		MAX_LEN = 20;

	const formAttrs = {
		id: NAME_ATTR,
		maxLength: MAX_LEN,
		required: true,
	};


	it('renders a required HTML <input> with expected attributes for mock data', () => {
		const component = shallow(
			<TextInput
				name={NAME_ATTR}
				label={LABEL_TEXT}
				value={VALUE}
				id={NAME_ATTR}
				required
			/>
		);

		expect(component).toMatchSnapshot();
	});

	describe('input prop checks, shallow rendering', () => {
		const onChange = jest.fn();

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
					iconShape='search'
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
			const eventData = { target: { value: `${VALUE}r`, setCustomValidity: () => true }};
			inputEl.simulate('change', eventData);
			expect(onChange).toHaveBeenCalledWith(eventData);
		});

		it('should show an icon when iconShape prop is specified', () => {
			expect(inputEl.find(`.${FIELD_WITH_ICON_CLASS}`).exists()).toBe(true);
		});

	});

	describe('dom checks, full rendering', () => {
		let component;

		beforeEach(() => {
			component = mount(
				<TextInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
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

	});
});
