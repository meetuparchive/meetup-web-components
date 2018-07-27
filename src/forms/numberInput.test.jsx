import React from 'react';
import { mount, shallow } from 'enzyme';
import {
	NumberInput,
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
		PLACEHOLDER = 'Guests',
		MAX_ATTR = 10,
		MIN_ATTR = 1,
		STEP_ATTR = 1;

	let numberInputComponent, inputEl;
	describe('basic', function() {
		beforeEach(() => {
			const formAttrs = {
				id: NAME_ATTR,
				min: MIN_ATTR,
				max: MAX_ATTR,
				required: true,
			};
			numberInputComponent = shallow(
				<NumberInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
					onChange={onChange}
					{...formAttrs}
				/>
			);

			inputEl = numberInputComponent.find(`#${NAME_ATTR}`);
		});

		afterEach(() => {
			numberInputComponent = null;
			inputEl = null;
		});

		it('exists', () => {
			expect(numberInputComponent).toMatchSnapshot();
		});

		it('input should have expected props', () => {
			expect(inputEl.props()).toMatchSnapshot();
		});

		it('should have a label when label is given', () => {
			expect(numberInputComponent.find('.label--field')).toMatchSnapshot();
		});

		it('should have a required attribute when specified', () => {
			expect(inputEl.prop('required')).toBe(true);
		});

		it('should have a max attribute', () => {
			expect(inputEl.prop('max')).toEqual(MAX_ATTR);
		});

		it('should have a min attribute', () => {
			expect(inputEl.prop('min')).toEqual(MIN_ATTR);
		});

		it('should have a step attribute', () => {
			expect(inputEl.prop('step')).toEqual(STEP_ATTR);
		});

		it('should specify attributes that are passed in', function() {
			numberInputComponent = shallow(
				<NumberInput
					id={NAME_ATTR}
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
					onChange={onChange}
					placeholder={PLACEHOLDER}
				/>
			);
			inputEl = numberInputComponent.find(`#${NAME_ATTR}`);
			expect(inputEl).toMatchSnapshot();
		});
	});

	describe('onChange/onFocus', function() {
		beforeEach(() => {
			const formAttrs = {
				id: NAME_ATTR,
				min: MIN_ATTR,
				max: MAX_ATTR,
				required: true,
			};
			numberInputComponent = mount(
				<NumberInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
					onChange={onChange}
					{...formAttrs}
				/>
			);

			inputEl = numberInputComponent.find(`input#${NAME_ATTR}`);
		});

		it(`should add class ${FOCUSED_INPUT_CLASS} when the faux input is focused`, () => {
			expect(numberInputComponent.state('isFieldFocused')).toBe(false);
			expect(
				numberInputComponent
					.find(`.${FAUX_INPUT_CLASS}`)
					.hasClass(FOCUSED_INPUT_CLASS)
			).toBe(false);
			inputEl.simulate('focus');
			expect(numberInputComponent.state('isFieldFocused')).toBe(true);
			expect(
				numberInputComponent
					.find(`.${FAUX_INPUT_CLASS}`)
					.hasClass(FOCUSED_INPUT_CLASS)
			).toBe(true);
		});

		it(`should remove class ${FOCUSED_INPUT_CLASS} when the faux input loses focused`, () => {
			// when field has been focused, it should have focus class
			expect(numberInputComponent.state('isFieldFocused')).toBe(false);
			expect(
				numberInputComponent
					.find(`.${FAUX_INPUT_CLASS}`)
					.hasClass(FOCUSED_INPUT_CLASS)
			).toBe(false);
			inputEl.simulate('focus');
			expect(
				numberInputComponent
					.find(`.${FAUX_INPUT_CLASS}`)
					.hasClass(FOCUSED_INPUT_CLASS)
			).toBe(true);

			// on blur it should be removed
			inputEl.simulate('blur');
			expect(
				numberInputComponent
					.find(`.${FAUX_INPUT_CLASS}`)
					.hasClass(FOCUSED_INPUT_CLASS)
			).toBe(false);
		});

		it('should set its value on input change', function() {
			const newValue = new Number(VALUE) + new Number(STEP_ATTR);
			expect(numberInputComponent.state('value')).toEqual(VALUE);
			inputEl.simulate('change', { target: { value: newValue } });
			numberInputComponent.update();
			expect(numberInputComponent.state('value')).toEqual(newValue);
		});

		it('should not update its value when new value is `e` or `E`', function() {
			expect(inputEl.prop('value')).toEqual(VALUE);
			inputEl.simulate('keyDown', { which: 'e', key: 'e' });
			expect(inputEl.prop('value')).toEqual(VALUE);
			inputEl.simulate('keyDown', { which: 'E', key: 'e' });
			expect(inputEl.prop('value')).toEqual(VALUE);
		});

		it('should call onChange and setState with input change', function() {
			onChange.mockClear();
			const newValue = new Number(VALUE) + new Number(STEP_ATTR);
			inputEl.simulate('change', { target: { value: newValue, name: NAME_ATTR } });
			expect(numberInputComponent.state('value')).toEqual(newValue);
			expect(onChange).toHaveBeenCalledWith(newValue);
		});
	});

	describe('Increment and decrement', function() {
		beforeEach(() => {
			const formAttrs = {
				id: NAME_ATTR,
				min: MIN_ATTR,
				max: MAX_ATTR,
				required: true,
			};
			numberInputComponent = mount(
				<NumberInput
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
					onChange={onChange}
					{...formAttrs}
				/>
			);

			inputEl = numberInputComponent.find(`input#${NAME_ATTR}`);
		});

		it('should return a value > min from _updateValueByStep()', () => {
			expect(numberInputComponent.instance()._updateValueByStep(false)).toEqual(
				MIN_ATTR
			);
		});
		it('should return a value < max from _updateValueByStep()', () => {
			numberInputComponent.setProps({ value: MAX_ATTR });
			expect(numberInputComponent.instance()._updateValueByStep(true)).toEqual(
				MAX_ATTR
			);
		});
		it('should call incrementAction when increment button is clicked', () => {
			const incrementBtn = numberInputComponent.find(
				`[component="button"].${INCREMENT_BTN_CLASS}`
			);
			expect(incrementBtn.prop('onClick')).toBe(
				numberInputComponent.instance().incrementAction
			);
		});

		it('should call decrementAction when increment button is clicked', () => {
			const decrementBtn = numberInputComponent.find(
				`[component="button"].${DECREMENT_BTN_CLASS}`
			);
			expect(decrementBtn.prop('onClick')).toBe(
				numberInputComponent.instance().decrementAction
			);
		});

		it('should increment state.value when incrementAction is called', () => {
			const newValue = new Number(VALUE) + new Number(STEP_ATTR);
			expect(numberInputComponent.state('value')).toEqual(VALUE);
			numberInputComponent.instance().incrementAction({ preventDefault: () => {} });
			expect(numberInputComponent.state('value')).toEqual(newValue);
		});

		it('should decrement state.value when decrementAction is called', () => {
			const newValue = new Number(VALUE) - new Number(STEP_ATTR);

			expect(numberInputComponent.state('value')).toEqual(VALUE);
			numberInputComponent.instance().decrementAction({ preventDefault: () => {} });
			expect(numberInputComponent.state('value')).toEqual(newValue);
		});
	});
});
