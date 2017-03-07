import React from 'react';
import TestUtils from 'react-addons-test-utils';
import DateTimeLocalInput from './DateTimeLocalInput';


describe('DateTimeLocal', function() {

	let dateTimeComponent,
		dateTimeInputEl;

	const value = '1999-12-31T23:59:59',
		newValue = '3000-12-31T23:59:59',
		min = '1999-12-30T00:00:00',
		max = '3001-12-31T23:59:59',
		callbackSpy = jasmine.createSpy('foo');

	beforeEach(() => {
		dateTimeComponent = TestUtils.renderIntoDocument(
			<DateTimeLocalInput
				name='datetime'
				value={value}
				callback={callbackSpy}
				min={min}
				max={max} />);
		dateTimeInputEl = TestUtils.findRenderedDOMComponentWithTag(dateTimeComponent, 'input');
	});

	afterEach(() => {
		dateTimeComponent = null;
		dateTimeInputEl = null;
	});

	it('should exist', function() {
		expect(dateTimeInputEl).not.toBeNull();
	});

	it('should take an initial value', function() {
		expect(dateTimeComponent.state).toEqual({ value });
	});

	it('sets state with its value', function() {
		expect(dateTimeComponent.state).toEqual({ value });
	});


	it('should set a min value', function() {
		expect(dateTimeInputEl.min).toEqual(min);
	});

	it('should set a max value', function() {
		expect(dateTimeInputEl.max).toEqual(max);
	});

	it('should have a required attribute when specified', () => {
		expect(dateTimeInputEl.attributes.required).not.toBeNull();
	});

	it('calls onChange and sets state when value is changed', function() {
		const onChangeSpy = spyOn(DateTimeLocalInput.prototype, 'onChange').and.callThrough();
		const setStateSpy = spyOn(DateTimeLocalInput.prototype, 'setState');
		dateTimeComponent = TestUtils.renderIntoDocument(
			<DateTimeLocalInput name='time' value={value} />);
		dateTimeInputEl = TestUtils.findRenderedDOMComponentWithTag(dateTimeComponent, 'input');

		TestUtils.Simulate.change(dateTimeInputEl, { target: { value: newValue } });
		expect(onChangeSpy).toHaveBeenCalled();
		expect(setStateSpy).toHaveBeenCalledWith({ value: newValue });
	});

	it('calls a callback with value if one is provided', function() {
		TestUtils.Simulate.change(dateTimeInputEl, { target: { value: newValue } });
		expect(callbackSpy).toHaveBeenCalledWith(newValue);
	});

});
