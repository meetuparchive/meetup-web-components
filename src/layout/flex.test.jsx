import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

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
		const flexNode = ReactDOM.findDOMNode(flex);
		expect(flexNode).not.toBeNull();
	});
	describe('default', () => {
		it(`check that the component has '${FLEX_CLASS}' & '${FLEX_ROW_CLASS}' class`, function() {
			const flex = TestUtils.renderIntoDocument(<Flex />);
			const flexNode = ReactDOM.findDOMNode(flex);
			expect(flexNode.classList).toContain(FLEX_CLASS);
			expect(flexNode.classList).toContain(FLEX_ROW_CLASS);
		});
	});
	describe('row', () => {
		it(`check that the component has '${FLEX_CLASS}' & '${FLEX_ROW_CLASS}' class`, function() {
			const flex = TestUtils.renderIntoDocument(
				<Flex direction={DIRECTION_ROW} />
			);
			const flexNode = ReactDOM.findDOMNode(flex);
			expect(flexNode.classList).toContain(FLEX_CLASS);
			expect(flexNode.classList).toContain(FLEX_ROW_CLASS);
		});
		describe('switchDirection', () => {
			it('check break point classes for switchDirection', function() {
				Object.keys(VALID_BREAKPOINTS).forEach(breakpoint => {
					const flex = TestUtils.renderIntoDocument(
						<Flex direction={DIRECTION_ROW} switchDirection={breakpoint} />
					);
					const flexNode = ReactDOM.findDOMNode(flex);
					expect(flexNode.classList).toContain(FLEX_CLASS);
					expect(flexNode.classList).toContain(FLEX_ROW_CLASS);
					expect(flexNode.classList).toContain(
						`${VALID_BREAKPOINTS[breakpoint]}_${FLEX_COLUMN_CLASS}`
					);
				});
			});
		});
	});
	describe('column', () => {
		it(`check that the component has '${FLEX_CLASS}' & '${FLEX_COLUMN_CLASS}' class`, function() {
			const flex = TestUtils.renderIntoDocument(
				<Flex direction={DIRECTION_COLUMN} />
			);
			const flexNode = ReactDOM.findDOMNode(flex);
			expect(flexNode.classList).toContain(FLEX_CLASS);
			expect(flexNode.classList).toContain(FLEX_COLUMN_CLASS);
		});
		describe('switchDirection', () => {
			it('check break point classes for switchDirection', function() {
				Object.keys(VALID_BREAKPOINTS).forEach(breakpoint => {
					const flex = TestUtils.renderIntoDocument(
						<Flex direction={DIRECTION_COLUMN} switchDirection={breakpoint} />
					);
					const flexNode = ReactDOM.findDOMNode(flex);
					expect(flexNode.classList).toContain(FLEX_CLASS);
					expect(flexNode.classList).toContain(FLEX_COLUMN_CLASS);
					expect(flexNode.classList).toContain(
						`${VALID_BREAKPOINTS[breakpoint]}_${FLEX_ROW_CLASS}`
					);
				});
			});
		});
	});
	describe('wrap', () => {
		it(`check that the component has ${FLEX_WRAP_CLASS} class`, function() {
			const flex = TestUtils.renderIntoDocument(<Flex wrap />);
			const flexNode = ReactDOM.findDOMNode(flex);
			expect(flexNode.classList).toContain(FLEX_CLASS);
			expect(flexNode.classList).toContain(FLEX_WRAP_CLASS);
		});
	});
	describe('noGutters', () => {
		it(`check that the component has ${FLEX_NOGUTTER_CLASS} class`, function() {
			const flex = TestUtils.renderIntoDocument(<Flex noGutters />);
			const flexNode = ReactDOM.findDOMNode(flex);
			expect(flexNode.classList).toContain(FLEX_CLASS);
			expect(flexNode.classList).toContain(FLEX_NOGUTTER_CLASS);
		});
	});
	describe('justify', () => {
		it('check set justify classes', function() {
			Object.keys(VALID_SPACE).forEach(justify => {
				const flex = TestUtils.renderIntoDocument(<Flex justify={justify} />);
				const flexNode = ReactDOM.findDOMNode(flex);
				expect(flexNode.classList).toContain(FLEX_CLASS);
				expect(flexNode.classList).toContain(
					`${FLEX_CLASS}--${VALID_SPACE[justify]}`
				);
			});
		});
	});
	describe('align', () => {
		it('check set align classes', function() {
			Object.keys(VALID_ALIGNMENTS).forEach(align => {
				const flex = TestUtils.renderIntoDocument(<Flex align={align} />);
				const flexNode = ReactDOM.findDOMNode(flex);
				expect(flexNode.classList).toContain(FLEX_CLASS);
				expect(flexNode.classList).toContain(
					`${FLEX_ALIGN_CLASS}${VALID_ALIGNMENTS[align]}`
				);
			});
		});
	});
	describe('rowReverse', () => {
		it(`check rowReverse default value is ${VALID_BREAKPOINTS[
			'all'
		]} class`, function() {
			const flex = TestUtils.renderIntoDocument(<Flex rowReverse />);
			const flexNode = ReactDOM.findDOMNode(flex);
			expect(flexNode.classList).toContain(FLEX_CLASS);
			expect(flexNode.classList).toContain(
				`${VALID_BREAKPOINTS['all']}_flex--rowReverse`
			);
		});
		it('check rowReverse at valid breakpoints classes', function() {
			Object.keys(VALID_BREAKPOINTS).forEach(breakpoint => {
				const flex = TestUtils.renderIntoDocument(
					<Flex rowReverse={breakpoint} />
				);
				const flexNode = ReactDOM.findDOMNode(flex);
				expect(flexNode.classList).toContain(FLEX_CLASS);
				expect(flexNode.classList).toContain(
					`${VALID_BREAKPOINTS[breakpoint]}_flex--rowReverse`
				);
			});
		});
	});
	describe('columnReverse', () => {
		it(`check columnReverse default value is ${VALID_BREAKPOINTS[
			'all'
		]} class`, function() {
			const flex = TestUtils.renderIntoDocument(<Flex columnReverse />);
			const flexNode = ReactDOM.findDOMNode(flex);
			expect(flexNode.classList).toContain(FLEX_CLASS);
			expect(flexNode.classList).toContain(
				`${VALID_BREAKPOINTS['all']}_flex--columnReverse`
			);
		});
		it('check columnReverse at valid breakpoints classes', function() {
			Object.keys(VALID_BREAKPOINTS).forEach(breakpoint => {
				const flex = TestUtils.renderIntoDocument(
					<Flex columnReverse={breakpoint} />
				);
				const flexNode = ReactDOM.findDOMNode(flex);
				expect(flexNode.classList).toContain(FLEX_CLASS);
				expect(flexNode.classList).toContain(
					`${VALID_BREAKPOINTS[breakpoint]}_flex--columnReverse`
				);
			});
		});
	});
});
