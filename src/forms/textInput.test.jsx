import React from 'react';
import createReactClass from 'create-react-class';
import TestUtils from 'react-addons-test-utils';
import TextInput from './TextInput';

describe('TextInput', function() {
	const onChange = jest.fn();
	const LABEL_TEXT = 'Super Hero',
		VALUE = 'Batman',
		NAME_ATTR = 'superhero',
		MAX_LEN = '20',
		ERROR_TEXT = 'Too wimpy.';

	let textInputComponent,
		inputEl;

	const Wrapper = createReactClass({
		render: function() {
			return (
				<div>{this.props.children}</div>
			);
		}
	});

	beforeEach(() => {
		const formAttrs = {
			id: NAME_ATTR,
			maxLength: MAX_LEN,
			error: ERROR_TEXT,
			required: true,
		};
		textInputComponent = TestUtils.renderIntoDocument(
			<Wrapper>
				<TextInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
					{...formAttrs}
				/>
			</Wrapper>
		);

		inputEl = TestUtils.findRenderedDOMComponentWithTag(textInputComponent, 'input');
	});

	afterEach(() => {
		textInputComponent = null;
		inputEl = null;
	});

	it('exists', () => {
		expect(() => TestUtils.findRenderedDOMComponentWithTag(textInputComponent, 'input')).not.toThrow();
	});

	it('should have a name attribute', () => {
		expect(inputEl.name).toEqual(NAME_ATTR);
	});

	it('should have a value when one is specified', () => {
		expect(inputEl.value).toEqual(VALUE);
	});

	it('should have a label when label is given', () => {
		expect(() => TestUtils.findRenderedDOMComponentWithTag(textInputComponent, 'label')).not.toThrow();
		const labelEl = TestUtils.findRenderedDOMComponentWithTag(textInputComponent, 'label');
		expect(labelEl.textContent).toEqual(LABEL_TEXT);
	});

	it('should have input type search if `isSearch` is set to true', () => {
		textInputComponent = TestUtils.renderIntoDocument(
			<Wrapper>
				<TextInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
					isSearch
				/>
			</Wrapper>
		);

		inputEl = TestUtils.findRenderedDOMComponentWithTag(textInputComponent, 'input');
		expect(inputEl.getAttribute('type')).toEqual('search');

	});

	it('should have a disabled attribute when specified', () => {
		textInputComponent = TestUtils.renderIntoDocument(
			<Wrapper>
				<TextInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
					disabled
				/>
			</Wrapper>
		);

		inputEl = TestUtils.findRenderedDOMComponentWithTag(textInputComponent, 'input');
		expect(inputEl.attributes.disabled).not.toBeNull();
	});

	it('should have a required attribute when specified', () => {
		expect(inputEl.attributes.required).not.toBeNull();
	});

	it('should specify attributes that are passed in', function() {
		expect(inputEl.getAttribute('maxLength')).toEqual(MAX_LEN);
	});

	it('should have an error when one is specified', function() {
		expect(() => TestUtils.findRenderedDOMComponentWithClass(textInputComponent, 'text--error')).not.toThrow();
		const errorEl = TestUtils.findRenderedDOMComponentWithClass(textInputComponent, 'text--error');
		expect(errorEl.textContent).toEqual(ERROR_TEXT);
	});

	it('should specify attributes that are passed in', function() {
		expect(inputEl.getAttribute('maxLength')).toEqual(MAX_LEN);
	});

	it('should call onChange `props` function when input is changed', () => {
		const newValue = `${VALUE}r`;
		const boundComponent = TestUtils.renderIntoDocument(
			<Wrapper>
				<TextInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
					onChange={onChange}
				/>
			</Wrapper>
		);
		inputEl = TestUtils.findRenderedDOMComponentWithTag(boundComponent, 'input');
		TestUtils.Simulate.change(inputEl, { target: { value: newValue } });

		expect(onChange).toHaveBeenCalled();
	});
});
