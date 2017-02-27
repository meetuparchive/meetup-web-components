import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import DateTimePicker from './DateTimePicker';

describe('DateTimePicker', function() {

	it('exists', function() {
		const dateTimePicker = TestUtils.renderIntoDocument(<DateTimePicker name='start_time' />);
		const dateTimePickerNode = ReactDOM.findDOMNode(dateTimePicker);

		expect(dateTimePickerNode).not.toBeNull();
	});

	it('sets a default value for date and time', function() {});

	it('allows for date only', function() {});

	it('sets a date range to select from', function() {});

});
