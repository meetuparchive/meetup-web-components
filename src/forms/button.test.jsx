import React from 'react';
import { shallow } from 'enzyme';
import Link from 'react-router-dom/Link';
import { variantTest } from '../utils/testUtils';
import Button, {
	BUTTON_CLASS,
	BUTTON_ICON_WRAPPER_CLASS,
	BUTTON_ICON_CLASS,
	BUTTON_LABEL_CLASS,
} from './Button';
import Icon from '../media/Icon';

describe('Button', () => {
	describe('is a HTML button element', () => {
		it('exists', () => {
			const button = shallow(<Button />);
			expect(button).toMatchSnapshot();
		});
	});

	it('applies variant classes for each variant prop', () => {
		const variants = ['primary', 'fullWidth', 'small', 'bordered'];

		variantTest(Button, BUTTON_CLASS, variants);
	});

	it('executes onClick when clicked', () => {
		const onClick = jest.fn();
		const button = shallow(<Button onClick={onClick} />);

		button.simulate('click');
		expect(onClick).toHaveBeenCalled();
	});

	it('does not execute onClick when disabled', () => {
		const onClick = jest.fn();
		const button = shallow(<Button onClick={onClick} disabled />);

		button.simulate('click');
		expect(onClick).not.toHaveBeenCalled();
	});

	describe('Button with icon', () => {
		const icon = <Icon shape="chevron-right" />,
			label = 'Icon Button';
		let button;

		beforeEach(() => {
			button = shallow(
				<Button icon={icon} primary>
					{label}
				</Button>
			);
		});

		afterEach(() => {
			button = null;
		});

		it('should render wrapper for icons and label', () => {
			expect(button.find(`.${BUTTON_ICON_WRAPPER_CLASS}`).exists()).toBe(true);
		});

		it('should render an element with icon class', () => {
			expect(button.find(`.${BUTTON_ICON_CLASS}`).exists()).toBe(true);
		});

		it('should render an element with label class', () => {
			expect(button.find(`.${BUTTON_LABEL_CLASS}`).exists()).toBe(true);
		});

		describe('right', () => {
			it('should set icon container to reverse', () => {
				const icon = <Icon shape="chevron-right" />;
				const button = shallow(
					<Button icon={icon} primary right>
						{label}
					</Button>
				);
				expect(
					button.find(`.${BUTTON_ICON_WRAPPER_CLASS}`).prop('rowReverse')
				).toBe('all');
			});
		});
	});

	describe('wrapper component prop', () => {
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
