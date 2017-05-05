import React from 'react';
import TestUtils from 'react-addons-test-utils';
import NumberInput, {DECREMENT_BTN_CLASS, INCREMENT_BTN_CLASS} from './NumberInput';

describe('NumberInput', function() {
	const onChange = jest.fn();
	const LABEL_TEXT = 'Are you bringing any guests?',
		VALUE = 2,
		NAME_ATTR = 'amountCount',
		ERROR_TEXT = 'Not so fast. You have an error.',
		PLACEHOLDER = 'Guests',
		MAX_ATTR = 10,
		MIN_ATTR = 1,
		STEP_ATTR = 1;

	let numberInputComponent,
		inputEl;

	beforeEach(() => {
		const formAttrs = {
			id: NAME_ATTR,
			min: MIN_ATTR,
			max: MAX_ATTR,
			error: ERROR_TEXT,
			required: true,
		};
		numberInputComponent = TestUtils.renderIntoDocument(
			<NumberInput
				name={NAME_ATTR}
				label={LABEL_TEXT}
				value={VALUE}
				{...formAttrs}
			/>
		);

		inputEl = TestUtils.findRenderedDOMComponentWithTag(numberInputComponent, 'input');
	});

	afterEach(() => {
		numberInputComponent = null;
		inputEl = null;
	});

	it('exists', () => {
		expect(() => TestUtils.findRenderedDOMComponentWithTag(numberInputComponent, 'input')).not.toThrow();
	});

	it('should have a name attribute', () => {
		expect(inputEl.name).toEqual(NAME_ATTR);
	});

	it('should have a value when one is specified', () => {
		expect(parseFloat(inputEl.value)).toEqual(VALUE);
	});

	it('should have a label when label is given', () => {
		expect(() => TestUtils.findRenderedDOMComponentWithTag(numberInputComponent, 'label')).not.toThrow();
		const labelEl = TestUtils.findRenderedDOMComponentWithTag(numberInputComponent, 'label');
		expect(labelEl.textContent).toEqual(LABEL_TEXT);
	});

	it('should have a required attribute when specified', () => {
		expect(inputEl.attributes.required).not.toBeNull();
	});

	it('should have a max attribute', () => {
		expect(parseFloat(inputEl.max)).toEqual(MAX_ATTR);
	});

	it('should have a min attribute', () => {
		expect(parseFloat(inputEl.min)).toEqual(MIN_ATTR);
	});

	it('should have a step attribute', () => {
		expect(parseFloat(inputEl.step)).toEqual(STEP_ATTR);
	});

	it('should specify attributes that are passed in', function() {
		const boundComponent = TestUtils.renderIntoDocument(
			<NumberInput
				name={NAME_ATTR}
				label={LABEL_TEXT}
				value={VALUE}
				onChange={onChange}
				placeholder={PLACEHOLDER}
			/>
		);
		inputEl = TestUtils.findRenderedDOMComponentWithTag(boundComponent, 'input');

		expect(inputEl.getAttribute('placeholder')).toEqual(PLACEHOLDER);
	});

	it('should have an error when one is specified', function() {
		expect(() => TestUtils.findRenderedDOMComponentWithClass(numberInputComponent, 'text--error')).not.toThrow();
		const errorEl = TestUtils.findRenderedDOMComponentWithClass(numberInputComponent, 'text--error');
		expect(errorEl.textContent).toEqual(ERROR_TEXT);
	});

	it('should set its value on input change', function() {
		const newValue = new Number(VALUE) + new Number(STEP_ATTR);
		expect(parseFloat(inputEl.value)).toEqual(VALUE);
		TestUtils.Simulate.change(inputEl, { target: { value: newValue } });
		expect(parseFloat(inputEl.value)).toEqual(newValue);
	});

	it('should call onChange and setState with input change', function() {
		const newValue = new Number(VALUE) + new Number(STEP_ATTR);
		const changeSpy = spyOn(NumberInput.prototype, 'onChange').and.callThrough();
		const stateSpy = spyOn(NumberInput.prototype, 'setState').and.callThrough();

		const boundComponent = TestUtils.renderIntoDocument(
			<NumberInput
				name={NAME_ATTR}
				label={LABEL_TEXT}
				value={VALUE}
				onChange={onChange}
			/>
		);

		inputEl = TestUtils.findRenderedDOMComponentWithTag(boundComponent, 'input');
		TestUtils.Simulate.change(inputEl, { target: { value: newValue } });

		expect(changeSpy).toHaveBeenCalled();
		expect(stateSpy).toHaveBeenCalledWith({ value: newValue });
	});

	it('should call onChange `props` function when input is changed', () => {
		const newValue = new Number(VALUE) + new Number(STEP_ATTR);
		const boundComponent = TestUtils.renderIntoDocument(
			<NumberInput
				name={NAME_ATTR}
				label={LABEL_TEXT}
				value={VALUE}
				onChange={onChange}
			/>
		);
		inputEl = TestUtils.findRenderedDOMComponentWithTag(boundComponent, 'input');
		TestUtils.Simulate.change(inputEl, { target: { value: newValue } });

		expect(onChange).toHaveBeenCalled();
	});

	it('should increment when increment button is clicked', () => {
		const newValue = new Number(VALUE) + new Number(STEP_ATTR);
		const boundComponent = TestUtils.renderIntoDocument(
			<NumberInput
				name={NAME_ATTR}
				label={LABEL_TEXT}
				value={VALUE}
				onChange={onChange}
			/>
		);
		inputEl = TestUtils.findRenderedDOMComponentWithTag(boundComponent, 'input');
		const incrementBtn = TestUtils.findRenderedDOMComponentWithClass(boundComponent, INCREMENT_BTN_CLASS);

		expect(parseFloat(inputEl.value)).toBe(VALUE);
		TestUtils.Simulate.click(incrementBtn);
		expect(parseFloat(inputEl.value)).toBe(newValue);
	});

	it('should decrement when decrement button is clicked', () => {
		const newValue = new Number(VALUE) - new Number(STEP_ATTR);
		const boundComponent = TestUtils.renderIntoDocument(
			<NumberInput
				name={NAME_ATTR}
				label={LABEL_TEXT}
				value={VALUE}
				onChange={onChange}
			/>
		);
		inputEl = TestUtils.findRenderedDOMComponentWithTag(boundComponent, 'input');
		const decrementBtn = TestUtils.findRenderedDOMComponentWithClass(boundComponent, DECREMENT_BTN_CLASS);

		expect(parseFloat(inputEl.value)).toBe(VALUE);
		TestUtils.Simulate.click(decrementBtn);
		expect(parseFloat(inputEl.value)).toBe(newValue);
	});

});
