import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Checkbox from './Checkbox';


describe('Checkbox', function() {

	let checkbox,
		checkboxNode;

	beforeEach(() => {
		checkbox = TestUtils.renderIntoDocument(
			<Checkbox label='Hello!' name='greeting' id='hello' value='hello' />
		);
		checkboxNode = ReactDOM.findDOMNode(checkbox);
	});

	afterEach(() => {
		checkbox = null;
		checkboxNode = null;
	});

	it('exists', function() {
		expect(checkboxNode).not.toBeNull();
	});

	it('has a label with correct for attribute', function() {
		const labelEl = checkboxNode.querySelector('label');
		expect(labelEl.getAttribute('for')).toEqual('hello');
	});

	it('has a correct for attribute with generated id if no id is given', function() {
		const name = 'greeting',
			value = 'hello';
		checkbox = TestUtils.renderIntoDocument(
			<Checkbox label='Hello!' name={name} value={value} checked={false} />
		);
		checkboxNode = ReactDOM.findDOMNode(checkbox);
		const checkboxEl = checkboxNode.querySelector('input[type=checkbox]');
		const labelEl = checkboxNode.querySelector('label');

		expect(checkboxEl.getAttribute('id')).toEqual(`${name}-${value}`);
		expect(labelEl.getAttribute('for')).toEqual(`${name}-${value}`);
	});


	it('should be checked when specified', function() {
		checkbox = TestUtils.renderIntoDocument(<Checkbox name='greeting' id='hello' value='hello' checked />);
		checkboxNode = ReactDOM.findDOMNode(checkbox);

		const checkboxEl = checkboxNode.querySelector('input[type=checkbox]');
		expect(checkboxEl.checked).toEqual(true);
	});

	it('should not be checked when unspecified', function() {
		const checkboxEl = checkboxNode.querySelector('input[type=checkbox]');
		expect(checkboxEl.checked).toEqual(false);
	});

	it('calls onChange and sets state when clicked', function() {
		const changeSpy	= spyOn(Checkbox.prototype, 'onChange').and.callThrough();
		const stateSpy	= spyOn(Checkbox.prototype, 'setState');

		checkbox = TestUtils.renderIntoDocument(<Checkbox name='greeting' id='hello' value='hello' />);
		checkboxNode = ReactDOM.findDOMNode(checkbox);
		const checkboxEl = checkboxNode.querySelector('input[type=checkbox]');

		TestUtils.Simulate.change(checkboxEl, { target: { checked : true }});
		expect(changeSpy).toHaveBeenCalled();
		expect(stateSpy).toHaveBeenCalledWith({ checked: true });
	});
});
