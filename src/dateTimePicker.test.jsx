import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import DateTimePickerContainer from './DateTimePickerContainer';

describe('DateTimePickerContainer', function() {

	it('exists', function() {
		const dateTimePicker = TestUtils.renderIntoDocument(<DateTimePickerContainer />);
		const dateTimePickerNode = ReactDOM.findDOMNode(dateTimePicker);

		expect(dateTimePickerNode).not.toBeNull();
	});

});
