import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Section from '../layout/Section';
import Chunk from '../layout/Chunk';
import Button from '../forms/Button';

import Dropdown from './Dropdown';

const dropdownContent = (
	<Section noSeparator>
		<Chunk>
			<h2 className='text--big text--bold'>Dropdown content</h2>
		</Chunk>
	</Section>
);
const dropdownTrigger = (
	<Button small>Open</Button>
);

const getDropdownFn = (component) => () =>
	TestUtils.findRenderedComponentWithType(component, Dropdown);

const getTrigger = (component) =>
	TestUtils.findRenderedDOMComponentWithClass(
		component,
		'dropdown-trigger'
	);

const getContent = (component) =>
	TestUtils.findRenderedDOMComponentWithClass(
		component,
		'dropdown-content'
	);

describe('Dropdown', () => {
	const component = TestUtils.renderIntoDocument(
		<Dropdown
			align="right"
			trigger={dropdownTrigger}
			content={dropdownContent}
		/>
	);

	it('renders into DOM', () => {
		expect(getDropdownFn(component)).not.toThrow();
	});

	it('should hide dropdown content by default', () => {
		const content = getContent(component);
		expect(content.classList).toContain('display--none');
	});

	it('shold show dropdown when trigger is clicked', () => {
		const content = getContent(component);
		const trigger = getTrigger(component);

		expect(content.classList).toContain('display--none');

		TestUtils.Simulate.click(trigger);
		expect(content.classList).toContain('display--block');
		expect(content.classList).not.toContain('display--none');
	});

	it('should close the dropdown on ESC key', () => {
		const content = getContent(component);
		const trigger = getTrigger(component);

		// content will be open from last test
		expect(content.classList).toContain('display--block');

		TestUtils.Simulate.keyDown(trigger, {key: 'Escape'});
		expect(content.classList).toContain('display--none');
		expect(content.classList).not.toContain('display--block');
	});

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

		it('applies correct alignment className to dropdown content', () => {
			const content = getContent(rightDropdown);
			expect(content.classList).toContain('dropdown-content--right');
		});
	});
});
