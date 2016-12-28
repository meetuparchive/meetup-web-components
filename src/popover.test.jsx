import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Popover from './Popover';
import PopoverTrigger from './PopoverTrigger';
import PopoverMenu from './PopoverMenu';
import PopoverMenuItem from './PopoverMenuItem';

const class_hidden = 'display--none',
	popoverComponent = (
	<Popover>
		<PopoverTrigger>Trigger</PopoverTrigger>
		<PopoverMenu>
			<PopoverMenuItem>One</PopoverMenuItem>
			<PopoverMenuItem>Two</PopoverMenuItem>
			<PopoverMenuItem>Three</PopoverMenuItem>
		</PopoverMenu>
	</Popover>
);

describe('Popover defaults', () => {

	let popover,
		trigger,
		menu,
		options;

	beforeEach(() => {
		popover = TestUtils.renderIntoDocument(popoverComponent);
		trigger = TestUtils.findRenderedComponentWithType(popover, PopoverTrigger);
		menu = TestUtils.findRenderedComponentWithType(popover, PopoverMenu);
		options = TestUtils.scryRenderedComponentsWithType(popover, PopoverMenuItem);
	});

	afterEach(() => {
		popover = null;
		trigger = null;
		menu = null;
		options = null;
	});

	it('exists; menu hidden by default', () => {
		const popoverEl = ReactDOM.findDOMNode(popover);
		const menuEl = ReactDOM.findDOMNode(menu);

		expect(popoverEl).not.toBeNull();
		expect(menuEl.classList.contains(class_hidden)).toBe(true);
	});

	it('menu appears on trigger click', () => {
		const triggerEl = ReactDOM.findDOMNode(trigger);
		const menuEl = ReactDOM.findDOMNode(menu);

		TestUtils.Simulate.click(triggerEl);

		expect(menuEl.classList.contains(class_hidden)).toBe(false);
	});

	it('menu is keyboard navigatable with escape key', () => {
		const triggerEl = ReactDOM.findDOMNode(trigger);
		const menuEl = ReactDOM.findDOMNode(menu);
		const firstOption = ReactDOM.findDOMNode(options[0]);

		TestUtils.Simulate.click(triggerEl);
		TestUtils.Simulate.keyDown(firstOption, {key: 'Escape'});

		expect(menuEl.classList.contains(class_hidden)).toBe(true);
	});

	it('menu is keyboard navigatable with arrows', () => {
		const defaultSelected = ReactDOM.findDOMNode(options[0]);
		const targetSelected = ReactDOM.findDOMNode(options[1]);
		const triggerEl = ReactDOM.findDOMNode(trigger);

		TestUtils.Simulate.click(triggerEl);
		TestUtils.Simulate.keyUp(defaultSelected, {key: 'ArrowDown'});

		expect(document.activeElement).toBe(targetSelected);
	});

});
