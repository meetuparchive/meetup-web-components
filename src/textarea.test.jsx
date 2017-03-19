import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Textarea from './Textarea';

describe('Textarea', function() {
	const LABEL_TEXT = 'Super Hero',
		VALUE = 'Batman',
		NAME_ATTR = 'superhero',
		ID = 'super',
		ROWS = 3,
		MIN_HEIGHT = 100,
		MAX_HEIGHT = 300,
		ERROR_TEXT = 'Too wimpy.';

	let textareaComponent,
		autosizeTextareaComponent,
		textareaEl,
		autosizeTextareaEl;

	beforeEach(() => {
		const formAttrs = {
			id: ID,
			name: NAME_ATTR,
			error: ERROR_TEXT,
			required: true
		};
		textareaComponent = TestUtils.renderIntoDocument(<Textarea
			rows={ROWS}
			label={LABEL_TEXT}
			value={VALUE}
			minHeight={MIN_HEIGHT}
			maxHeight={MAX_HEIGHT}
			{...formAttrs} />);
		autosizeTextareaComponent = TestUtils.renderIntoDocument(<Textarea
			rows='auto'
			label={LABEL_TEXT}
			value={VALUE}
			{...formAttrs} />);

		textareaEl = TestUtils.findRenderedDOMComponentWithTag(textareaComponent, 'textarea');
		autosizeTextareaEl = TestUtils.findRenderedDOMComponentWithTag(autosizeTextareaComponent, 'textarea');
	});

	it('exists', function() {
		expect(() => textareaEl.not.toThrow());
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
		expect(() => TestUtils.findRenderedDOMComponentWithTag(textareaComponent, 'label')).not.toThrow();
		const labelEl = TestUtils.findRenderedDOMComponentWithTag(textareaComponent, 'label');
		expect(labelEl.textContent).toEqual(LABEL_TEXT);
	});

	it('should have a required attribute when specified', () => {
		expect(textareaEl.attributes.required).not.toBeNull();
	});

	it('should specify attributes that are passed in', function() {
		expect(Number(textareaEl.getAttribute('rows'))).toEqual(ROWS);
	});

	it('should have an error when one is specified', function() {
		expect(() => TestUtils.findRenderedDOMComponentWithClass(textareaComponent, 'text--error')).not.toThrow();
		const errorEl = TestUtils.findRenderedDOMComponentWithClass(textareaComponent, 'text--error');
		expect(errorEl.textContent).toEqual(ERROR_TEXT);
	});

	it('should set its value on input change', function() {
		const newValue = `${VALUE}r`;
		expect(textareaEl.value).toEqual(VALUE);
		TestUtils.Simulate.change(textareaEl, { target: { value: newValue } });
		expect(textareaEl.value).toEqual(newValue);
	});
	it('should call onChange and setState with input change', function() {
		const newValue = `${VALUE}r`;
		const changeSpy = spyOn(Textarea.prototype, 'onChange').and.callThrough();
		const stateSpy = spyOn(Textarea.prototype, 'setState').and.callThrough();

		const boundComponent = TestUtils.renderIntoDocument(<Textarea
			name={NAME_ATTR}
			label={LABEL_TEXT}
			value={VALUE} />);

		textareaEl = TestUtils.findRenderedDOMComponentWithTag(boundComponent, 'textarea');
		TestUtils.Simulate.change(textareaEl, { target: { value: newValue } });

		expect(changeSpy).toHaveBeenCalled();
		expect(stateSpy).toHaveBeenCalledWith({ value: newValue });
	});
	it('should grow based on the value', function() {
		const newValue = `${VALUE} one \n two \n three \n four`;

		TestUtils.Simulate.change(textareaEl, { target: { value: newValue } });
		console.log(autosizeTextareaEl.getAttribute('style'));
		// setTimeout(console.log(autosizeTextareaEl.getAttribute('style')), 1000);
	});
	it('should set be able to min and max height', function() {
		expect(textareaEl.getAttribute('style')).toEqual(`min-height: ${MIN_HEIGHT}px; max-height: ${MAX_HEIGHT}px;`);
	});

});
