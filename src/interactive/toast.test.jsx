import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ToastContainer from './ToastContainer';

describe('ToastContainer', function() {

	it('exists', function() {
		const toast = TestUtils.renderIntoDocument(<ToastContainer />);
		const toastNode = ReactDOM.findDOMNode(toast);

		expect(toastNode).not.toBeNull();
	});

});
