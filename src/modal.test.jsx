import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import ModalContainer from './ModalContainer';


describe('ModalContainer', function() {

	it('exists', function() {
		const modal = TestUtils.renderIntoDocument(<ModalContainer />);
		const modalNode = ReactDOM.findDOMNode(modal);

		expect(modalNode).not.toBeNull();
	});

});
