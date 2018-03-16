import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import Link from 'react-router-dom/Link';
import { variantTest } from '../utils/testUtils';
import Button, {
	BUTTON_CLASS,
	BUTTON_ICON_WRAPPER_CLASS,
	BUTTON_ICON_CLASS,
	BUTTON_LABEL_CLASS,
} from './Button';
import Flex from '../layout/Flex';
import Icon from '../media/Icon';

describe('Button', () => {
	describe('is a HTML button element', () => {
		let button;

		beforeEach(() => {
			button = TestUtils.renderIntoDocument(<Button />);
		});

		afterEach(() => {
			button = null;
		});

		it('exists', () => {
			expect(() =>
				TestUtils.findRenderedComponentWithType(button, Button)
			).not.toThrow();
		});

		it('has SQ2 button styles', () => {
			const btn = TestUtils.scryRenderedDOMComponentsWithClass(
				button,
				BUTTON_CLASS
			);
			expect(btn.length).toBe(1);
		});

	});

	it('applies variant classes for each variant prop', () => {
		const variants = ['primary', 'fullWidth', 'small', 'bordered'];

		variantTest(Button, BUTTON_CLASS, variants);
	});

	it('executes onClick when clicked', () => {
		const spyable = {
			onClick: jest.fn(),
		};

		spyOn(spyable, 'onClick');
		const button = TestUtils.renderIntoDocument(
			<Button onClick={spyable.onClick} />
		);
		const buttonNode = TestUtils.scryRenderedDOMComponentsWithClass(
			button,
			BUTTON_CLASS
		)[0];

		TestUtils.Simulate.click(buttonNode);
		expect(spyable.onClick).toHaveBeenCalled();
	});

	it('does not execute onClick when disabled', () => {
		const spyable = {
			onClick: jest.fn(),
		};

		spyOn(spyable, 'onClick');
		const button = TestUtils.renderIntoDocument(
			<Button onClick={spyable.onClick} disabled />
		);
		const buttonNode = TestUtils.scryRenderedDOMComponentsWithClass(
			button,
			BUTTON_CLASS
		)[0];

		TestUtils.Simulate.click(buttonNode);
		expect(spyable.onClick).not.toHaveBeenCalled();
	});

	describe('Button with icon', () => {
		const icon = <Icon shape="chevron-right" />,
			label = 'Icon Button';
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
			const iconItem = TestUtils.scryRenderedDOMComponentsWithClass(
				button,
				BUTTON_ICON_WRAPPER_CLASS
			);
			expect(iconItem.length).toBe(1);
		});

		it('should render an element with icon class', () => {
			const iconItem = TestUtils.scryRenderedDOMComponentsWithClass(
				button,
				BUTTON_ICON_CLASS
			);
			expect(iconItem.length).toBe(1);
		});

		it('should render an element with label class', () => {
			const labelItem = TestUtils.scryRenderedDOMComponentsWithClass(
				button,
				BUTTON_LABEL_CLASS
			);
			expect(labelItem.length).toBe(1);
		});

		describe('right', () => {
			it('should set icon container to reverse', () => {
				const icon = <Icon shape="chevron-right" />;
				const button = TestUtils.renderIntoDocument(
					<Button icon={icon} primary right>
						{label}
					</Button>
				);
				const flex = TestUtils.scryRenderedComponentsWithType(button, Flex);
				expect(flex[0].props.rowReverse).toBe('all');
			});
		});
	});

	describe('wrapper component prop', () =>{
		const link = 'https://meetup.com/';
		const buttonTagComponent = shallow(
			<Button component="a" href={link}>
				Button label
			</Button>
		);

		it('should render element from wrapperEl prop', () => {
			expect(buttonTagComponent.find('a').length).toBe(1);
		});

		it('should render the correct `href` value for anchor tag', () => {
			expect(buttonTagComponent.prop('href')).toBe(link);
		});

		it('should render the correct `to` value for <Link> component', () => {
			const buttonTagComponent = shallow(
				<Button to={link} component={Link}>
					Button label
				</Button>
			);

			expect(buttonTagComponent.prop('to')).toBe(link);
		});

	});

});
