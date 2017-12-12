import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { mount } from 'enzyme';
import Section from '../layout/Section';
import Chunk from '../layout/Chunk';
import Button from '../forms/Button';

import Dropdown from './Dropdown';

const dropdownContent = (
	<Section noSeparator>
		<Chunk>
			<h2 className="text--big text--bold">Dropdown content</h2>
		</Chunk>
	</Section>
);
const dropdownTrigger = <Button small>Open</Button>;

const getDropdownFn = component => () =>
	TestUtils.findRenderedComponentWithType(component, Dropdown);

// const getTrigger = component =>
// 	TestUtils.findRenderedDOMComponentWithClass(component, 'dropdown-trigger');

// const getContent = component =>
// 	TestUtils.findRenderedDOMComponentWithClass(component, 'dropdown-content');

// const getIsOpen = content =>
// 	content.classList.contains('display--block') &&
// 	!content.classList.contains('display--none');

/**
 * @module DropdownWithToggle
 */
class DropdownWithToggle extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			dropdownToggled: false
		};

		this.toggleDropdown = this.toggleDropdown.bind(this);
	}

	toggleDropdown() {
		this.setState(() => ({ dropdownToggled: !this.state.dropdownToggled }));
	}

	render() {

		return (
			<Dropdown
				isActive={this.state.dropdownToggled}
				manualToggle={this.toggleDropdown}
				trigger={dropdownTrigger}
				content={dropdownContent}
			/>
		);

	}
}

describe('Dropdown', () => {
	const dropdownJSX = (
		<Dropdown
			align="right"
			trigger={dropdownTrigger}
			content={dropdownContent}
		/>
	);
	const component = TestUtils.renderIntoDocument(dropdownJSX);

	it('renders into DOM', () => {
		expect(getDropdownFn(component)).not.toThrow();
	});

	// it('should hide dropdown content by default', () => {
	// 	const content = getContent(component);
	// 	expect(content.classList).toContain('display--none');
	// });

	describe('right aligned dropdown', () => {
		const rightDropdown = TestUtils.renderIntoDocument(
			<Dropdown
				align="right"
				trigger={dropdownTrigger}
				content={dropdownContent}
			/>
		);

		it('renders left-aligned dropdown to DOM', () => {
			expect(getDropdownFn(rightDropdown)).not.toThrow();
		});

		// it('applies correct alignment className to dropdown content', () => {
		// 	const content = getContent(rightDropdown);
		// 	expect(content.classList).toContain('dropdown-content--right');
		// });
	});

	// describe('open and close', () => {
	// 	let closedComponent, content, trigger;

	// 	beforeEach(() => {
	// 		closedComponent = TestUtils.renderIntoDocument(dropdownJSX);
	// 		content = getContent(closedComponent);
	// 		trigger = getTrigger(closedComponent);
	// 	});
	// 	afterEach(() => {
	// 		closedComponent = null;
	// 		content = null;
	// 		trigger = null;
	// 	});

	// 	it('shold show dropdown when trigger is clicked', () => {
	// 		expect(getIsOpen(content)).toBeFalsy();
	// 		TestUtils.Simulate.click(trigger);
	// 		expect(getIsOpen(content)).toBeTruthy();
	// 	});

	// 	it('should close the dropdown on ESC key', () => {
	// 		// open it first
	// 		// dropdowns do not support default open by design
	// 		TestUtils.Simulate.click(trigger);
	// 		expect(getIsOpen(content)).toBeTruthy();

	// 		closedComponent.onBodyKeyDown({ key: 'Escape' });
	// 		expect(getIsOpen(content)).toBeFalsy();
	// 	});

	// 	it('should close when clicking outside of the dropdown content', () => {
	// 		// open it first
	// 		// dropdowns do not support default open by design
	// 		TestUtils.Simulate.click(trigger);
	// 		expect(getIsOpen(content)).toBeTruthy();

	// 		closedComponent.onBodyClick({ target: '<div />' });
	// 		expect(getIsOpen(content)).toBeFalsy();
	// 	});
	// });

	describe('manually toggle dropdown', () => {
		let closedComponent, closeContentSpy, toggleContentSpy, trigger;

		beforeEach(() => {
			closedComponent = mount(<DropdownWithToggle />);
			closeContentSpy = jest.spyOn(Dropdown.prototype, 'closeContent');
			toggleContentSpy = jest.spyOn(Dropdown.prototype, 'toggleContent');
			trigger = closedComponent.find('.dropdown-trigger');
		});

		afterEach(() => {
			closedComponent = null;
			trigger = null;
			closeContentSpy.mockClear();
			toggleContentSpy.mockClear();
		});

		it('should still open and close when clicking the trigger', () => {
			expect(closeContentSpy).not.toHaveBeenCalled();
			trigger.simulate('click');

			closedComponent.find(Dropdown).instance().onBodyClick({ target: '<div />' });
			expect(closeContentSpy).toHaveBeenCalled();
			expect(toggleContentSpy).not.toHaveBeenCalled();
		});
	});
});
