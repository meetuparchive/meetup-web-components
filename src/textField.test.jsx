import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import TextField from './TextField';

describe('TextField', function() {

	const LABEL_TEXT = 'Super Hero',
		VALUE = 'Batman',
		NAME_ATTR = 'superhero',
		MAX_LEN = '20';

	let textFieldEl,
		inputEl;

	beforeEach(() => {
		const formAttrs = {
			id: NAME_ATTR,
			name: NAME_ATTR,
			maxLength: MAX_LEN,
			required: 'required'
		};
		const textField = TestUtils.renderIntoDocument(<TextField
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
});
