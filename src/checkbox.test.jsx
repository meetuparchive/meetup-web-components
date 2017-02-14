import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Checkbox from './Checkbox';


describe('Checkbox', function() {

	let checkboxComponent,
		checkbox;

	beforeEach(() => {
		checkboxComponent = TestUtils.renderIntoDocument(
			<Checkbox label='Hello!' name='greeting' id='hello' value='hello' />
		);
		checkbox = TestUtils.findRenderedDOMComponentWithTag(checkboxComponent, 'input');
	});

	afterEach(() => {
		checkboxComponent = null;
		checkbox = null;
	});

	it('exists', function() {
		expect(() => TestUtils.findRenderedDOMComponentWithTag(checkboxComponent, 'input')).not.toThrow();
	});

	it('has a label with correct for attribute', function() {
		const label = TestUtils.findRenderedDOMComponentWithTag(checkboxComponent, 'label');
		expect(label.getAttribute('for')).toEqual('hello');
	});

	it('has a correct for attribute with generated id if no id is given', function() {
		const name = 'greeting',
			value = 'hello';
		checkboxComponent = TestUtils.renderIntoDocument(
			<Checkbox label='Hello!' name={name} value={value} checked={false} />
		);
		const checkbox = TestUtils.findRenderedDOMComponentWithTag(checkboxComponent, 'input');
		const label = TestUtils.findRenderedDOMComponentWithTag(checkboxComponent, 'label');

		expect(checkbox.getAttribute('id')).toEqual(`${name}-${value}`);
		expect(label.getAttribute('for')).toEqual(`${name}-${value}`);
	});


	it('should be checked when specified', function() {
		checkboxComponent = TestUtils.renderIntoDocument(
			<Checkbox name='greeting' id='hello' value='hello' checked />
		);

		const checkbox = TestUtils.findRenderedDOMComponentWithTag(checkboxComponent, 'input');
		expect(checkbox.checked).toEqual(true);
	});

	it('should not be checked when unspecified', function() {
		const checkbox = TestUtils.findRenderedDOMComponentWithTag(checkboxComponent, 'input');
		expect(checkbox.checked).toEqual(false);
	});

	it('calls onChange and sets state when clicked', function() {
		const changeSpy	= spyOn(Checkbox.prototype, 'onChange').and.callThrough();
		const stateSpy	= spyOn(Checkbox.prototype, 'setState');

		checkboxComponent = TestUtils.renderIntoDocument(<Checkbox name='greeting' id='hello' value='hello' />);
		checkbox = TestUtils.findRenderedDOMComponentWithTag(checkboxComponent, 'input');

		TestUtils.Simulate.change(checkbox, { target: { checked : true }});
		expect(changeSpy).toHaveBeenCalled();
		expect(stateSpy).toHaveBeenCalledWith({ checked: true });
	});
});
