import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { findComponentsWithType } from 'meetup-web-mocks/lib/testUtils';
import Icon from './Icon';
import PageActionButton, {
	PAGE_ACTION_BUTTON_CLASS
} from './PageActionButton';

const label = 'hello world';
const shape = (<Icon shape='search' className='text--secondary' />);
const spyable = {
	onClick: () => {}
};

let pageActionButton,
	pageActionButtonEl;

describe('PageActionButton', function() {
	beforeEach(() => {
		pageActionButton = TestUtils.renderIntoDocument(
			<PageActionButton
				icon={shape}
				label={label}
				onClick={spyable.onClick}
			/>
		);
		pageActionButtonEl = ReactDOM.findDOMNode(pageActionButton);
	});

	afterEach(() => {
		pageActionButton = null;
		pageActionButtonEl = null;
	});

	it('exists', function() {
		expect(pageActionButtonEl).not.toBeNull();
	});

	it(`should render a 'button' as the root element with '${PAGE_ACTION_BUTTON_CLASS}'`, () => {
		expect(pageActionButtonEl.nodeName).toBe('BUTTON');
		expect(pageActionButtonEl.classList).toContain(PAGE_ACTION_BUTTON_CLASS);
	});

	it('should render a `Button` component with `onClick` prop', () => {
		const button = findComponentsWithType(pageActionButton, 'Button');
		expect(button.length).toBe(1);
		expect(button[0].props.onClick).toBe(spyable.onClick);
	});

	it('should render a `Icon` component', () => {
		const icon = findComponentsWithType(pageActionButton, 'Icon');
		expect(icon.length).toBe(1);
		expect(icon[0].props.shape).toBe(shape);
	});

	it('should render label for button', () => {
		expect(pageActionButtonEl.innerHTML).toContain(label);
	});

	it('should render a `Flex` container for icon and label', () => {
		const flex = findComponentsWithType(pageActionButton, 'Flex');
		expect(flex.length).toBe(1);
	});

	it('should render `FlexItem`s for icon and label', () => {
		const flexItems = findComponentsWithType(pageActionButton, 'FlexItem');
		expect(flexItems.length).toBe(2);
	});

	it('should NOT set `Flex` override defaults for props `direction`, `justify` and `switchDirection`', () => {
		const flex = findComponentsWithType(pageActionButton, 'Flex')[0];
		expect(flex.props.direction).toBe('row');
		expect(flex.props.justify).toBeUndefined();
		expect(flex.props.switchDirection).toBeUndefined();
	});

	describe('stackedIcon', () => {
		let flex;
		beforeEach(() => {
			pageActionButton = TestUtils.renderIntoDocument(
				<PageActionButton
					icon={shape}
					label={label}
					onClick={spyable.onClick}
					stackedIcon
				/>
			);
			pageActionButtonEl = ReactDOM.findDOMNode(pageActionButton);
			flex = findComponentsWithType(pageActionButton, 'Flex')[0];
		});

		afterEach(() => {
			pageActionButton = null;
			pageActionButtonEl = null;
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


	describe('stackedIcon', () => {
		let flex;
		beforeEach(() => {
			pageActionButton = TestUtils.renderIntoDocument(
				<PageActionButton
					icon={shape}
					label={label}
					onClick={spyable.onClick}
					stackedIcon
					short
				/>
			);
			pageActionButtonEl = ReactDOM.findDOMNode(pageActionButton);
			flex = findComponentsWithType(pageActionButton, 'Flex')[0];
		});

		afterEach(() => {
			pageActionButton = null;
			pageActionButtonEl = null;
			flex = null;
		});

		it('should set `switchDirection` to `all`', () => {
			expect(flex.props.switchDirection).toBe('all');
		});
	});
});
