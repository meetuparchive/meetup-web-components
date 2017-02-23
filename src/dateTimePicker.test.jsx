import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import DateTimePicker from './DateTimePicker';

describe('DateTimePicker', function() {

	it('exists', function() {
		const dateTimePicker = TestUtils.renderIntoDocument(<DateTimePicker />);
		const dateTimePickerNode = ReactDOM.findDOMNode(dateTimePicker);

		expect(dateTimePickerNode).not.toBeNull();
	});

});
