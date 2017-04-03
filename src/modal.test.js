import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Button from './Button';
import Modal, {
	MODAL_CLOSE_BUTTON,
	DEFAULT_MARGIN_TOP,
	MARGIN_TOP_OFFSET,
	getModalPosition,
} from './Modal';

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
		const buttons = TestUtils.scryRenderedComponentsWithType(modal, Button);
		expect(buttons.filter(button => button.props.className.includes(MODAL_CLOSE_BUTTON)).length).toBe(1);
	});

	it('creates an svg icon with `svg--cross` for dismissal', () => {
		const closeButton = modalEl.getElementsByClassName(MODAL_CLOSE_BUTTON)[0];
		const icon = closeButton.getElementsByClassName('svg--cross');

		expect(icon.length).toBe(1);
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

describe('Modal positioning', () => {

	it('returns the default margin top if the user is not below the fold', () => {
		const calculatedPosition = getModalPosition(0, 400, false);
		expect(calculatedPosition).toBe(DEFAULT_MARGIN_TOP);
	});

	it('always returns 0px when full screen', () => {
		const calculatedPositionAtTop = getModalPosition(0, 400, true);
		const calculatedPositionBelowFold = getModalPosition(800, 400, true);

		expect(calculatedPositionAtTop).toBe('0px');
		expect(calculatedPositionBelowFold).toBe('0px');
	});

	it('returns scroll position + MARGIN_TOP_OFFSET when modal is not full screen and user is below fold', () => {
		const scrollPosition = 800;
		const calculatedPosition = getModalPosition(scrollPosition, 400, false);
		expect(calculatedPosition).toBe(scrollPosition + MARGIN_TOP_OFFSET);
	});
});
