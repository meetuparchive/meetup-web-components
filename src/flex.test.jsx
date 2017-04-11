import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Flex, {
	DIRECTION_ROW,
	DIRECTION_COLUMN,
	FLEX_CLASS,
	FLEX_ROW_CLASS,
	FLEX_COLUMN_CLASS,
	FLEX_WRAP_CLASS,
	FLEX_NOGUTTER_CLASS,
	FLEX_ALIGN_CLASS,
	VALID_ALIGNMENTS,
	VALID_BREAKPOINTS,
	VALID_SPACE,
} from './Flex';

describe('Flex', function() {
	it('exists', function() {
		const flex = TestUtils.renderIntoDocument(<Flex />);
		expect(() => TestUtils.findRenderedComponentWithType(flex, Flex)).not.toThrow();
	});
	describe('default', () => {
		it(`check that the component has '${FLEX_CLASS}' & '${FLEX_ROW_CLASS}' class`, function() {
			const flex = TestUtils.renderIntoDocument(<Flex />);
			expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, FLEX_CLASS)).not.toThrow();
			expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, FLEX_ROW_CLASS)).not.toThrow();
		});
	});
	describe('row', () => {
		it(`check that the component has '${FLEX_CLASS}' & '${FLEX_ROW_CLASS}' class`, function() {
			const flex = TestUtils.renderIntoDocument(<Flex direction={DIRECTION_ROW}/>);
			expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, FLEX_CLASS)).not.toThrow();
			expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, FLEX_ROW_CLASS)).not.toThrow();
		});
		describe('switchDirection', () => {
			it('check break point classes for switchDirection', function() {
				Object.keys(VALID_BREAKPOINTS).forEach(breakpoint => {
					const flex = TestUtils.renderIntoDocument(<Flex direction={DIRECTION_ROW} switchDirection={breakpoint}/>);
					const className = `${VALID_BREAKPOINTS[breakpoint]}_${FLEX_COLUMN_CLASS}`;
					expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, className)).not.toThrow();
					expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, FLEX_CLASS)).not.toThrow();
					expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, FLEX_ROW_CLASS)).not.toThrow();
				});
			});
		});
	});
	describe('column', () => {
		it(`check that the component has '${FLEX_CLASS}' & '${FLEX_COLUMN_CLASS}' class`, function() {
			const flex = TestUtils.renderIntoDocument(<Flex direction={DIRECTION_COLUMN}/>);
			expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, FLEX_CLASS)).not.toThrow();
			expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, FLEX_COLUMN_CLASS)).not.toThrow();

		});
		describe('switchDirection', () => {
			it('check break point classes for switchDirection', function() {
				Object.keys(VALID_BREAKPOINTS).forEach(breakpoint => {
					const flex = TestUtils.renderIntoDocument(<Flex direction={DIRECTION_COLUMN} switchDirection={breakpoint}/>);
					const className = `${VALID_BREAKPOINTS[breakpoint]}_${FLEX_ROW_CLASS}`;
					expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, className)).not.toThrow();
					expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, FLEX_CLASS)).not.toThrow();
					expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, FLEX_COLUMN_CLASS)).not.toThrow();
				});
			});
		});
	});
	describe('wrap', () => {
		it(`check break point classes for ${FLEX_WRAP_CLASS}`, function() {
			Object.keys(VALID_BREAKPOINTS).forEach(breakpoint => {
				const flex = TestUtils.renderIntoDocument(<Flex wrap={breakpoint}/>);
				const className = `${VALID_BREAKPOINTS[breakpoint]}_${FLEX_WRAP_CLASS}`;
				expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, className)).not.toThrow();
				expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, FLEX_CLASS)).not.toThrow();
			});
		});
	});
	describe('noGutters', () => {
		it(`check that the component has ${FLEX_NOGUTTER_CLASS} class`, function() {
			const flex = TestUtils.renderIntoDocument(<Flex noGutters/>);
			expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, FLEX_CLASS)).not.toThrow();
			expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, FLEX_NOGUTTER_CLASS)).not.toThrow();
		});
	});
	describe('justify', () => {
		it('check set justify classes', function() {
			Object.keys(VALID_SPACE).forEach(justify => {
				const flex = TestUtils.renderIntoDocument(<Flex justify={justify}/>);
				const className = `${FLEX_CLASS}--${VALID_SPACE[justify]}`;
				expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, className)).not.toThrow();
				expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, FLEX_CLASS)).not.toThrow();
			});
		});
	});
	describe('align', () => {
		it('check set align classes', function() {
			Object.keys(VALID_ALIGNMENTS).forEach(align => {
				const flex = TestUtils.renderIntoDocument(<Flex align={align}/>);
				const className = `${FLEX_ALIGN_CLASS}${VALID_ALIGNMENTS[align]}`;
				expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, className)).not.toThrow();
				expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, FLEX_CLASS)).not.toThrow();
			});
		});
	});
	describe('rowReverse', () => {
		it(`check rowReverse default value is ${VALID_BREAKPOINTS['all']} class`, function() {
			const flex = TestUtils.renderIntoDocument(<Flex rowReverse/>);
			const className = `${VALID_BREAKPOINTS['all']}_flex--rowReverse`;
			expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, className)).not.toThrow();
			expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, FLEX_CLASS)).not.toThrow();
		});
		it('check rowReverse at valid breakpoints classes', function() {
			Object.keys(VALID_BREAKPOINTS).forEach(breakpoint => {
				const flex = TestUtils.renderIntoDocument(<Flex rowReverse={breakpoint}/>);
				const className = `${VALID_BREAKPOINTS[breakpoint]}_flex--rowReverse`;
				expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, className)).not.toThrow();
				expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, FLEX_CLASS)).not.toThrow();
			});
		});
	});
	describe('columnReverse', () => {
		it(`check columnReverse default value is ${VALID_BREAKPOINTS['all']} class`, function() {
			const flex = TestUtils.renderIntoDocument(<Flex columnReverse/>);
			const className = `${VALID_BREAKPOINTS['all']}_flex--columnReverse`;
			expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, className)).not.toThrow();
			expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, FLEX_CLASS)).not.toThrow();
		});
		it('check columnReverse at valid breakpoints classes', function() {
			Object.keys(VALID_BREAKPOINTS).forEach(breakpoint => {
				const flex = TestUtils.renderIntoDocument(<Flex columnReverse={breakpoint}/>);
				const className = `${VALID_BREAKPOINTS[breakpoint]}_flex--columnReverse`;
				expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, className)).not.toThrow();
				expect(() => TestUtils.findRenderedDOMComponentWithClass(flex, FLEX_CLASS)).not.toThrow();
			});
		});
	});
});
