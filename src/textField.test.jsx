import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import TextField from './TextField';

describe('TextField', function() {

	const LABEL_TEXT = 'Super Hero',
		VALUE = 'Batman',
		NAME_ATTR = 'superhero',
		MAX_LEN = '20',
		ERROR_TEXT = 'Too wimpy.';

	let textFieldEl,
		inputEl;

	beforeEach(() => {
		const formAttrs = {
			id: NAME_ATTR,
			maxLength: MAX_LEN,
			error: ERROR_TEXT,
			required: 'required'
		};
		const textField = TestUtils.renderIntoDocument(<TextField
			name={NAME_ATTR}
			label={LABEL_TEXT}
			value={VALUE}
			{...formAttrs} />);

		textFieldEl = ReactDOM.findDOMNode(textField);
		inputEl = textFieldEl.querySelector('input');
	});

	afterEach(() => {
		textFieldEl = null;
		inputEl = null;
	});

	it('exists', () => {
		expect(textFieldEl).not.toBeNull();
	});

	it('should have a name attribute', () => {
		expect(inputEl.name).toEqual(NAME_ATTR);
	});

	it('should have a value when one is specified', () => {
		expect(inputEl.value).toEqual(VALUE);
	});

	it('should have a label when label is given', () => {
		const labelEl = textFieldEl.querySelector('label');
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
		const errorEl = textFieldEl.querySelector('.text--error');
		expect(errorEl).not.toBeNull();
		expect(errorEl.textContent).toEqual(ERROR_TEXT);
	});

	it('should specify attributes that are passed in', function() {
		expect(inputEl.getAttribute('maxLength')).toEqual(MAX_LEN);
	});

	it('should call onChange with text input', function() {
		const changeSpy = spyOn(TextField.prototype, 'onChange').and.callThrough();
		const stateSpy = spyOn(TextField.prototype, 'setState');

		const textField = TestUtils.renderIntoDocument(<TextField
			name={NAME_ATTR}
			label={LABEL_TEXT}
			value={VALUE} />);

		textFieldEl = ReactDOM.findDOMNode(textField);
		inputEl = textFieldEl.querySelector('input');
		TestUtils.Simulate.change(inputEl, { target: { value: `${VALUE}r` } });

		expect(changeSpy).toHaveBeenCalled();
		expect(stateSpy).toHaveBeenCalledWith({ value: `${VALUE}r` });
	});
});
