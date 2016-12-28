import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Popover from './Popover';
import PopoverTrigger from './PopoverTrigger';
import PopoverMenu from './PopoverMenu';
import PopoverMenuItem from './PopoverMenuItem';

describe('Popover', () => {
	const class_menu = 'popover-container',
		class_trigger = 'popover-trigger',
		class_option = 'popover-menu-item',
		class_hidden = 'display--none';

	let popover,
		popoverEl,
		triggerEl,
		menuEl,
		optionEls;

	beforeEach(() => {
		popover = TestUtils.renderIntoDocument(
			<Popover>
				<PopoverTrigger>Trigger</PopoverTrigger>
				<PopoverMenu>
					<PopoverMenuItem>One</PopoverMenuItem>
					<PopoverMenuItem>Two</PopoverMenuItem>
					<PopoverMenuItem>Three</PopoverMenuItem>
				</PopoverMenu>
			</Popover>
		);
		popoverEl = ReactDOM.findDOMNode(popover);
		triggerEl = TestUtils.scryRenderedDOMComponentsWithClass(class_trigger)[0];
		menuEl = TestUtils.scryRenderedDOMComponentsWithClass(class_menu)[0];
		optionEls = TestUtils.scryRenderedDOMComponentsWithClass(class_option);
	});

	afterEach(() => {
		popover = null;
		popoverEl = null;
		triggerEl = null;
		menuEl = null;
		optionEls = null;
	});

	it('exists; menu hidden by default', () => {
		console.warn(popoverEl);
		expect(popoverEl).not.toBeNull();
		expect(menuEl.classList.contains(class_hidden)).toBe(true);
	});

	it('menu appears on trigger click', () => {
		TestUtils.Simulate.click(triggerEl);

		expect(menuEl.classList.contains(class_hidden)).toBe(false);
	});

	it('menu dismissed on popover blur', () => {
		TestUtils.Simulate.click(triggerEl);
		TestUtils.Simulate.blur(popoverEl);

		expect(menuEl.classList.contains(class_hidden)).toBe(true);
	});

	it('menu dismissed on option selection', () => {
		TestUtils.Simulate.click(triggerEl);
		TestUtils.Simulate.click(optionEls[0]);

		expect(menuEl.classList.contains(class_hidden)).toBe(true);
	});

	it('menu is keyboard navigatable with escape key', () => {
		TestUtils.Simulate.click(triggerEl);
		TestUtils.Simulate.keyDown(optionEls[0], {key: 'Escape'});

		expect(menuEl.classList.contains(class_hidden)).toBe(true);
	});

	it('menu is keyboard navigatable with arrows', () => {
		const defaultSelected = optionEls[0];
		const targetSelected = optionEls[1];

		TestUtils.Simulate.click(triggerEl);
		TestUtils.Simulate.keyUp(defaultSelected, {key: 'ArrowDown'});

		expect(document.activeElement).toBe(targetSelected);
	});

});
