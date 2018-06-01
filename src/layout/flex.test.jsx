import React from 'react';
import { shallow } from 'enzyme';

import {
	Flex,
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
	const flex = shallow(<Flex />);

	it('exists', function() {
		expect(flex).toMatchSnapshot();
	});
	describe('default', () => {
		it(`check that the component has '${FLEX_CLASS}' & '${FLEX_ROW_CLASS}' class`, function() {
			expect(flex.hasClass(FLEX_CLASS)).toBe(true);
			expect(flex.hasClass(FLEX_ROW_CLASS)).toBe(true);
		});
	});
	describe('row', () => {
		it(`check that the component has '${FLEX_CLASS}' & '${FLEX_ROW_CLASS}' class`, function() {
			const flex = shallow(<Flex direction={DIRECTION_ROW} />);
			expect(flex.hasClass(FLEX_CLASS)).toBe(true);
			expect(flex.hasClass(FLEX_ROW_CLASS)).toBe(true);
		});
		describe('switchDirection', () => {
			it('check break point classes for switchDirection', function() {
				Object.keys(VALID_BREAKPOINTS).forEach(breakpoint => {
					const flex = shallow(
						<Flex direction={DIRECTION_ROW} switchDirection={breakpoint} />
					);
					expect(flex.hasClass(FLEX_CLASS)).toBe(true);
					expect(flex.hasClass(FLEX_ROW_CLASS)).toBe(true);
					expect(
						flex.hasClass(
							`${VALID_BREAKPOINTS[breakpoint]}_${FLEX_COLUMN_CLASS}`
						)
					).toBe(true);
				});
			});
		});
	});
	describe('column', () => {
		it(`check that the component has '${FLEX_CLASS}' & '${FLEX_COLUMN_CLASS}' class`, function() {
			const flex = shallow(<Flex direction={DIRECTION_COLUMN} />);
			expect(flex.hasClass(FLEX_CLASS)).toBe(true);
			expect(flex.hasClass(FLEX_COLUMN_CLASS)).toBe(true);
		});
		describe('switchDirection', () => {
			it('check break point classes for switchDirection', function() {
				Object.keys(VALID_BREAKPOINTS).forEach(breakpoint => {
					const flex = shallow(
						<Flex direction={DIRECTION_COLUMN} switchDirection={breakpoint} />
					);
					expect(flex.hasClass(FLEX_CLASS)).toBe(true);
					expect(flex.hasClass(FLEX_COLUMN_CLASS)).toBe(true);
					expect(
						flex.hasClass(`${VALID_BREAKPOINTS[breakpoint]}_${FLEX_ROW_CLASS}`)
					).toBe(true);
				});
			});
		});
	});
	describe('wrap', () => {
		it(`check that the component has ${FLEX_WRAP_CLASS} class`, function() {
			const flex = shallow(<Flex wrap />);
			expect(flex.hasClass(FLEX_CLASS)).toBe(true);
			expect(flex.hasClass(FLEX_WRAP_CLASS)).toBe(true);
		});
	});
	describe('noGutters', () => {
		it(`check that the component has ${FLEX_NOGUTTER_CLASS} class`, function() {
			const flex = shallow(<Flex noGutters />);
			expect(flex.hasClass(FLEX_CLASS)).toBe(true);
			expect(flex.hasClass(FLEX_NOGUTTER_CLASS)).toBe(true);
		});
	});
	describe('justify', () => {
		it('check set justify classes', function() {
			Object.keys(VALID_SPACE).forEach(justify => {
				const flex = shallow(<Flex justify={justify} />);
				expect(flex.hasClass(FLEX_CLASS)).toBe(true);
				expect(flex.hasClass(`${FLEX_CLASS}--${VALID_SPACE[justify]}`)).toBe(
					true
				);
			});
		});
	});
	describe('align', () => {
		it('check set align classes', function() {
			Object.keys(VALID_ALIGNMENTS).forEach(align => {
				const flex = shallow(<Flex align={align} />);
				expect(flex.hasClass(FLEX_CLASS)).toBe(true);
				expect(
					flex.hasClass(`${FLEX_ALIGN_CLASS}${VALID_ALIGNMENTS[align]}`)
				).toBe(true);
			});
		});
	});
	describe('rowReverse', () => {
		it(`check rowReverse default value is ${VALID_BREAKPOINTS[
			'all'
		]} class`, function() {
			const flex = shallow(<Flex rowReverse />);
			expect(flex.hasClass(FLEX_CLASS)).toBe(true);
			expect(
				flex.hasClass(`${VALID_BREAKPOINTS['all']}_flex--rowReverse`)
			).toBe(true);
		});
		it('check rowReverse at valid breakpoints classes', function() {
			Object.keys(VALID_BREAKPOINTS).forEach(breakpoint => {
				const flex = shallow(<Flex rowReverse={breakpoint} />);
				expect(flex.hasClass(FLEX_CLASS)).toBe(true);
				expect(
					flex.hasClass(`${VALID_BREAKPOINTS[breakpoint]}_flex--rowReverse`)
				).toBe(true);
			});
		});
	});
	describe('columnReverse', () => {
		it(`check columnReverse default value is ${VALID_BREAKPOINTS[
			'all'
		]} class`, function() {
			const flex = shallow(<Flex columnReverse />);
			expect(flex.hasClass(FLEX_CLASS)).toBe(true);
			expect(
				flex.hasClass(`${VALID_BREAKPOINTS['all']}_flex--columnReverse`)
			).toBe(true);
		});
		it('check columnReverse at valid breakpoints classes', function() {
			Object.keys(VALID_BREAKPOINTS).forEach(breakpoint => {
				const flex = shallow(<Flex columnReverse={breakpoint} />);
				expect(flex.hasClass(FLEX_CLASS)).toBe(true);
				expect(
					flex.hasClass(`${VALID_BREAKPOINTS[breakpoint]}_flex--columnReverse`)
				).toBe(true);
			});
		});
	});
});
