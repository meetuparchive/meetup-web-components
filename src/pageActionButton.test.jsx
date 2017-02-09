import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { findComponentsWithType } from 'meetup-web-mocks/lib/testUtils';
import Button from './Button';
import Flex from './Flex';
import Icon from './Icon';
import PageActionButton, { PAGE_ACTION_BUTTON_CLASS } from './PageActionButton';

const label = 'hello world';
const shape = (<Icon shape='search' className='text--secondary' />);
const spyable = {
	onClick: jest.fn()
};

describe('PageActionButton', function() {
	let pageActionButton;
	beforeAll(() => {
		pageActionButton = TestUtils.renderIntoDocument(
			<PageActionButton
				icon={shape}
				label={label}
				onClick={spyable.onClick}
			/>
		);
	});
	afterAll(() => {
		pageActionButton = null;
	});
	it('exists', function() {
		expect(() => TestUtils.findRenderedDOMComponentWithClass(pageActionButton, PAGE_ACTION_BUTTON_CLASS)).not.toThrow();
	});
	it(`should render a 'button' '${PAGE_ACTION_BUTTON_CLASS}'`, () => {
		expect(TestUtils.scryRenderedDOMComponentsWithClass(pageActionButton, PAGE_ACTION_BUTTON_CLASS).length).toBe(1);
	});
	it('should call handler on \'button\' when clicked', () => {
		const button = TestUtils.scryRenderedDOMComponentsWithClass(pageActionButton, PAGE_ACTION_BUTTON_CLASS)[0];
		TestUtils.Simulate.click(button);
		expect(spyable.onClick).toHaveBeenCalled();
	});
	it('should render a provided icon element in component', () => {
		const icons = TestUtils.scryRenderedComponentsWithType(pageActionButton, Icon);
		expect(icons.length).toBe(1);
		expect(icons[0].props.shape).toBe(shape.props.shape);
	});
	it('should render label for button', () => {
		const pageButtonNode = TestUtils.scryRenderedDOMComponentsWithClass(pageActionButton, PAGE_ACTION_BUTTON_CLASS)[0];
		expect(pageButtonNode.textContent).toBe(label);
	});
	it('should NOT set `Flex` props when is default version', () => {
		const flex = findComponentsWithType(pageActionButton, 'Flex')[0];
		expect(flex.props.direction).toBe('row');
		expect(flex.props.justify).toBeUndefined();
		expect(flex.props.switchDirection).toBeUndefined();
	});
	describe('option: stacked icon', () => {
		let flex;
		beforeAll(() => {
			pageActionButton = TestUtils.renderIntoDocument(
				<PageActionButton
					icon={shape}
					label={label}
					onClick={spyable.onClick}
					stackVertical
				/>
			);
			flex = TestUtils.scryRenderedComponentsWithType(pageActionButton, Flex)[0];
		});
		afterAll(() => {
			pageActionButton = null;
			flex = null;
		});
		it('should set `direction` to `column`', () => {
			expect(flex.props.direction).toBe('column');
		});
		it('should set `justify` to `center`', () => {
			expect(flex.props.justify).toBe('center');
		});
		it('should NOT set `switchDirection`', () => {
			expect(flex.props.switchDirection).toBe('');
		});
	});
	describe('option: stacked icon until medium, becomes horizontal', () => {
		let flex;
		beforeAll(() => {
			pageActionButton = TestUtils.renderIntoDocument(
				<PageActionButton
					icon={shape}
					label={label}
					onClick={spyable.onClick}
					stackVerticalAtMedium
				/>
			);
			flex = TestUtils.scryRenderedComponentsWithType(pageActionButton, Flex)[0];
		});
		afterAll(() => {
			pageActionButton = null;
			flex = null;
		});
		it('should set `direction` to `column`', () => {
			expect(flex.props.direction).toBe('column');
		});
		it('should set `justify` to `center`', () => {
			expect(flex.props.justify).toBe('center');
		});
		it('should set `switchDirection` to `medium`', () => {
			expect(flex.props.switchDirection).toBe('medium');
		});
	});
});
