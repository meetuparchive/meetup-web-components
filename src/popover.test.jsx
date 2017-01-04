import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Popover from './Popover';
import PopoverTrigger from './PopoverTrigger';
import PopoverMenu from './PopoverMenu';
import PopoverMenuItem from './PopoverMenuItem';

let popover,
	popoverEl,
	triggerEl,
	menuEl,
	optionEls;

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
	),
	renderPopoverComponent = () => {
		popover = TestUtils.renderIntoDocument(popoverComponent);
		popoverEl = ReactDOM.findDOMNode(popover);
		triggerEl = ReactDOM.findDOMNode(
			TestUtils.findRenderedComponentWithType(popover, PopoverTrigger)
		);
		menuEl = ReactDOM.findDOMNode(
			TestUtils.findRenderedComponentWithType(popover, PopoverMenu)
		);
		optionEls = TestUtils.scryRenderedComponentsWithType(popover, PopoverMenuItem)
			.map((option) => ReactDOM.findDOMNode(option));
	},
	getIsActive = (menuEl) => {
		return !menuEl.classList.contains(class_hidden);
	};

describe('Popover defaults', () => {

	beforeEach(renderPopoverComponent);

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

	it('menu is keyboard navigatable with arrows', () => {
		const firstOption = optionEls[0];
		const secondOption = optionEls[1];

		TestUtils.Simulate.click(triggerEl);
		expect(getIsActive(menuEl)).toBe(true);
		expect(document.activeElement).toBe(firstOption);

		TestUtils.Simulate.keyUp(firstOption, {key: 'ArrowDown'});
		expect(document.activeElement).toBe(secondOption);

		TestUtils.Simulate.keyUp(firstOption, {key: 'ArrowUp'});
		expect(document.activeElement).toBe(firstOption);
	});

});
