import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Link } from 'react-router';
import Popover from './Popover';
import Button from './Button';

let popover,
	popoverEl,
	triggerEl,
	menuEl,
	optionEls;

const class_hidden = 'display--none';

const popoverComponent = (
	<Popover
		trigger={
			<Button>Open</Button>
		}
		menuItems={[
			<Link to='somepath1/'>First option</Link>,
			<Link to='somepath2/'>Second option</Link>,
			<Link to='somepath3/'>Third option</Link>,
		]}
	/>
);

// const renderPopoverComponent = () => {

// };

const getIsActive = (menuEl) => {
	return !menuEl.classList.contains(class_hidden);
};

describe('Popover placeholder', function() {

	beforeEach(() => {
		popover = TestUtils.renderIntoDocument(popoverComponent);
		popoverEl = ReactDOM.findDOMNode(popover);
		triggerEl = ReactDOM.findDOMNode(
			TestUtils.findRenderedDOMComponentWithClass(popover, 'popover-trigger')
		);
		menuEl = ReactDOM.findDOMNode(
			TestUtils.findRenderedDOMComponentWithClass(popover, 'popover-container--menu')
		);
		optionEls = TestUtils.scryRenderedDOMComponentsWithClass(popover, 'popover-menu-option-target')
			.map((option) => ReactDOM.findDOMNode(option));
	});

	afterEach(() => {
		popover = null;
		popoverEl = null;
		triggerEl = null;
		menuEl = null;
		optionEls = null;
	});

	it('exists; menu hidden by default', () => {
		expect(popoverEl).not.toBeNull();
		expect(getIsActive(menuEl)).toBe(false);
	});

	it('menu appears on trigger click', () => {
		expect(getIsActive(menuEl)).toBe(false);
		TestUtils.Simulate.click(triggerEl);
		expect(getIsActive(menuEl)).toBe(true);
	});

	it('menu is keyboard navigatable with escape key', () => {
		const firstOption = optionEls[0];

		TestUtils.Simulate.click(triggerEl);
		expect(getIsActive(menuEl)).toBe(true);

		TestUtils.Simulate.keyDown(firstOption, {key: 'Escape'});
		expect(getIsActive(menuEl)).toBe(false);
	});

	it('trigger should be active element when `click`ed', () => {
		const firstOption = optionEls[0];

		TestUtils.Simulate.click(triggerEl);
		expect(getIsActive(menuEl)).toBe(true);
		expect(document.activeElement).toBe(firstOption);
	});
	it('menu is keyboard navigatable with arrows', () => {
		const firstOption = optionEls[0];
		const secondOption = optionEls[1];

		popover.openMenu();

		TestUtils.Simulate.keyUp(firstOption, {key: 'ArrowDown'});
		console.log('secondOption', secondOption);
		// expect(document.activeElement).toBe(secondOption);

		// TestUtils.Simulate.keyUp(firstOption, {key: 'ArrowUp'});
		// expect(document.activeElement).toBe(firstOption);
	});
});
