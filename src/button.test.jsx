import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { findComponentsWithType } from 'meetup-web-mocks/lib/testUtils';
import { hasRoleAttribute, variantTest } from './utils/testUtils';
import Button from './Button';
import Icon from './Icon';

describe('Button', () => {
	const BUTTON_CLASS = 'button';

	describe('is a HTML button element', () => {
		let buttonEl;

		beforeEach(() => {
			const button = TestUtils.renderIntoDocument(<Button />);
			buttonEl = ReactDOM.findDOMNode(button);
		});

		afterEach(() => {
			buttonEl = null;
		});

		it('exists', () => {
			expect(buttonEl).not.toBeNull();
			expect(buttonEl.nodeName).toBe('BUTTON');
		});

		it('has SQ2 button styles', () => {
			expect(buttonEl.classList.contains(BUTTON_CLASS)).toBe(true);
		});

		it('has a `button` role attribute', () => {
			hasRoleAttribute(buttonEl, 'button');
		});
	});

	it('applies variant classes for each variant prop', () => {
		const variants = [
			'primary',
			'contrast',
			'fullWidth',
			'small',
		];

		variantTest(Button, BUTTON_CLASS, variants);
	});

	it('executes onClick when clicked', () => {
		const spyable = {
			onClick: () => {}
		};

		spyOn(spyable, 'onClick');
		const button = TestUtils.renderIntoDocument(<Button onClick={spyable.onClick} />);
		const buttonEl = ReactDOM.findDOMNode(button);

		TestUtils.Simulate.click(buttonEl);
		expect(spyable.onClick).toHaveBeenCalled();
	});

	describe('Button with icon', () => {
		const icon = <Icon shape='chevron-right' />,
			label = 'Icon Button',
			BUTTON_ICON_WRAPPER = 'button--icon-wrapper',
			BUTTON_LABEL = 'button--label',
			BUTTON_ICON = 'button--icon';
		let button;

		beforeEach(() => {
			button = TestUtils.renderIntoDocument(
				<Button icon={icon} primary>
					{label}
				</Button>
			);
		});

		afterEach(() => {
			button = null;
		});

		it('should render wrapper for icons and label', () => {
			const iconItem = TestUtils.findRenderedDOMComponentWithClass(button, BUTTON_ICON_WRAPPER);
			expect(iconItem).not.toBeUndefined();
		});

		it('should render an element with icon class', () => {
			const iconItem = TestUtils.findRenderedDOMComponentWithClass(button, BUTTON_ICON);
			expect(iconItem).not.toBeUndefined();
		});

		it('should render an element with label class', () => {
			const labelItem = TestUtils.findRenderedDOMComponentWithClass(button, BUTTON_LABEL);
			expect(labelItem).not.toBeUndefined();
		});

		describe('right', () => {
			it('should set icon container to reverse', () => {
				const icon = <Icon shape='chevron-right' />;
				const button = TestUtils.renderIntoDocument(
					<Button icon={icon} primary right>
						{label}
					</Button>
				);
				const flex = findComponentsWithType(button, 'Flex');
				expect(flex[0].props.rowReverse).toBe('all');
			});

		});
	});
});

