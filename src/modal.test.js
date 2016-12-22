import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { findComponentsWithType } from 'meetup-web-mocks/lib/testUtils';
import Modal, { MODAL_CLOSE_BUTTON } from './Modal';

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

	it('creates an Icon component for dismissal', () => {
		const closeButton = modalEl.getElementsByClassName(MODAL_CLOSE_BUTTON)[0];
		const icon = closeButton.getElementsByClassName('svg--cross');

		expect(icon.length).toBe(1);
	});

	it('creates a Button component for dismissal', () => {
		const closeButton = findComponentsWithType(modal, 'Button')[0];
		expect(closeButton.props.className).toContain(MODAL_CLOSE_BUTTON);
	});

	it('executes onDismiss when dismiss button is clicked', () => {
		const closeButton = modalEl.getElementsByClassName(MODAL_CLOSE_BUTTON)[0];

		TestUtils.Simulate.click(closeButton);

		expect(spyable.onDismiss).toHaveBeenCalled();
	});

	it('executes onDismiss when Escape key is pressed', () => {
		TestUtils.Simulate.keyDown(modalEl, {key: 'Escape', keyCode: 27});

		expect(spyable.onDismiss).toHaveBeenCalled();
	});
});
