import React from 'react';
import TestUtils from 'react-dom/test-utils';
import DateTimeLocalInput from './DateTimeLocalInput';

describe('DateTimeLocal', function() {
	let dateTimeComponent, dateTimeInputEl;

	// use `toISOString()` in order to get correct environment-local date string
	const value = new Date('1999-12-31T23:59:59').toISOString(),
		newValue = new Date('3000-12-31T23:59:59').toISOString(),
		min = new Date('1999-12-30T00:00:00').toISOString(),
		max = new Date('3001-12-31T23:59:59').toISOString(),
		callbackSpy = jasmine.createSpy('foo');
	const expectedValue = value.split('.')[0];

	beforeEach(() => {
		dateTimeComponent = TestUtils.renderIntoDocument(
			<DateTimeLocalInput
				name="datetime"
				value={value}
				onChangeCallback={callbackSpy}
				min={min}
				max={max}
				required
			/>
		);
		dateTimeInputEl = TestUtils.findRenderedDOMComponentWithTag(
			dateTimeComponent,
			'input'
		);
	});

	afterEach(() => {
		dateTimeComponent = null;
		dateTimeInputEl = null;
	});

	it('should exist', function() {
		expect(() =>
			TestUtils.findRenderedDOMComponentWithTag(dateTimeComponent, 'input')
		).not.toThrow();
	});

	it('should take an initial value and set its state', function() {
		expect(dateTimeComponent.state).toEqual({ value: expectedValue });
	});

	it('should set a min value', function() {
		expect(dateTimeInputEl.min).toEqual(min);
	});

	it('should set a max value', function() {
		expect(dateTimeInputEl.max).toEqual(max);
	});

	it('should have a required attribute when specified', () => {
		expect(dateTimeInputEl.attributes.required).not.toBeFalsy();
	});

	it('calls onChange and sets state when value is changed', function() {
		const onChangeSpy = spyOn(
			DateTimeLocalInput.prototype,
			'onChange'
		).and.callThrough();
		const setStateSpy = spyOn(DateTimeLocalInput.prototype, 'setState');
		dateTimeComponent = TestUtils.renderIntoDocument(
			<DateTimeLocalInput name="time" value={value} />
		);
		dateTimeInputEl = TestUtils.findRenderedDOMComponentWithTag(
			dateTimeComponent,
			'input'
		);

		TestUtils.Simulate.change(dateTimeInputEl, { target: { value: newValue } });
		expect(onChangeSpy).toHaveBeenCalled();
		expect(setStateSpy).toHaveBeenCalledWith({ value: newValue });
	});

	it('calls a callback with value if one is provided', function() {
		TestUtils.Simulate.change(dateTimeInputEl, { target: { value: newValue } });
		expect(callbackSpy).toHaveBeenCalledWith(newValue);
	});
});
