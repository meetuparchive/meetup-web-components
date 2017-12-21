import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Portal from 'react-portal';

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

const getPortalContent = portal =>
	new ReactWrapper(portal.prop('children'));

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
	const portalWrapper = wrapper.find(Portal);

	it('renders into DOM', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should hide dropdown content by default', () => {
		const content = getPortalContent(portalWrapper);

		expect(content.prop('className')).toContain('display--none');
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
		const rightDropdownPortal = rightDropdownWrapper.find(Portal);

		it('renders right-aligned dropdown to DOM', () => {
			expect(rightDropdownWrapper).toMatchSnapshot();
		});

		it('applies correct alignment className to dropdown content', () => {
			const content = getPortalContent(rightDropdownPortal);
			expect(content.prop('className')).toContain('dropdown-content--right');
		});
	});

	describe('open and close', () => {
		let closedComponent, trigger;

		beforeEach(() => {
			closedComponent = mount(dropdownJSX);
			trigger = closedComponent.find('.dropdown-trigger').first();
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
