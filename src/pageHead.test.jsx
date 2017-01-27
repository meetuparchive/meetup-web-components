import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import TestUtils from 'react-addons-test-utils';
import { findComponentsWithType } from 'meetup-web-mocks/lib/testUtils';
import PageHead, {
	PAGE_TITLE_CLASS,
	PAGE_ACTIONS_CLASS,
} from './PageHead';
import PageActionButton from './PageActionButton';
import Popover from './Popover';

const menu = [
		<PageActionButton icon='search' label='Search' />,
		<PageActionButton icon='edit' label='Edit' />,
		<Popover
			align='left'
			trigger={
				<PageActionButton icon='overflow' label='More' />
			}
			menuItems={[
				<Link to='somepath/'>First option</Link>,
				<Link to='somepath/'>Second option</Link>,
				<Link to='somepath/'>Third option</Link>,
			]}
		/>
	],
	pageTitle = 'Page title',
	subtitle = 'Sub title';

let pageHead,
	pageHeadEl;

describe('PageHead', function() {
	beforeEach(() => {
		pageHead = TestUtils.renderIntoDocument(
			<PageHead title={pageTitle} />
		);
		pageHeadEl = ReactDOM.findDOMNode(pageHead);
	});

	afterEach(() => {
		pageHead = null;
		pageHeadEl = null;
	});

	it('exists', function() {
		expect(pageHeadEl).not.toBeNull();
	});

	describe('title', () => {
		it('should display a title area', () => {
			expect(pageHeadEl.innerHTML.indexOf(pageTitle)).not.toBe(-1);
		});
		it(`should have a 'Flex' component with a class of ${PAGE_TITLE_CLASS}`, () => {
			const flexItems = findComponentsWithType(pageHead, 'Flex');
			const pageTitle = flexItems.filter(flex => flex.props.className.indexOf(PAGE_TITLE_CLASS) !== -1);
			expect(pageTitle.length).toBe(1);
		});
		it(`should NOT have a 'Flex' component with a class of ${PAGE_ACTIONS_CLASS}`, () => {
			const flexItems = findComponentsWithType(pageHead, 'Flex');
			const pageActions = flexItems.filter(flex => flex.props.className.indexOf(PAGE_ACTIONS_CLASS) !== -1);
			expect(pageActions.length).toBe(0);
		});
		it('should NOT have a \'<p>\' tag', () => {
			const subtitleEl = pageHeadEl.getElementsByTagName('P');
			expect(subtitleEl.length).toBe(0);
		});
	});

	describe('subtitle', () => {
		beforeEach(() => {
			pageHead = TestUtils.renderIntoDocument(
				<PageHead title={pageTitle} subtitle={subtitle} />
			);
			pageHeadEl = ReactDOM.findDOMNode(pageHead);
		});

		it('should display a sub title area', () => {
			expect(pageHeadEl.innerHTML.indexOf(subtitle)).not.toBe(-1);
		});

		it('should have a \'<p>\' tag with a class of \'text--secondary\'', () => {
			const subtitleEl = pageHeadEl.getElementsByTagName('P');
			expect(subtitleEl.length).toBe(1);
			expect(subtitleEl[0].classList).toContain('text--secondary');
		});
	});

	describe('menuItems', () => {
		beforeEach(() => {
			pageHead = TestUtils.renderIntoDocument(
				<PageHead title={pageTitle} menuItems={menu} />
			);
			pageHeadEl = ReactDOM.findDOMNode(pageHead);
		});

		it(`should have a 'Flex' component with a class of ${PAGE_ACTIONS_CLASS}`, () => {
			const flexItems = findComponentsWithType(pageHead, 'Flex');
			const pageActions = flexItems.filter(flex => flex.props.className && flex.props.className.indexOf(PAGE_ACTIONS_CLASS) !== -1);
			expect(pageActions.length).toBe(1);
		});

		it('should render provided components in \'menuItems\' array', () => {
			const flexItems = findComponentsWithType(pageHead, 'Flex');
			const pageActions = flexItems.filter(flex => flex.props.className && flex.props.className.indexOf(PAGE_ACTIONS_CLASS) !== -1)[0];
			const pageActionsEl = ReactDOM.findDOMNode(pageActions);
			menu.forEach(menuItem => {
				const menuItemRender = TestUtils.renderIntoDocument(menuItem);
				const menuItemEl = ReactDOM.findDOMNode(menuItemRender);
				expect(pageActionsEl.innerHTML).toContain(menuItemEl.innerHTML);
			});
		});
	});
});
