import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Icon, { ICON_CLASS, getScaleFactor } from './Icon';
import { MEDIA_SIZES } from '../utils/designConstants';
import { BREAKPOINT_MEDIA_SCALE_RATIOS } from '../utils/designConstants';

const renderComponent = (props) =>
	TestUtils.renderIntoDocument(<Icon {...props} />);

describe('Icon', () => {
	const label = 'Icon Label',
		shape = 'chevron-down';

	describe('is a Icon element', () => {
		let icon;

		beforeEach(() => {
			icon = renderComponent({
				'aria-label': label,
				shape: shape
			});
		});

		afterEach(() => icon = null);

		it('exists', () => {
			expect(() => TestUtils.findRenderedComponentWithType(icon, Icon)).not.toThrow();
		});

		it(`should have ${ICON_CLASS} icon styles`, () => {
			expect(() => TestUtils.findRenderedDOMComponentWithClass(icon, ICON_CLASS)).not.toThrow();
		});

		it('creates SVG element', () => {
			expect(() => TestUtils.findRenderedDOMComponentWithTag(icon, 'SVG')).not.toThrow();
		});
	});

	describe('renders icon sizes correctly', () => {
		const sizeChecker = (size) => {
			const icon = renderComponent({
				'aria-label': label,
				shape: shape,
				size: size
			});
			const svgEl = TestUtils.findRenderedDOMComponentWithTag(icon, 'SVG');
			const value = MEDIA_SIZES[size];
			expect(svgEl.getAttribute('width')).toEqual(value);
			expect(svgEl.getAttribute('height')).toEqual(value);
			if (size === 'auto') {
				expect(svgEl.getAttribute('viewBox')).toEqual(`0 0 ${MEDIA_SIZES['xl']} ${MEDIA_SIZES['xl']}`);
			} else {
				expect(svgEl.getAttribute('viewBox')).toEqual(`0 0 ${value} ${value}`);
			}
		};

		it('renders each size correctly', () => {
			Object.keys(MEDIA_SIZES).forEach(sizeChecker);
		});
	});

	describe('icons scale correctly based on viewport size', () => {
		it('does not scale icons below the medium breakpoint', () => {
			const scaleFactor = getScaleFactor({
				isMedium: false,
				isLarge: false,
			});
			expect(scaleFactor).toBe(1);
		});
		it('scales using the medium ratio at the medium breakpoint', () => {
			const scaleFactor = getScaleFactor({
				isMedium: true,
				isLarge: false,
			});
			expect(scaleFactor).toBe(BREAKPOINT_MEDIA_SCALE_RATIOS.medium);
		});
		it('scales using the large ratio at the large breakpoint', () => {
			const scaleFactor = getScaleFactor({
				isMedium: true, // "larger than medium" is also true for large viewports
				isLarge: true,
			});
			expect(scaleFactor).toBe(BREAKPOINT_MEDIA_SCALE_RATIOS.large);
		});
	});
});
