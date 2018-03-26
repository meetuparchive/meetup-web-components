import React from 'react';
import { shallow, render, mount } from 'enzyme';

import Checkbox, {
	FAUX_TOGGLE_CLASS,
	FOCUSED_CHECKBOX_CLASS,
	DISABLED_CHECKBOX_CLASS,
} from './Checkbox';

const fakeOnChange = jest.fn();

const JSXcheckboxUnchecked = (
	<Checkbox label="Hello!" name="greeting" id="hello" value="hello" />
);
const JSXcheckboxChecked = (
	<Checkbox label="Hello!" name="greeting" id="hello" value="hello" checked />
);
const JSXcheckboxDisabled = (
	<Checkbox label="Hello!" name="greeting" id="hello" value="hello" disabled />
);
const JSXcheckboxUncheckedWithOnChange = (
	<Checkbox
		label="Hello!"
		name="greeting"
		id="hello"
		value="hello"
		onChange={fakeOnChange}
	/>
);

describe('Checkbox', function() {
	describe('basic', function() {
		const uncheckedComponent = shallow(JSXcheckboxUnchecked);
		const checkedComponent = shallow(JSXcheckboxChecked);

		it('renders unchecked checkbox', function() {
			expect(uncheckedComponent).toMatchSnapshot();
		});

		it('renders checked checkbox', function() {
			expect(checkedComponent).toMatchSnapshot();
		});

		it('has a label with correct for attribute', () => {
			const component = render(JSXcheckboxUnchecked);
			expect(component.attr('for')).toEqual('hello');
		});

		it('has a correct for attribute with generated id if no id is given', function() {
			const component = render(JSXcheckboxUnchecked);
			const checkbox = component.find('input');

			expect(component.attr('for')).toEqual('hello');
			expect(checkbox.attr('id')).toEqual('hello');
		});

		it('calls onChange and sets state clicked', function() {
			fakeOnChange.mockClear();
			const component = mount(JSXcheckboxUncheckedWithOnChange);
			const checkbox = component.find('input');

			expect(checkbox.props().checked).toBe(false);
			expect(fakeOnChange).not.toHaveBeenCalled();
			checkbox.simulate('change', { target: { checked: true } });
			expect(component.find('input').props().checked).toBe(true);
			expect(component.instance().state.checked).toBe(true);
			expect(fakeOnChange).toHaveBeenCalled();
		});

		it('calls onChange and does not set state', function() {
			fakeOnChange.mockClear();
			const component = mount(
				<Checkbox
					label="Hello!"
					name="greeting"
					id="hello"
					value="hello"
					checked
					controlled={false}
					onChange={fakeOnChange}
				/>
			);
			const checkbox = component.find('input');

			expect(checkbox.props().checked).toBe(true);
			expect(fakeOnChange).not.toHaveBeenCalled();
			checkbox.simulate('change', { target: { checked: true } });
			expect(component.find('input').props().checked).toBe(true);
			expect(component.instance().state.checked).toBe(true);
			expect(fakeOnChange).toHaveBeenCalled();
		});

		it('sets state when changing from uncontrolled to controlled', function() {
			const component = mount(
				<Checkbox
					label="Hello!"
					name="greeting"
					id="hello"
					value="hello"
					checked={false}
					controlled={false}
				/>
			);
			expect(component.instance().state.checked).toBe(false);
			component.setProps({ checked: true });
			expect(component.instance().state.checked).toBe(false);
			component.setProps({ controlled: true });
			expect(component.instance().state.checked).toBe(true);
		});
	});

	describe('fauxInput', function() {
		it('should render an icon when the faux input is checked', () => {
			const component = mount(JSXcheckboxChecked);
			const icon = component.find('svg');

			expect(icon.length).toBe(1);
		});

		it(`should add class '${FOCUSED_CHECKBOX_CLASS}' when the faux input is focused`, () => {
			const component = mount(JSXcheckboxUnchecked);
			const fauxInput = component.find(`.${FAUX_TOGGLE_CLASS}`);
			const input = component.find('input');

			expect(fauxInput.hasClass(FOCUSED_CHECKBOX_CLASS)).toBe(false);
			input.simulate('focus');
			expect(
				component.find(`.${FAUX_TOGGLE_CLASS}`).hasClass(FOCUSED_CHECKBOX_CLASS)
			).toBe(true);
		});

		it(`should remove class '${FOCUSED_CHECKBOX_CLASS}' when the faux input loses focus`, () => {
			const component = mount(JSXcheckboxUnchecked);
			const input = component.find('input');

			input.simulate('focus');
			expect(
				component.find(`.${FAUX_TOGGLE_CLASS}`).hasClass(FOCUSED_CHECKBOX_CLASS)
			).toBe(true);
			input.simulate('blur');
			expect(
				component.find(`.${FAUX_TOGGLE_CLASS}`).hasClass(FOCUSED_CHECKBOX_CLASS)
			).toBe(false);
		});

		it(`should add class ${DISABLED_CHECKBOX_CLASS} when the faux input is disabled`, () => {
			const component = mount(JSXcheckboxDisabled);
			const fauxInput = component.find(`.${FAUX_TOGGLE_CLASS}`);

			expect(fauxInput.hasClass(DISABLED_CHECKBOX_CLASS)).toBe(true);
		});
	});
});
