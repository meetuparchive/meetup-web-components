import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import TestUtils from 'react-addons-test-utils';
import PageHead, {
	PAGE_HEAD_CLASS,
	PAGE_TITLE_CLASS,
	PAGE_TITLELABEL_CLASS,
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
	titleLabel = 'Title label',
	titleLabelCustomClass = `${PAGE_TITLELABEL_CLASS}--urgent`,
	subtitle = 'Sub title';

let pageHead;

describe('PageHead', function() {
	beforeEach(() => {
		pageHead = TestUtils.renderIntoDocument(
			<PageHead title={pageTitle} />
		);
	});
	afterEach(() => {
		pageHead = null;
	});
	it('exists', function() {
		expect(() => TestUtils.findRenderedDOMComponentWithClass(pageHead, PAGE_HEAD_CLASS)).not.toThrow();
	});
	describe('title', () => {
		it(`should have a component with a class of ${PAGE_TITLE_CLASS}`, () => {
			const pageTitle = TestUtils.scryRenderedDOMComponentsWithClass(pageHead, PAGE_TITLE_CLASS);
			expect(pageTitle.length).toBe(1);
		});
		it('should display a title area', () => {
			const pageTitleDOM = TestUtils.scryRenderedDOMComponentsWithClass(pageHead, PAGE_TITLE_CLASS)[0];
			expect(pageTitleDOM.textContent).toContain(pageTitle);
		});
		it(`should NOT have a component with a class of ${PAGE_ACTIONS_CLASS}`, () => {
			const pageActions = TestUtils.scryRenderedDOMComponentsWithClass(pageHead, PAGE_ACTIONS_CLASS);
			expect(pageActions.length).toBe(0);
		});
		it(`should NOT have a '${PAGE_SUBTITLE_CLASS}' tag`, () => {
			const pageHeadEl = ReactDOM.findDOMNode(pageHead);
			const subtitleEl = pageHeadEl.getElementsByClassName(PAGE_SUBTITLE_CLASS);
			expect(subtitleEl.length).toBe(0);
		});
		it(`should NOT have a '${PAGE_TITLELABEL_CLASS}' tag`, () => {
			const pageHeadEl = ReactDOM.findDOMNode(pageHead);
			const titleLabelEl = pageHeadEl.getElementsByClassName(PAGE_TITLELABEL_CLASS);
			expect(titleLabelEl.length).toBe(0);
		});
	});
	describe('titleLabel', () => {
		beforeEach(() => {
			pageHead = TestUtils.renderIntoDocument(
				<PageHead title={pageTitle} titleLabel={titleLabel} titleLabelClass={titleLabelCustomClass} />
			);
		});
		it('should display a text label area', () => {
			const pageTitle = TestUtils.scryRenderedDOMComponentsWithClass(pageHead, PAGE_TITLE_CLASS)[0];
			expect(pageTitle.textContent).toContain(titleLabel);
		});
		it(`should have an element with class of '${PAGE_TITLELABEL_CLASS}'`, () => {
			expect(() => TestUtils.findRenderedDOMComponentWithClass(pageHead, PAGE_TITLELABEL_CLASS)).not.toThrow();
		});
		it('should handle custom classes', () => {
			expect(() => TestUtils.findRenderedDOMComponentWithClass(pageHead, titleLabelCustomClass)).not.toThrow();
		});
	});
	describe('subtitle', () => {
		beforeEach(() => {
			pageHead = TestUtils.renderIntoDocument(
				<PageHead title={pageTitle} subtitle={subtitle} />
			);
		});
		it('should display a sub title area', () => {
			const pageTitle = TestUtils.scryRenderedDOMComponentsWithClass(pageHead, PAGE_TITLE_CLASS)[0];
			expect(pageTitle.textContent).toContain(subtitle);
		});
		it(`should have an element with class of '${PAGE_SUBTITLE_CLASS}'`, () => {
			const pageHeadEl = ReactDOM.findDOMNode(pageHead);
			const subtitleEl = pageHeadEl.getElementsByClassName(PAGE_SUBTITLE_CLASS);
			expect(subtitleEl.length).toBe(1);
		});
	});
	describe('menuItems', () => {
		beforeEach(() => {
			pageHead = TestUtils.renderIntoDocument(
				<PageHead title={pageTitle} menuItems={menu} />
			);
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
