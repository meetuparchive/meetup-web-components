import React from 'react';
import TestUtils from 'react-dom/test-utils';
import GridList from './GridList';
import { GRID_AUTOHEIGHT_CLASS } from './GridList';

const glItemCustomClassName = 'flush--all';

const JSX_GridListStatic = (
	<GridList
		columns={{
			default: 3,
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
			<div>GridItem</div>,
		]}
	/>
);

const JSX_GridListCustomClassNames = (
	<GridList
		columns={{
			default: 3,
		}}
		itemClassNames={glItemCustomClassName}
		items={[
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>,
			<div>GridItem</div>,
		]}
	/>
);

const JSX_AutoheightGridListStatic = (
	<GridList
		autoHeight
		columns={{
			default: 3,
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
			<div>GridItem</div>,
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
			large: responsiveColsLarge,
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
			<div>GridItem</div>,
		]}
	/>
);

const JSX_AutoheightGridListResponsive = (
	<GridList
		autoHeight
		columns={{
			default: responsiveColsDefault,
			medium: responsiveColsMedium,
			large: responsiveColsLarge,
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
			<div>GridItem</div>,
		]}
	/>
);

const JSX_AutoheightWithWrapGridListResponsive = (
	<GridList
		autoHeightWithWrap
		columns={{
			default: responsiveColsDefault,
			medium: responsiveColsMedium,
			large: responsiveColsLarge,
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
			<div>GridItem</div>,
		]}
	/>
);

let gridList, gridListCustomClassNames, autoheightGridList;

describe('Static GridList', function() {
	beforeEach(() => {
		gridList = TestUtils.renderIntoDocument(JSX_GridListStatic);
		gridListCustomClassNames = TestUtils.renderIntoDocument(
			JSX_GridListCustomClassNames
		);
		autoheightGridList = TestUtils.renderIntoDocument(
			JSX_AutoheightGridListStatic
		);
	});
	afterEach(() => {
		gridList = null;
		gridListCustomClassNames = null;
		autoheightGridList = null;
	});

	it('wraps gridList items with element containing className "gridList-item"', function() {
		const glItems = TestUtils.scryRenderedDOMComponentsWithClass(
			gridList,
			'gridList-item'
		);
		expect(glItems.length).not.toBe(0);
	});

	it('wraps gridList items with element containing custom className when specified', function() {
		const glItems = TestUtils.scryRenderedDOMComponentsWithClass(
			gridListCustomClassNames,
			glItemCustomClassName
		);
		expect(glItems.length).not.toBe(0);
	});

	it('sets correct autoHeight grid class', function() {
		const glClassList = TestUtils.scryRenderedDOMComponentsWithTag(
			autoheightGridList,
			'UL'
		)[0].className;
		expect(glClassList).toContain(GRID_AUTOHEIGHT_CLASS);
	});

	it('sets correct autoHeight with wrap grid class', function() {
		const autoheightWithWrapGridList = TestUtils.renderIntoDocument(
			JSX_AutoheightWithWrapGridListResponsive
		);
		const glClassList = TestUtils.scryRenderedDOMComponentsWithTag(
			autoheightWithWrapGridList,
			'UL'
		)[0].className;
		expect(glClassList).toContain('flex--wrap');
	});

	it('wraps autoHeight gridList items with element containing className "flex-item"', function() {
		const glItems = TestUtils.scryRenderedDOMComponentsWithClass(
			autoheightGridList,
			'flex-item'
		);
		expect(glItems.length).not.toBe(0);
	});
});

describe('Responsive GridList', function() {
	let glClassList, autoheightGLClassList;

	beforeEach(() => {
		gridList = TestUtils.renderIntoDocument(JSX_GridListResponsive);
		autoheightGridList = TestUtils.renderIntoDocument(
			JSX_AutoheightGridListResponsive
		);
		glClassList = TestUtils.scryRenderedDOMComponentsWithTag(gridList, 'UL')[0]
			.className;
		autoheightGLClassList = TestUtils.scryRenderedDOMComponentsWithTag(
			autoheightGridList,
			'UL'
		)[0].className;
	});
	afterEach(() => {
		gridList = null;
		autoheightGridList = null;
		glClassList = null;
		autoheightGLClassList = null;
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

	it('sets correct autoHeight default columns class', function() {
		const defaultClass = `${GRID_AUTOHEIGHT_CLASS}--has${responsiveColsDefault}`;
		expect(autoheightGLClassList).toContain(defaultClass);
	});

	it('sets correct autoHeight medium breakpoint columns class', function() {
		const mediumClass = `atMedium_${GRID_AUTOHEIGHT_CLASS}--has${responsiveColsMedium}`;
		expect(autoheightGLClassList).toContain(mediumClass);
	});

	it('sets correct autoHeight large breakpoint columns class', function() {
		const largeClass = `atLarge_${GRID_AUTOHEIGHT_CLASS}--has${responsiveColsLarge}`;
		expect(autoheightGLClassList).toContain(largeClass);
	});
});
