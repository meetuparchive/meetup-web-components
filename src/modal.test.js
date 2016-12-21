import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Modal from './Modal';

describe('Modal', () => {

	let modalEl, spyable;
	const content = 'Test model content';

	beforeEach(() => {
		spyable = {
			onDismiss: (e) => {}
		};

		spyOn(spyable, 'onDismiss');

		const modal = TestUtils.renderIntoDocument(
			<Modal onDismiss={spyable.onDismiss}>{content}</Modal>
		);
		modalEl = ReactDOM.findDOMNode(modal);
	});

	afterEach(() => {
		modalEl = null;
	});

	it('exists', () => {
		expect(modalEl).not.toBeNull();
	});

	it('has SQ2 modal styles', () => {
		expect(modalEl.classList).toContain('modal');
	});

	it('has dismiss button', () => {
		expect(modalEl.innerHTML).toContain('button');
	});

	it('displays modal content', () => {
		expect(modalEl.innerHTML).toContain(content);
	});

	it('executes onDismiss when dismiss button is clicked', () => {
		const closeIcon = modalEl.getElementsByTagName('button')[0];

		TestUtils.Simulate.click(closeIcon);

		expect(spyable.onDismiss).toHaveBeenCalled();
	});
});
