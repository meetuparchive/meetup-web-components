import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TimeInput from './TimeInput';

describe('TimeInput', function() {

	let timeInputComponent,
		timeInputEl;

	const timeValue = '22:00',
		newTime = '23:00',
		callbackSpy = jest.fn();

	beforeEach(() => {
		timeInputComponent = TestUtils.renderIntoDocument(
			<TimeInput name='time' value={timeValue} callback={callbackSpy} required />);
		timeInputEl = TestUtils.findRenderedDOMComponentWithTag(timeInputComponent, 'input');
	});

	afterEach(() => {
		timeInputComponent = null;
		timeInputEl = null;
	});

	it('exists', function() {
		expect(timeInputEl).not.toBeNull();
	});

	it('takes a value in HH:mm format', function() {
		expect(timeInputEl.value).toEqual(timeValue);
	});

	it('sets state with its value', function() {
		expect(timeInputComponent.state).toEqual({ value: timeValue });
	});

	it('should have a required attribute when specified', () => {
		expect(timeInputEl.attributes.required).not.toBeNull();
	});

	it('calls onChange and sets state when value is changed', function() {
		const onChangeSpy = spyOn(TimeInput.prototype, 'onChange').and.callThrough();
		const setStateSpy = spyOn(TimeInput.prototype, 'setState');
		timeInputComponent = TestUtils.renderIntoDocument(
			<TimeInput name='time' value={timeValue} callback={callbackSpy} />);
		timeInputEl = TestUtils.findRenderedDOMComponentWithTag(timeInputComponent, 'input');

		TestUtils.Simulate.change(timeInputEl, { target: { value: newTime } });
		expect(onChangeSpy).toHaveBeenCalled();
		expect(setStateSpy).toHaveBeenCalledWith({ value: newTime });
	});

	it('calls a callback with value if one is provided', function() {
		TestUtils.Simulate.change(timeInputEl, { target: { value: newTime } });
		expect(callbackSpy).toHaveBeenCalledWith(newTime);
	});
});


