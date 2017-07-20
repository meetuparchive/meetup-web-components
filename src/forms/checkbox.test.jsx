import React from 'react';
import { shallow } from 'enzyme';

// import Icon from '../media/Icon';
// import Checkbox, { FAUX_TOGGLE_CLASS, FOCUSED_CHECKBOX_CLASS, DISABLED_CHECKBOX_CLASS, CHECKED_CHECKBOX_CLASS } from './Checkbox';

const JSXcheckboxUnchecked = (
	<Checkbox
		label='Hello!'
		name='greeting'
		id='hello'
		value='hello'
	/>
);
const JSXcheckboxChecked = (
	<Checkbox
		label='Hello!'
		name='greeting'
		id='hello'
		value='hello'
		checked
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

		/*
		 *        it('has a label with correct for attribute', function() {
		 *            const label = TestUtils.findRenderedDOMComponentWithTag(checkboxComponent, 'label');
		 *            expect(label.getAttribute('for')).toEqual('hello');
		 *        });
		 *
		 *        it('has a correct for attribute with generated id if no id is given', function() {
		 *            const name = 'greeting',
		 *                value = 'hello';
		 *            checkboxComponent = TestUtils.renderIntoDocument(
		 *                <Checkbox label='Hello!' name={name} value={value} checked={false} />
		 *            );
		 *            const checkbox = TestUtils.findRenderedDOMComponentWithTag(checkboxComponent, 'input');
		 *            const label = TestUtils.findRenderedDOMComponentWithTag(checkboxComponent, 'label');
		 *
		 *            expect(checkbox.getAttribute('id')).toEqual(`${name}-${value}`);
		 *            expect(label.getAttribute('for')).toEqual(`${name}-${value}`);
		 *        });
		 *
		 *
		 *        it('should be checked when specified', function() {
		 *            checkboxComponent = TestUtils.renderIntoDocument(
		 *                <Checkbox name='greeting' id='hello' value='hello' checked />
		 *            );
		 *
		 *            const checkbox = TestUtils.findRenderedDOMComponentWithTag(checkboxComponent, 'input');
		 *            expect(checkbox.checked).toEqual(true);
		 *        });
		 *
		 *        it('should not be checked when unspecified', function() {
		 *            const checkbox = TestUtils.findRenderedDOMComponentWithTag(checkboxComponent, 'input');
		 *            expect(checkbox.checked).toEqual(false);
		 *        });
		 *
		 *        it('calls onChange and sets state when clicked', function() {
		 *            const changeSpy	= spyOn(Checkbox.prototype, 'onChange').and.callThrough();
		 *            const stateSpy	= spyOn(Checkbox.prototype, 'setState');
		 *
		 *            checkboxComponent = TestUtils.renderIntoDocument(<Checkbox name='greeting' id='hello' value='hello' />);
		 *            checkbox = TestUtils.findRenderedDOMComponentWithTag(checkboxComponent, 'input');
		 *
		 *            TestUtils.Simulate.change(checkbox, { target: { checked : true }});
		 *            expect(changeSpy).toHaveBeenCalled();
		 *            expect(stateSpy).toHaveBeenCalledWith({ checked: true });
		 *        });
		 */
	});

	/*
	 *    describe('fauxInput', function() {
	 *        it('should render a faux input', () => {
	 *            const fauxCheckboxEl = TestUtils.findRenderedDOMComponentWithClass(checkboxComponent, FAUX_TOGGLE_CLASS);
	 *
	 *            expect(fauxCheckboxEl.classList).toContain(FAUX_TOGGLE_CLASS);
	 *        });
	 *
	 *        it(`should add class ${CHECKED_CHECKBOX_CLASS} to the faux input when the real input is checked`, () => {
	 *            checkboxComponent = TestUtils.renderIntoDocument(
	 *                <Checkbox name='greeting' id='hello' value='hello' checked />
	 *            );
	 *            const fauxCheckboxEl = TestUtils.findRenderedDOMComponentWithClass(checkboxComponent, FAUX_TOGGLE_CLASS);
	 *
	 *            expect(fauxCheckboxEl.classList).toContain(CHECKED_CHECKBOX_CLASS);
	 *        });
	 *
	 *        it('should render an icon when the faux input is checked', () => {
	 *            checkboxComponent = TestUtils.renderIntoDocument(
	 *                <Checkbox name='greeting' id='hello' value='hello' checked />
	 *            );
	 *            const node = TestUtils.scryRenderedComponentsWithType(checkboxComponent, Icon);
	 *
	 *            expect(node.length).toBe(1);
	 *        });
	 *
	 *        it(`should add class ${FOCUSED_CHECKBOX_CLASS} when the faux input is focused`, () => {
	 *            const inputEl = TestUtils.findRenderedDOMComponentWithTag(checkboxComponent, 'input');
	 *            const fauxInputEl = TestUtils.findRenderedDOMComponentWithClass(checkboxComponent, FAUX_TOGGLE_CLASS);
	 *            expect(fauxInputEl.classList).not.toContain(FOCUSED_CHECKBOX_CLASS);
	 *            TestUtils.Simulate.focus(inputEl);
	 *            expect(fauxInputEl.classList).toContain(FOCUSED_CHECKBOX_CLASS);
	 *        });
	 *
	 *        it(`should remove class ${FOCUSED_CHECKBOX_CLASS} when the faux input loses focused`, () => {
	 *            const inputEl = TestUtils.findRenderedDOMComponentWithTag(checkboxComponent, 'input');
	 *            const fauxInputEl = TestUtils.findRenderedDOMComponentWithClass(checkboxComponent, FAUX_TOGGLE_CLASS);
	 *            TestUtils.Simulate.focus(inputEl);
	 *            expect(fauxInputEl.classList).toContain(FOCUSED_CHECKBOX_CLASS);
	 *            TestUtils.Simulate.blur(inputEl);
	 *            expect(fauxInputEl.classList).not.toContain(FOCUSED_CHECKBOX_CLASS);
	 *        });
	 *
	 *        it(`should add class ${DISABLED_CHECKBOX_CLASS} when the faux input is disabled`, () => {
	 *            checkboxComponent = TestUtils.renderIntoDocument(<Checkbox name='greeting' id='hello' value='hello' disabled />);
	 *            const fauxCheckboxEl = TestUtils.findRenderedDOMComponentWithClass(checkboxComponent, FAUX_TOGGLE_CLASS);
	 *
	 *            expect(fauxCheckboxEl.classList).toContain(DISABLED_CHECKBOX_CLASS);
	 *        });
	 *
	 *    });
	 */

});
