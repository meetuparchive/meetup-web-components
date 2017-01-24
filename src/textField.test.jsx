import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import TextField from './TextField';

describe('TextField', function() {

	let textFieldEl,
		inputEl;

	beforeEach(() => {
		const formAttrs = { required: 'required' };
		const textField = TestUtils.renderIntoDocument(<TextField
			name="superhero"
			label='Super Hero'
			value='Batman'
			formAttrs={formAttrs} />);

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

	it('should have a value when one is specified', () => {
		expect(inputEl.value).toEqual('Batman');
	});

	it('should have a label when labelText is given', () => {
		const labelEl = textFieldEl.querySelector('label');
		expect(labelEl).not.toBeNull();
		expect(labelEl.textContent).toEqual('Super Hero');
	});

	it('should have a required attribute when specified', () => {
		expect(inputEl.attributes.required).not.toBeNull();
	});

	it('should specify attributes that are passed in', function() {});
});
