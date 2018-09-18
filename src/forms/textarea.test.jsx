import React from 'react';
import TestUtils from 'react-dom/test-utils';
import * as autosizePlugin from 'autosize';
import { Textarea, overrideValue } from './Textarea';

jest.mock('autosize', () => {
	return jest.fn();
});

// Mock out the autosize update function
const mockAutosize = require('autosize');
mockAutosize.update = jest.fn();

const onChange = jest.fn();

describe('Textarea', function() {
	const LABEL_TEXT = 'Super Hero',
		VALUE = 'Batman',
		NAME_ATTR = 'superhero',
		ID = 'super',
		ROWS = 3,
		MIN_HEIGHT = 100,
		MAX_HEIGHT = 300;

	let textareaComponent, autosizeTextareaComponent, textareaEl;

	beforeEach(() => {
		const formAttrs = {
			id: ID,
			name: NAME_ATTR,
			required: true,
		};
		textareaComponent = TestUtils.renderIntoDocument(
			<Textarea
				rows={ROWS}
				label={LABEL_TEXT}
				value={VALUE}
				minHeight={MIN_HEIGHT}
				maxHeight={MAX_HEIGHT}
				{...formAttrs}
			/>
		);
		autosizeTextareaComponent = TestUtils.renderIntoDocument(
			<Textarea id={ID} autosize label={LABEL_TEXT} value={VALUE} {...formAttrs} />
		);

		textareaEl = TestUtils.findRenderedDOMComponentWithTag(
			textareaComponent,
			'textarea'
		);
	});

	it('exists', function() {
		expect(() => textareaEl.not.toThrow());
	});

	it('should set state to value on `overrideValue`', function() {
		const newValue = 'someValue';
		const newState = overrideValue({ value: newValue });

		expect(newState.value).toEqual(newValue);
	});

	it('should call autosize plugin `update` method on `componentDidUpdate`', function() {
		const newValue = 'hello world';
		autosizeTextareaComponent.componentDidUpdate({ value: newValue });

		expect(mockAutosize.update).toHaveBeenCalled();
	});

	it('should have a name attribute', () => {
		expect(textareaEl.name).toEqual(NAME_ATTR);
	});

	it('should have an id', () => {
		expect(textareaEl.getAttribute('id')).toEqual(ID);
	});

	it('should have a value when one is specified', () => {
		expect(textareaEl.value).toEqual(VALUE);
	});

	it('should have a label when label is given', () => {
		expect(() =>
			TestUtils.findRenderedDOMComponentWithTag(textareaComponent, 'label')
		).not.toThrow();
		const labelEl = TestUtils.findRenderedDOMComponentWithTag(
			textareaComponent,
			'label'
		);
		expect(labelEl.textContent).toEqual(LABEL_TEXT);
	});

	it('should have a required attribute when specified', () => {
		expect(textareaEl.attributes.required).not.toBeNull();
	});

	it('should specify attributes that are passed in', function() {
		expect(Number(textareaEl.getAttribute('rows'))).toEqual(ROWS);
	});

	it('should set its value on input change', function() {
		const newValue = `${VALUE}r`;
		expect(textareaEl.value).toEqual(VALUE);
		TestUtils.Simulate.change(textareaEl, { target: { value: newValue } });
		textareaComponent.forceUpdate();
		expect(textareaEl.value).toEqual(newValue);
	});

	it('should call onChange with input change', function() {
		const newValue = `${VALUE}r`;
		const changeSpy = spyOn(Textarea.prototype, 'onChange').and.callThrough();

		const boundComponent = TestUtils.renderIntoDocument(
			<Textarea name={NAME_ATTR} label={LABEL_TEXT} id={ID} value={VALUE} />
		);

		textareaEl = TestUtils.findRenderedDOMComponentWithTag(
			boundComponent,
			'textarea'
		);
		TestUtils.Simulate.change(textareaEl, { target: { value: newValue } });
		textareaComponent.forceUpdate();

		expect(changeSpy).toHaveBeenCalled();
	});
	it('should call onChange `props` function when input is changed', function() {
		const newValue = `${VALUE}r`;

		const boundComponent = TestUtils.renderIntoDocument(
			<Textarea
				name={NAME_ATTR}
				label={LABEL_TEXT}
				value={VALUE}
				id={ID}
				onChange={onChange}
			/>
		);

		expect(onChange).not.toHaveBeenCalled();

		textareaEl = TestUtils.findRenderedDOMComponentWithTag(
			boundComponent,
			'textarea'
		);
		TestUtils.Simulate.change(textareaEl, { target: { value: newValue } });
		textareaComponent.forceUpdate();

		expect(onChange).toHaveBeenCalled();
	});
	it('should call autosize plugin when this.props.autosize is true', function() {
		autosizeTextareaComponent.componentDidMount();

		expect(autosizePlugin.default).toHaveBeenCalled();
	});
	it('should be able to set min and max height', function() {
		expect(textareaEl.getAttribute('style')).toEqual(
			`min-height: ${MIN_HEIGHT}px; max-height: ${MAX_HEIGHT}px;`
		);
	});
});
