import React from 'react';
import TestUtils from 'react-dom/test-utils';
import NumberInput, {
	DECREMENT_BTN_CLASS,
	INCREMENT_BTN_CLASS,
	FAUX_INPUT_CLASS,
	FOCUSED_INPUT_CLASS,
} from './NumberInput';

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

	let numberInputComponent, inputEl;

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
				onChange={onChange}
				{...formAttrs}
			/>
		);

		inputEl = TestUtils.findRenderedDOMComponentWithTag(
			numberInputComponent,
			'input'
		);
	});

	afterEach(() => {
		numberInputComponent = null;
		inputEl = null;
	});
	describe('basic', function() {
		it('exists', () => {
			expect(() =>
				TestUtils.findRenderedComponentWithType(
					numberInputComponent,
					NumberInput
				)
			).not.toThrow();
		});

		it('should have a name attribute', () => {
			expect(inputEl.name).toEqual(NAME_ATTR);
		});

		it('should have a value when one is specified', () => {
			expect(parseFloat(inputEl.value)).toEqual(VALUE);
		});

		it('should have a label when label is given', () => {
			expect(() =>
				TestUtils.findRenderedDOMComponentWithTag(numberInputComponent, 'label')
			).not.toThrow();
			const labelEl = TestUtils.findRenderedDOMComponentWithTag(
				numberInputComponent,
				'label'
			);
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
			const numberInputComponent = TestUtils.renderIntoDocument(
				<NumberInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
					onChange={onChange}
					placeholder={PLACEHOLDER}
				/>
			);
			inputEl = TestUtils.findRenderedDOMComponentWithTag(
				numberInputComponent,
				'input'
			);

			expect(inputEl.getAttribute('placeholder')).toEqual(PLACEHOLDER);
		});

		it('should have an error when one is specified', function() {
			expect(() =>
				TestUtils.findRenderedDOMComponentWithClass(
					numberInputComponent,
					'text--error'
				)
			).not.toThrow();
			const errorEl = TestUtils.findRenderedDOMComponentWithClass(
				numberInputComponent,
				'text--error'
			);
			expect(errorEl.textContent).toEqual(ERROR_TEXT);
		});

		it(`should add class ${FOCUSED_INPUT_CLASS} when the faux input is focused`, () => {
			const inputEl = TestUtils.findRenderedDOMComponentWithTag(
				numberInputComponent,
				'input'
			);
			const fauxInputEl = TestUtils.findRenderedDOMComponentWithClass(
				numberInputComponent,
				FAUX_INPUT_CLASS
			);
			expect(fauxInputEl.classList).not.toContain(FOCUSED_INPUT_CLASS);
			TestUtils.Simulate.focus(inputEl);
			expect(fauxInputEl.classList).toContain(FOCUSED_INPUT_CLASS);
		});

		it(`should remove class ${FOCUSED_INPUT_CLASS} when the faux input loses focused`, () => {
			const inputEl = TestUtils.findRenderedDOMComponentWithTag(
				numberInputComponent,
				'input'
			);
			const fauxInputEl = TestUtils.findRenderedDOMComponentWithClass(
				numberInputComponent,
				FAUX_INPUT_CLASS
			);
			TestUtils.Simulate.focus(inputEl);
			expect(fauxInputEl.classList).toContain(FOCUSED_INPUT_CLASS);
			TestUtils.Simulate.blur(inputEl);
			expect(fauxInputEl.classList).not.toContain(FOCUSED_INPUT_CLASS);
		});
	});

	describe('onChange', function() {
		it('should set its value on input change', function() {
			const newValue = new Number(VALUE) + new Number(STEP_ATTR);
			expect(parseFloat(inputEl.value)).toEqual(VALUE);
			TestUtils.Simulate.change(inputEl, { target: { value: newValue } });
			expect(parseFloat(inputEl.value)).toEqual(newValue);
		});

		it('should not update its value when new value is `e` or `E`', function() {
			expect(parseFloat(inputEl.value)).toEqual(VALUE);
			TestUtils.Simulate.keyDown(inputEl, { key: 'e' });
			expect(parseFloat(inputEl.value)).toEqual(VALUE);
			TestUtils.Simulate.keyDown(inputEl, { key: 'E' });
			expect(parseFloat(inputEl.value)).toEqual(VALUE);
		});

		it('should call onChange and setState with input change', function() {
			const newValue = new Number(VALUE) + new Number(STEP_ATTR);
			const changeSpy = spyOn(
				NumberInput.prototype,
				'onChange'
			).and.callThrough();

			numberInputComponent = TestUtils.renderIntoDocument(
				<NumberInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
					onChange={onChange}
				/>
			);

			inputEl = TestUtils.findRenderedDOMComponentWithTag(
				numberInputComponent,
				'input'
			);
			TestUtils.Simulate.change(inputEl, { target: { value: newValue } });

			expect(changeSpy).toHaveBeenCalled();
			expect(numberInputComponent.state.value).toEqual(newValue);
		});

		it('should set correct value in state on change', () => {
			const newValue = '2';
			const onChange = jest.fn();
			const changeSpy = spyOn(
				NumberInput.prototype,
				'onChange'
			).and.callThrough();

			numberInputComponent = TestUtils.renderIntoDocument(
				<NumberInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
					onChange={onChange}
				/>
			);
			inputEl = TestUtils.findRenderedDOMComponentWithTag(
				numberInputComponent,
				'input'
			);

			expect(changeSpy).not.toHaveBeenCalled();
			TestUtils.Simulate.change(inputEl, { target: { value: newValue } });
			expect(changeSpy).toHaveBeenCalled();

			expect(numberInputComponent.state.value).toEqual(newValue);
		});

		it('should call onChange `props` function when input is changed', () => {
			const newValue = new Number(VALUE) + new Number(STEP_ATTR);
			numberInputComponent = TestUtils.renderIntoDocument(
				<NumberInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
					onChange={onChange}
				/>
			);
			inputEl = TestUtils.findRenderedDOMComponentWithTag(
				numberInputComponent,
				'input'
			);
			TestUtils.Simulate.change(inputEl, { target: { value: newValue } });

			expect(onChange).toHaveBeenCalled();
		});
	});

	describe('Increment and decrement', function() {
		it('should return a value > min from _updateValueByStep()', () => {
			const lowValue = new Number(MIN_ATTR);

			numberInputComponent = TestUtils.renderIntoDocument(
				<NumberInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					min={MIN_ATTR}
					max={MAX_ATTR}
					value={MIN_ATTR}
					onChange={onChange}
				/>
			);

			expect(numberInputComponent._updateValueByStep(false)).toEqual(lowValue);
		});
		it('should return a value < max from _updateValueByStep()', () => {
			const highValue = new Number(MAX_ATTR);

			numberInputComponent = TestUtils.renderIntoDocument(
				<NumberInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					min={MIN_ATTR}
					max={MAX_ATTR}
					value={MAX_ATTR}
					onChange={onChange}
				/>
			);

			expect(numberInputComponent._updateValueByStep(true)).toEqual(highValue);
		});
		it('should call incrementAction when increment button is clicked', () => {
			const newValue = new Number(VALUE) + new Number(STEP_ATTR);
			const incrementSpy = spyOn(
				NumberInput.prototype,
				'incrementAction'
			).and.callThrough();

			numberInputComponent = TestUtils.renderIntoDocument(
				<NumberInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
					onChange={onChange}
				/>
			);
			inputEl = TestUtils.findRenderedDOMComponentWithTag(
				numberInputComponent,
				'input'
			);

			const incrementBtn = TestUtils.findRenderedDOMComponentWithClass(
				numberInputComponent,
				INCREMENT_BTN_CLASS
			);

			expect(incrementSpy).not.toHaveBeenCalled();
			TestUtils.Simulate.click(incrementBtn);
			expect(incrementSpy).toHaveBeenCalled();
			expect(numberInputComponent.state.value).toEqual(newValue);
		});

		it('should call decrementAction when increment button is clicked', () => {
			const newValue = new Number(VALUE) - new Number(STEP_ATTR);
			const decrementSpy = spyOn(
				NumberInput.prototype,
				'decrementAction'
			).and.callThrough();

			numberInputComponent = TestUtils.renderIntoDocument(
				<NumberInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
					onChange={onChange}
				/>
			);
			inputEl = TestUtils.findRenderedDOMComponentWithTag(
				numberInputComponent,
				'input'
			);

			const decrementBtn = TestUtils.findRenderedDOMComponentWithClass(
				numberInputComponent,
				DECREMENT_BTN_CLASS
			);

			expect(decrementSpy).not.toHaveBeenCalled();
			TestUtils.Simulate.click(decrementBtn);
			expect(decrementSpy).toHaveBeenCalled();
			expect(numberInputComponent.state.value).toEqual(newValue);
		});

		it('should increment state.value when incrementAction is called', () => {
			const newValue = new Number(VALUE) + new Number(STEP_ATTR);
			numberInputComponent = TestUtils.renderIntoDocument(
				<NumberInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
					onChange={onChange}
				/>
			);

			expect(numberInputComponent.state.value).toEqual(VALUE);
			numberInputComponent.incrementAction({ preventDefault: () => {} });
			expect(numberInputComponent.state.value).toEqual(newValue);
		});

		it('should decrement state.value when decrementAction is called', () => {
			const newValue = new Number(VALUE) - new Number(STEP_ATTR);
			numberInputComponent = TestUtils.renderIntoDocument(
				<NumberInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
					onChange={onChange}
				/>
			);

			expect(numberInputComponent.state.value).toEqual(VALUE);
			numberInputComponent.decrementAction({ preventDefault: () => {} });
			expect(numberInputComponent.state.value).toEqual(newValue);
		});
	});
});
