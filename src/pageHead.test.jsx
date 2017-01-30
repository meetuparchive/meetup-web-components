import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import TestUtils from 'react-addons-test-utils';
import { findComponentsWithType } from 'meetup-web-mocks/lib/testUtils';
import PageHead, {
	PAGE_TITLE_CLASS,
	PAGE_SUBTITLE_CLASS,
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
		it(`should have a component with a class of ${PAGE_TITLE_CLASS}`, () => {
			const pageTitle = TestUtils.scryRenderedDOMComponentsWithClass(pageHead, PAGE_TITLE_CLASS);
			expect(pageTitle.length).toBe(1);
		});
		it(`should NOT have a component with a class of ${PAGE_ACTIONS_CLASS}`, () => {
			const pageActions = TestUtils.scryRenderedDOMComponentsWithClass(pageHead, PAGE_ACTIONS_CLASS);
			expect(pageActions.length).toBe(0);
		});
		it(`should NOT have a \'${PAGE_SUBTITLE_CLASS}\' tag`, () => {
			const subtitleEl = pageHeadEl.getElementsByClassName(PAGE_SUBTITLE_CLASS);
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

		it(`should have an element with class of \'${PAGE_SUBTITLE_CLASS}\'`, () => {
			const subtitleEl = pageHeadEl.getElementsByClassName(PAGE_SUBTITLE_CLASS);
			expect(subtitleEl.length).toBe(1);
		});
	});

	describe('menuItems', () => {
		beforeEach(() => {
			pageHead = TestUtils.renderIntoDocument(
				<PageHead title={pageTitle} menuItems={menu} />
			);
			pageHeadEl = ReactDOM.findDOMNode(pageHead);
		});

		it(`should have a component with a class of ${PAGE_ACTIONS_CLASS}`, () => {
			const pageActions = TestUtils.scryRenderedDOMComponentsWithClass(pageHead, PAGE_ACTIONS_CLASS);
			expect(pageActions.length).toBe(1);
		});

		it('should render provided components in \'menuItems\' array', () => {
			const pageActions = TestUtils.scryRenderedDOMComponentsWithClass(pageHead, PAGE_ACTIONS_CLASS)[0];
			const pageActionsEl = ReactDOM.findDOMNode(pageActions);
			menu.forEach(menuItem => {
				const menuItemRender = TestUtils.renderIntoDocument(menuItem);
				const menuItemEl = ReactDOM.findDOMNode(menuItemRender);
				expect(pageActionsEl.innerHTML).toContain(menuItemEl.innerHTML);
			});
		});
	});
});
