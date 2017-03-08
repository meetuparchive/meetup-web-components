import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import TextareaContainer from './TextareaContainer';

describe('TextareaContainer', function() {

	it('exists', function() {
		const textarea = TestUtils.renderIntoDocument(<TextareaContainer />);
		const textareaNode = ReactDOM.findDOMNode(textarea);

		expect(textareaNode).not.toBeNull();
	});

});
