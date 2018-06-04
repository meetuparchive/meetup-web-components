import React from 'react';
import TestUtils from 'react-dom/test-utils';

import SectionTitle, { SECTIONTITLE_CLASS } from './SectionTitle';

describe('SectionTitle without action', function() {
	let component;

	beforeEach(() => {
		component = TestUtils.renderIntoDocument(
			<SectionTitle title="Title of section" />
		);
	});
	afterEach(() => {
		component = null;
	});

	it(`check that default component has '${SECTIONTITLE_CLASS}' class`, function() {
		const topNode = TestUtils.scryRenderedDOMComponentsWithClass(
			component,
			SECTIONTITLE_CLASS
		);

		expect(topNode.length).toBe(1);
	});

	it('should not render a second flex item if there is no action', function() {
		const flexItems = TestUtils.scryRenderedDOMComponentsWithClass(
			component,
			'flex-item'
		);

		expect(flexItems.length).toBe(1);
	});

	it('renders title element', function() {
		const renderedTitle = TestUtils.scryRenderedDOMComponentsWithClass(
			component,
			'text--sectionTitle'
		);

		expect(renderedTitle.length).toBe(1);
	});
});

describe('SectionTitle with action', function() {
	const title = 'Test title';
	const action = <a>See More</a>;

	let component;

	beforeEach(() => {
		component = TestUtils.renderIntoDocument(
			<SectionTitle title={title} action={action} />
		);
	});
	afterEach(() => {
		component = null;
	});

	it('renders a shrink FlexItem when an action is passed in', function() {
		const flexItems = TestUtils.scryRenderedDOMComponentsWithClass(
			component,
			'flex-item'
		);
		const shrinkFlexItems = TestUtils.scryRenderedDOMComponentsWithClass(
			component,
			'flex-item--shrink'
		);

		expect(flexItems.length).toBe(2);
		expect(shrinkFlexItems.length).toBe(1);
	});

	it('renders action element', function() {
		const renderedAction = TestUtils.findRenderedDOMComponentWithTag(
			component,
			'a'
		);

		expect(renderedAction).not.toBe(null);
	});
});
