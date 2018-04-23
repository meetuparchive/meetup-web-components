import React from 'react';
import { shallow, mount } from 'enzyme';
import Section from '../layout/Section';
import Chunk from '../layout/Chunk';
import Button from '../forms/Button';

import Tooltip from './Tooltip';

const dropdownContent = (
	<Section noSeparator>
		<Chunk>
			<h2 className="text--big text--bold">Dropdown content</h2>
		</Chunk>
	</Section>
);
const dropdownTrigger = <Button small>Open</Button>;

describe('Tooltip', () => {
	let dropdownJSX, wrapper;

	beforeEach(() => {
		dropdownJSX = (
			<Tooltip
				align="right"
				trigger={dropdownTrigger}
				content={dropdownContent}
			/>
		);
		wrapper = shallow(dropdownJSX);
	});

	afterEach(() => {
		dropdownJSX = null;
		wrapper = null;
	});

	it('should hide tooltip content by default', () => {
		expect(wrapper.find('.dropdown-content').length).toBeFalsy();
	});

	it('should call onMouseEnter and onMouseLeave functions if passed as props', () => {
		const onMouseEnter = jest.fn();
		const onMouseLeave = jest.fn();

		const dropdownMouseEvents = shallow(
			<Tooltip
				align="right"
				trigger={dropdownTrigger}
				content={dropdownContent}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			/>
		);
		const trigger = dropdownMouseEvents.find('.dropdown-trigger').first();
		const tooltipArea = dropdownMouseEvents.find('.dropdown').first();

		expect(onMouseEnter).not.toHaveBeenCalled();
		expect(onMouseLeave).not.toHaveBeenCalled();
		trigger.simulate('mouseEnter');
		expect(onMouseEnter).toHaveBeenCalled();
		tooltipArea.simulate('mouseLeave');
		expect(onMouseLeave).toHaveBeenCalled();
	});

	it('should call onFocus and onBlur functions if passed as props', () => {
		const onFocus = jest.fn();
		const onBlur = jest.fn();

		const dropdownFocusEvents = shallow(
			<Tooltip
				align="right"
				trigger={dropdownTrigger}
				content={dropdownContent}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
		);
		const trigger = dropdownFocusEvents.find('.dropdown-trigger').first();
		const tooltipArea = dropdownFocusEvents.find('.dropdown').first();


		expect(onFocus).not.toHaveBeenCalled();
		expect(onBlur).not.toHaveBeenCalled();
		trigger.simulate('focus');
		expect(onFocus).toHaveBeenCalled();
		tooltipArea.simulate('blur');
		setTimeout(() => {
			expect(onBlur).toHaveBeenCalled();
		}, 10);
	});

	describe('right aligned tooltip', () => {
		const rightDropdown = (
			<Tooltip
				align="right"
				trigger={dropdownTrigger}
				content={dropdownContent}
			/>
		);
		const rightDropdownWrapper = mount(rightDropdown);
		const trigger = rightDropdownWrapper.find('.dropdown-trigger');

		it('applies correct alignment className to tooltip content', () => {
			trigger.simulate('focus');
			const content = rightDropdownWrapper.find('.dropdown-content');

			expect(content.prop('className')).toContain('dropdown-content--right');
		});
	});

	describe('right aligned tooltip', () => {
		const aboveDropdown = (
			<Tooltip
				popAbove
				trigger={dropdownTrigger}
				content={dropdownContent}
			/>
		);
		const aboveDropdownWrapper = mount(aboveDropdown);
		const trigger = aboveDropdownWrapper.find('.dropdown-trigger');

		it('applies correct alignment className to tooltip content', () => {
			trigger.simulate('focus');
			const content = aboveDropdownWrapper.find('.dropdown-content');

			expect(content.prop('className')).toContain('dropdown-content--above');
		});
	});

	describe('open and close', () => {
		let closedComponent, trigger, tooltipArea;

		beforeEach(() => {
			closedComponent = shallow(dropdownJSX);
			trigger = closedComponent.find('.dropdown-trigger').first();
			tooltipArea = closedComponent.find('.dropdown').first();
		});
		afterEach(() => {
			closedComponent = null;
			trigger = null;
			tooltipArea = null;
		});

		it('should show tooltip when trigger is hovered', () => {
			expect(closedComponent.state('isActive')).toBeFalsy();
			trigger.simulate('mouseEnter');
			expect(closedComponent.state('isActive')).toBeTruthy();
		});

		it('should hide tooltip when cursor leaves the tooltip area', () => {
			expect(closedComponent.state('isActive')).toBeFalsy();
			trigger.simulate('mouseEnter');
			expect(closedComponent.state('isActive')).toBeTruthy();
			tooltipArea.simulate('mouseLeave');
			setTimeout(() => {
				expect(closedComponent.state('isActive')).toBeFalsy();
			}, 1);
		});

		it('should show tooltip when trigger is focused', () => {
			expect(closedComponent.state('isActive')).toBeFalsy();
			trigger.simulate('focus');
			expect(closedComponent.state('isActive')).toBeTruthy();
		});

		it('should hide tooltip when trigger is blurred', () => {
			expect(closedComponent.state('isActive')).toBeFalsy();
			trigger.simulate('focus');
			expect(closedComponent.state('isActive')).toBeTruthy();
			tooltipArea.simulate('blur');

			setTimeout(() => {
				expect(closedComponent.state('isActive')).toBeFalsy();
			}, 10);
		});
	});

	describe('manually toggled tooltip', () => {
		const manualTooltip = (
			<Tooltip
				manualToggle
				align="right"
				trigger={dropdownTrigger}
				content={dropdownContent}
			/>
		);
		const manualTooltipWrapper = mount(manualTooltip);
		const trigger = manualTooltipWrapper.find('.dropdown-trigger');

		it('does not render content on focus', () => {
			trigger.simulate('focus');
			expect(manualTooltipWrapper.find('.dropdown-content').length).toBe(0);
		});
	});
});
