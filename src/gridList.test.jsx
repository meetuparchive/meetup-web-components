import React from 'react';
import TestUtils from 'react-addons-test-utils';
import GridList from './GridList';

const JSX_GridListStatic = (
	<GridList
		columns={{
			default: 3
		}}
		items={[
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>
		]}
	/>
);

const responsiveColsDefault = 2,
	responsiveColsMedium = 4,
	responsiveColsLarge = 6;

const JSX_GridListResponsive = (
	<GridList
		columns={{
			default: responsiveColsDefault,
			medium: responsiveColsMedium,
			large: responsiveColsLarge
		}}
		items={[
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>
		]}
	/>
);

let gridList;

describe('Static GridList', function() {
	beforeEach(() => {
		gridList = TestUtils.renderIntoDocument(JSX_GridListStatic);
	});
	afterEach(() => {
		gridList = null;
	});

	it('wraps gridList items with element containing className "gridList-item"', function() {
		const glItems = TestUtils.scryRenderedDOMComponentsWithClass(gridList, 'gridList-item');
		expect(glItems.length).not.toBe(0);
	});
});

describe('Responsive GridList', function() {
	let glClassList;

	beforeEach(() => {
		gridList = TestUtils.renderIntoDocument(JSX_GridListResponsive);
		glClassList = TestUtils.scryRenderedDOMComponentsWithTag(gridList, 'UL')[0].className;
	});
	afterEach(() => {
		gridList = null;
		glClassList = null;
	});

	it('sets correct default columns class', function() {
		const defaultClass = `gridList--has${responsiveColsDefault}`;
		expect(glClassList).toContain(defaultClass);
	});

	it('sets correct medium breakpoint columns class', function() {
		const mediumClass = `atMedium_gridList--has${responsiveColsMedium}`;
		expect(glClassList).toContain(mediumClass);
	});

	it('sets correct large breakpoint columns class', function() {
		const largeClass = `atLarge_gridList--has${responsiveColsLarge}`;
		expect(glClassList).toContain(largeClass);
	});
});
