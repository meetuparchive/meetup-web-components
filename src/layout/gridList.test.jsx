import React from 'react';
import { shallow } from 'enzyme';
import { GridListComponent, GRID_AUTOHEIGHT_CLASS } from './GridList';

const glItemCustomClassName = 'flush--all';

const JSX_GridListStatic = (
	<GridListComponent
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
	<GridListComponent
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
	<GridListComponent
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
	<GridListComponent
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
	<GridListComponent
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
	<GridListComponent
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
		gridList = shallow(JSX_GridListStatic);
		gridListCustomClassNames = shallow(JSX_GridListCustomClassNames);
		autoheightGridList = shallow(JSX_AutoheightGridListStatic);
	});
	afterEach(() => {
		gridList = null;
		gridListCustomClassNames = null;
		autoheightGridList = null;
	});

	it('wraps gridList items with element containing className "gridList-item"', function() {
		const glItems = gridList.find('.gridList-item');
		expect(glItems.length).not.toBe(0);
	});

	it('wraps gridList items with element containing custom className when specified', function() {
		const glItems = gridListCustomClassNames.find(`.${glItemCustomClassName}`);
		expect(glItems.length).not.toBe(0);
	});

	it('sets correct autoHeight grid class', function() {
		const glUl = autoheightGridList.find('ul');
		expect(glUl.hasClass(GRID_AUTOHEIGHT_CLASS)).toBe(true);
	});

	it('sets correct autoHeight with wrap grid class', function() {
		const autoheightWithWrapGridList = shallow(
			JSX_AutoheightWithWrapGridListResponsive
		);
		const glUl = autoheightWithWrapGridList.find('ul');
		expect(glUl.hasClass('flex--wrap')).toBe(true);
	});

	it('wraps autoHeight gridList items with element containing className "flex-item"', function() {
		const glItems = autoheightGridList.find('.flex-item');
		expect(glItems.length).not.toBe(0);
	});
});

describe('Responsive GridList', function() {
	let glUl, autoheightGLUl;

	beforeEach(() => {
		gridList = shallow(JSX_GridListResponsive);
		autoheightGridList = shallow(JSX_AutoheightGridListResponsive);
		glUl = gridList.find('ul');
		autoheightGLUl = autoheightGridList.find('ul');
	});
	afterEach(() => {
		gridList = null;
		autoheightGridList = null;
		glUl = null;
		autoheightGLUl = null;
	});

	it('sets correct default columns class', function() {
		const defaultClass = `gridList--has${responsiveColsDefault}`;
		expect(glUl.hasClass(defaultClass)).toBe(true);
	});

	it('sets correct medium breakpoint columns class', function() {
		const mediumClass = `atMedium_gridList--has${responsiveColsMedium}`;
		expect(glUl.hasClass(mediumClass)).toBe(true);
	});

	it('sets correct large breakpoint columns class', function() {
		const largeClass = `atLarge_gridList--has${responsiveColsLarge}`;
		expect(glUl.hasClass(largeClass)).toBe(true);
	});

	it('sets correct autoHeight default columns class', function() {
		const defaultClass = `${GRID_AUTOHEIGHT_CLASS}--has${responsiveColsDefault}`;
		expect(autoheightGLUl.hasClass(defaultClass)).toBe(true);
	});

	it('sets correct autoHeight medium breakpoint columns class', function() {
		const mediumClass = `atMedium_${GRID_AUTOHEIGHT_CLASS}--has${responsiveColsMedium}`;
		expect(autoheightGLUl.hasClass(mediumClass)).toBe(true);
	});

	it('sets correct autoHeight large breakpoint columns class', function() {
		const largeClass = `atLarge_${GRID_AUTOHEIGHT_CLASS}--has${responsiveColsLarge}`;
		expect(autoheightGLUl.hasClass(largeClass)).toBe(true);
	});
});
