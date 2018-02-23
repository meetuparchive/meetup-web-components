import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { hasRoleAttribute, variantTest } from '../utils/testUtils';
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

		it('has a `button` role attribute', () => {
			const buttonEl = ReactDOM.findDOMNode(button);
			hasRoleAttribute(buttonEl, 'button');
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

	describe('buttonTag', () =>{
		const tag = 'a';
		const link = 'https://meetup.com/';
		const buttonTagComponent = shallow(
			<Button buttonTag={tag} link={link}>
				Button label
			</Button>
		);

		it('should render element from buttonTag prop', () => {
			expect(buttonTagComponent.find('a').length).toBe(1);
		});

		it('should render `link` prop', () => {
			expect(buttonTagComponent.find('a').prop('link')).toBe(link);
		});

	});

});
