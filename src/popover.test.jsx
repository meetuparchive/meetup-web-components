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
const MOCK_HANDLER = jest.genMockFunction();

const popoverComponent = (
	<Popover
		trigger={
			<Button>Open</Button>
		}
		menuItems={[
			<Link to='somepath1/' onClick={MOCK_HANDLER}>First option</Link>,
			<Link to='somepath2/' onClick={MOCK_HANDLER}>Second option</Link>,
			<Link to='somepath3/' onClick={MOCK_HANDLER}>Third option</Link>,
		]}
	/>
);

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

	describe('focusCheck', () => {
		it('should be active if focus is on menu items', () => {
			popover.openMenu();
			popover.focusCheck();
			expect(popover.state.isActive).toBe(true);
		});
		it('should close menu if focus not on items', () => {
			popover.openMenu();
			document.activeElement.blur();
			popover.focusCheck();
			expect(popover.state.isActive).toBe(false);
		});
	});

	it('menu appears on trigger click', () => {
		expect(getIsActive(menuEl)).toBe(false);
		TestUtils.Simulate.click(triggerEl);
		expect(getIsActive(menuEl)).toBe(true);
	});

	describe('onBlur', () => {
		it('should add timeout when `blur`ed', () => {
			spyOn(window, 'setTimeout');
			popover.onBlur();
			expect(window.setTimeout).toHaveBeenCalled();
		});
	});

	describe('onKeyDown', () => {
		it('menu is keyboard navigable with `escape` key', () => {
			const firstOption = optionEls[0];

			popover.openMenu();

			TestUtils.Simulate.keyDown(firstOption, {key: 'Escape'});
			expect(getIsActive(menuEl)).toBe(false);
		});
		it('menu is keyboard navigable with `enter` key', () => {
			TestUtils.Simulate.keyDown(triggerEl, {key: 'Enter'});
			expect(getIsActive(menuEl)).toBe(true);
		});
	});

	describe('onKeyDownMenuItem', () => {
		let firstOption,
			secondOption;

		beforeEach(() => {
			firstOption = optionEls[0];
			secondOption = optionEls[1];
			popover.openMenu();
		});

		it('menu is keyboard navigable with arrows `Down`', () => {
			TestUtils.Simulate.keyDown(firstOption, {key: 'ArrowDown'});
			expect(document.activeElement).toBe(secondOption);
		});
		it('menu is keyboard navigable with arrows `Up`', () => {
			TestUtils.Simulate.keyDown(firstOption, {key: 'ArrowUp'});
			expect(document.activeElement).toBe(firstOption);
		});
		it('menu is keyboard navigable with arrows `Enter`', () => {
			TestUtils.Simulate.keyDown(firstOption, {key: 'Enter'});
			expect(MOCK_HANDLER).toHaveBeenCalled();
		});
	});

	describe('updateFocusBy', () => {
		it('should increase the selectedIndex state for positive delta', () => {
			expect(popover.state.selectedIndex).toBe(0);
			popover.updateFocusBy(1);
			expect(popover.state.selectedIndex).toBe(1);
		});
		it('should not increase the selectedIndex state for zero delta', () => {
			expect(popover.state.selectedIndex).toBe(0);
			popover.updateFocusBy(0);
			expect(popover.state.selectedIndex).toBe(0);
		});
		it('should decrease the selectedIndex state for negative delta', () => {
			popover.updateFocusBy(1);
			expect(popover.state.selectedIndex).toBe(1);
			popover.updateFocusBy(-1);
			expect(popover.state.selectedIndex).toBe(0);
		});
	});

	describe('openMenu', () => {
		it('should set the component state to active', () => {
			expect(popover.state.isActive).toBe(false);
			popover.openMenu();
			expect(popover.state.isActive).toBe(true);
		});
	});

	describe('closeMenu', () => {
		it('should set the component state to inactive', () => {
			popover.openMenu();
			expect(popover.state.isActive).toBe(true);
			popover.closeMenu();
			expect(popover.state.isActive).toBe(false);
		});
	});

});
