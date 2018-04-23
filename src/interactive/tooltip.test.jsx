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
	const dropdownJSX = (
		<Tooltip
			align="right"
			trigger={dropdownTrigger}
			content={dropdownContent}
		/>
	);
	const wrapper = shallow(dropdownJSX);

	it('should hide tooltip content by default', () => {
		expect(wrapper.find('.dropdown-content').length).toBeFalsy();
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
			expect(closedComponent.state('isActive')).toBeFalsy();
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
});
