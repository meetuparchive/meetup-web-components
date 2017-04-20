import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SelectInput from './SelectInput';

const testOptions = [
	{ label: 'One', value: '1' },
	{ label: 'Two', value: '2' },
	{ label: 'Three', value: '3' }
];
const nameAttribute = 'testSelect';

describe('SelectInput basic', () => {
	let component;

	beforeEach(() => {
		component = TestUtils.renderIntoDocument(
			<SelectInput
				label='Test select'
				name={nameAttribute}
				options={testOptions}
			/>
		);
	});
	afterEach(() => {
		component = null;
	});

	it('exists', () => {
		expect(() => TestUtils.findRenderedDOMComponentWithTag(component, 'select')).not.toThrow();
	});

	it('should have a NAME attribute', () => {
		const selectEl = TestUtils.findRenderedDOMComponentWithTag(component, 'select');
		expect(selectEl.name).toEqual(nameAttribute);
	});

	it('default value should fall back on first option value', () => {
		expect(component.state.value).toBe(testOptions[0].value);
	});

});

describe('SelectInput advanced', () => {
	it('should set correct value in state on change', () => {
		const newValue = '2';
		const onChange = jest.fn();
		const changeSpy = spyOn(SelectInput.prototype, 'onChange').and.callThrough();

		const component = TestUtils.renderIntoDocument(
			<SelectInput
				label='Test select'
				name={nameAttribute}
				options={testOptions}
				onChange={onChange}
			/>
		);
		const selectEl = TestUtils.findRenderedDOMComponentWithTag(component, 'select');

		expect(changeSpy).not.toHaveBeenCalled();
		TestUtils.Simulate.change(selectEl, { target: { value: newValue } });
		expect(changeSpy).toHaveBeenCalled();

		expect(selectEl.value).toEqual(newValue);
	});

	it('should set correct value specified in props', () => {
		const CUSTOM_VALUE = '2';
		const component = TestUtils.renderIntoDocument(
			<SelectInput
				label='Test select'
				name={nameAttribute}
				options={testOptions}
				value={CUSTOM_VALUE}
			/>
		);
		expect(component.state.value).toBe(CUSTOM_VALUE);
	});

	it('should throw error for invalid default value', () => {
		expect(TestUtils.renderIntoDocument(
			<SelectInput
				label='Test select'
				name={nameAttribute}
				options={testOptions}
				value='this is invalid'
			/>
		)).toThrow();
	});
});
