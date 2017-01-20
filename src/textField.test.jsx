import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import TextFieldContainer from './TextFieldContainer';

describe('TextFieldContainer', function() {

	it('exists', function() {
		const textField = TestUtils.renderIntoDocument(<TextFieldContainer />);
		const textFieldNode = ReactDOM.findDOMNode(textField);

		expect(textFieldNode).not.toBeNull();
	});

});
