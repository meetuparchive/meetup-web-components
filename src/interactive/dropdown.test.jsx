import React from 'react';
import { mount } from 'enzyme';
import Downshift from 'downshift';
import Section from '../layout/Section';
import Chunk from '../layout/Chunk';
import Button from '../forms/Button';

import Dropdown, { DROPDOWN_MENU_ITEM_CLASS } from './Dropdown';

const dropdownContent = (
	<Section noSeparator>
		<Chunk>
			<h2 className="text--big text--bold">Dropdown content</h2>
		</Chunk>
	</Section>
);
const dropdownTrigger = <Button small>Open</Button>;
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
				align="center"
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
	const wrapper = mount(dropdownJSX);

	it('should hide dropdown content by default', () => {
		expect(wrapper.find('.popup-content').length).toBeFalsy();
	});

	describe('right aligned dropdown', () => {
		const rightDropdown = (
			<Dropdown
				align="right"
				trigger={dropdownTrigger}
				content={dropdownContent}
			/>
		);
		const rightDropdownWrapper = mount(rightDropdown);
		const trigger = rightDropdownWrapper.find('.popup-trigger');

		it('applies correct alignment className to dropdown content', () => {
			trigger.simulate('click');
			const content = rightDropdownWrapper.find('.popup-content');

			expect(content.prop('className')).toContain('popup-content--right');
		});
	});

	describe('open and close', () => {
		let closedComponent, trigger;

		beforeEach(() => {
			closedComponent = mount(dropdownJSX);
			trigger = closedComponent.find('.popup-trigger').first();
		});
		afterEach(() => {
			closedComponent = null;
			trigger = null;
		});

		it('shold show dropdown when trigger is clicked', () => {
			expect(closedComponent.state('isActive')).toBeFalsy();
			trigger.simulate('click');
			expect(closedComponent.state('isActive')).toBeTruthy();
		});

		it('should close the dropdown on ESC key', () => {
			// open it first
			// dropdowns do not support default open by design
			trigger.simulate('click');
			expect(closedComponent.state('isActive')).toBeTruthy();

			closedComponent.instance().onBodyKeyDown({ key: 'Escape' });
			expect(closedComponent.state('isActive')).toBeFalsy();
		});

		it('should close when clicking outside of the dropdown content', () => {
			// open it first
			// dropdowns do not support default open by design
			trigger.simulate('click');
			expect(closedComponent.state('isActive')).toBeTruthy();

			closedComponent.instance().onBodyClick({ target: '<div />' });
			expect(closedComponent.state('isActive')).toBeFalsy();
		});
	});

	describe('dropdown with menuItems', () => {
		const menuItemDropdown = (
			<Dropdown
				align="center"
				trigger={dropdownTrigger}
				menuItems={[<div>one</div>, <div>two</div>, <div>three</div>]}
			/>
		);
		const menuItemDropdownWrapper = mount(menuItemDropdown);
		const trigger = menuItemDropdownWrapper.find('.popup-trigger');

		it('renders the menuItems', () => {
			trigger.simulate('click');
			const menuItemsProp = menuItemDropdownWrapper.find(Downshift).prop('menuItems');
			const menuItemsRendered = menuItemDropdownWrapper.find(`.${DROPDOWN_MENU_ITEM_CLASS}`);

			expect(menuItemsRendered.length).toBe(menuItemsProp.length);
		});
	});

	describe('manually toggle dropdown', () => {
		let closedComponent, trigger;

		beforeEach(() => {
			closedComponent = mount(<DropdownWithToggle />);
			trigger = closedComponent.find('.popup-trigger');
		});

		afterEach(() => {
			closedComponent = null;
			trigger = null;
		});

		it('should still open and close when clicking the trigger', () => {
			expect(closedComponent.find('.popup-content').length).toBeFalsy();
			trigger.simulate('click');
			expect(closedComponent.find('.popup-content').length).toBeTruthy();

			trigger.simulate('click');
			expect(closedComponent.find('.popup-content').length).toBeFalsy();
		});
	});
});
