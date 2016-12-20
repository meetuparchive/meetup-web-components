import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Modal from './Modal';

describe('Modal', () => {

	let modalEl;

	beforeEach(() => {
		const modal = TestUtils.renderIntoDocument(
			<Modal>'Test'</Modal>
		);

		modalEl = ReactDOM.findDOMNode(modal);
	});

	afterEach(() => {
		modalEl = null;
	});

	it('exists', () => {
		expect(modalEl).not.toBeNull();
	});
});
