import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TimeInput from './TimeInput';

describe('TimeInput', function() {

	let timeInputComponent,
		timeInputEl;

	const timeValue = '22:00',
		callbackSpy = jasmine.createSpy('foo');

	beforeEach(() => {
		timeInputComponent = TestUtils.renderIntoDocument(
			<TimeInput name='time' value={timeValue} callback={callbackSpy} />);
		timeInputEl = TestUtils.findRenderedDOMComponentWithTag(timeInputComponent, 'input');
	});

	it('exists', function() {
		expect(timeInputEl).not.toBeNull();
	});

	it('takes a value', function() {
		expect(timeInputEl.value).toEqual(timeValue);
	});

	it('sets state with its value', function() {
		expect(timeInputComponent.state).toEqual({ value: timeValue });
	});

	it('calls a callback with value if one is provided', function() {
		const time = '23:00';
		TestUtils.Simulate.change(timeInputEl, { target: { value: time } });
		expect(callbackSpy).toHaveBeenCalledWith(time);
	});
});


