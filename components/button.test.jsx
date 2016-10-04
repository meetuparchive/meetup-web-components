import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Button from './Button';
import Icon from './Icon';
import { hasRoleAttribute, variantTest } from './foundationTestUtils';

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
			BUTTON_LABEL = 'button--label',
			BUTTON_ICON = 'button--icon';

		let buttonEl;

		beforeEach(() => {
			const button = TestUtils.renderIntoDocument(
				<Button icon={icon} primary>
					{label}
				</Button>
			);

			buttonEl = ReactDOM.findDOMNode(button);
		});

		afterEach(() => {
			buttonEl = null;
		});

		it('creates a first-child icon element', () => {
			const iconEl = buttonEl.firstChild;
			expect(iconEl.classList.contains(BUTTON_ICON)).toBe(true);
		});

		it('creates a label', () => {
			const labelEl = buttonEl.lastChild;
			expect(labelEl.nodeName).toBe('SPAN');
			expect(labelEl.classList.contains(BUTTON_LABEL)).toBe(true);
			expect(labelEl.textContent).toEqual(label);
		});

	});


	describe('Button with icon right', () => {
		const icon = <Icon shape='chevron-right' />,
			label = 'Icon Button',
			BUTTON_LABEL = 'button--label',
			BUTTON_ICON = 'button--icon';

		let buttonEl;

		beforeEach(() => {
			const button = TestUtils.renderIntoDocument(
				<Button icon={icon} primary right>
					{label}
				</Button>
			);

			buttonEl = ReactDOM.findDOMNode(button);
		});

		afterEach(() => {
			buttonEl = null;
		});

		it('creates a second-child icon element', () => {
			const iconEl = buttonEl.lastChild;
			expect(iconEl.classList.contains(BUTTON_ICON)).toBe(true);
		});

		it('creates a label', () => {
			const labelEl = buttonEl.firstChild;
			expect(labelEl.nodeName).toBe('SPAN');
			expect(labelEl.classList.contains(BUTTON_LABEL)).toBe(true);
			expect(labelEl.textContent).toEqual(label);
		});

	});

});

