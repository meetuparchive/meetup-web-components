import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import TextInput from './TextInput';

describe('TextInput', function() {

	const LABEL_TEXT = 'Super Hero',
		VALUE = 'Batman',
		NAME_ATTR = 'superhero',
		MAX_LEN = '20',
		ERROR_TEXT = 'Too wimpy.';

	let textInput,
		textInputEl,
		inputEl;

	beforeEach(() => {
		const formAttrs = {
			id: NAME_ATTR,
			maxLength: MAX_LEN,
			error: ERROR_TEXT,
			required: 'required'
		};
		textInput = TestUtils.renderIntoDocument(<TextInput
			name={NAME_ATTR}
			label={LABEL_TEXT}
			value={VALUE}
			{...formAttrs} />);

		textInputEl = ReactDOM.findDOMNode(textInput);
		inputEl = textInputEl.querySelector('input');
	});

	afterEach(() => {
		textInputEl = null;
		inputEl = null;
	});

	it('exists', () => {
		expect(textInputEl).not.toBeNull();
	});

	it('should have a name attribute', () => {
		expect(inputEl.name).toEqual(NAME_ATTR);
	});

	it('should have a value when one is specified', () => {
		expect(inputEl.value).toEqual(VALUE);
	});

	it('should have a label when label is given', () => {
		const labelEl = textInputEl.querySelector('label');
		expect(labelEl).not.toBeNull();
		expect(labelEl.textContent).toEqual(LABEL_TEXT);
	});

	it('should have a required attribute when specified', () => {
		expect(inputEl.attributes.required).not.toBeNull();
	});

	it('should specify attributes that are passed in', function() {
		expect(inputEl.getAttribute('maxLength')).toEqual(MAX_LEN);
	});

	it('should have an error when one is specified', function() {
		const errorEl = textInputEl.querySelector('.text--error');
		expect(errorEl).not.toBeNull();
		expect(errorEl.textContent).toEqual(ERROR_TEXT);
	});

	it('should specify attributes that are passed in', function() {
		expect(inputEl.getAttribute('maxLength')).toEqual(MAX_LEN);
	});

	it('should set its value on input change', function() {
		const newValue = `${VALUE}r`;
		expect(inputEl.value).toEqual(VALUE);
		TestUtils.Simulate.change(inputEl, { target: { value: newValue } });
		expect(inputEl.value).toEqual(newValue);
	});

	it('should call onChange and setState with input change', function() {
		const newValue = `${VALUE}r`;
		const changeSpy = spyOn(TextInput.prototype, 'onChange').and.callThrough();
		const stateSpy = spyOn(TextInput.prototype, 'setState').and.callThrough();

		const boundTextInput = TestUtils.renderIntoDocument(<TextInput
			name={NAME_ATTR}
			label={LABEL_TEXT}
			value={VALUE} />);

		textInputEl = ReactDOM.findDOMNode(boundTextInput);
		inputEl = textInputEl.querySelector('input');
		TestUtils.Simulate.change(inputEl, { target: { value: newValue } });

		expect(changeSpy).toHaveBeenCalled();
		expect(stateSpy).toHaveBeenCalledWith({ value: newValue });
	});
});
