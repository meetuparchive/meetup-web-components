import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Modal from './Modal';
import Icon from './Icon';
import Button from './Button';

describe('Modal', () => {

	let modal, modalEl, spyable;
	const content = 'Test model content';

	beforeEach(() => {
		spyable = {
			onDismiss: (e) => {}
		};

		spyOn(spyable, 'onDismiss');

		modal = TestUtils.renderIntoDocument(
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

	it('displays modal content', () => {
		expect(modalEl.innerHTML).toContain(content);
	});

	it('creates a Button component for dismissal', () => {
		const len = TestUtils.scryRenderedComponentsWithType(modal, Button).length;
		expect(len).toBeGreaterThan(0);
	});

	it('creates an Icon component for dismissal', () => {
		const len = TestUtils.scryRenderedComponentsWithType(modal, Icon).length;
		expect(len).toBeGreaterThan(0);
	});

	it('executes onDismiss when dismiss button is clicked', () => {
		const closeButton = modalEl.getElementsByTagName('button')[0];

		TestUtils.Simulate.click(closeButton);

		expect(spyable.onDismiss).toHaveBeenCalled();
	});

	it('executes onDismiss when Escape key is pressed', () => {
		TestUtils.Simulate.keyDown(modalEl, {key: 'Escape', keyCode: 27});

		expect(spyable.onDismiss).toHaveBeenCalled();
	});
});
