import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Icon, {
	ICON_CLASS,
	ICON_CIRCLED_CLASS,
	SVG_THIN_STYLE,
	getIconShape,
} from './Icon';
import { MEDIA_SIZES } from '../utils/designConstants';

describe('Icon', () => {
	const label = 'Icon Label',
		shape = 'chevron-down';

	describe('is a Icon element', () => {
		let iconEl;

		beforeEach(() => {
			const icon = TestUtils.renderIntoDocument(
				<Icon aria-label={label} shape={shape} />
			);

			iconEl = ReactDOM.findDOMNode(icon);
		});

		afterEach(() => {
			iconEl = null;
		});

		it('exists', () => {
			expect(iconEl).not.toBeNull();
		});

		it('has SQ2 icon styles', () => {
			expect(iconEl.classList.contains(ICON_CLASS)).toBe(true);
		});

		it('creates a first-child svg element', () => {
			const svgEl = iconEl.firstChild;
			expect(svgEl.nodeName).toBe('svg');
		});
	});

	describe('renders icon sizes correctly', () => {
		const sizeChecker = size => {
			const icon = TestUtils.renderIntoDocument(
				<Icon aria-label={label} shape={shape} size={size} />
			);
			const iconEl = ReactDOM.findDOMNode(icon);
			const svgEl = iconEl.querySelector('svg');
			const value = MEDIA_SIZES[size];
			expect(svgEl.getAttribute('width')).toEqual(value);
			expect(svgEl.getAttribute('height')).toEqual(value);
			if (size === 'auto') {
				expect(svgEl.getAttribute('viewBox')).toEqual(
					`0 0 ${MEDIA_SIZES['xl']} ${MEDIA_SIZES['xl']}`
				);
			} else {
				expect(svgEl.getAttribute('viewBox')).toEqual(`0 0 ${value} ${value}`);
			}
		};

		it('renders each size correctly', () => {
			Object.keys(MEDIA_SIZES).forEach(sizeChecker);
		});

		it('renders small shape variant for "xs" icons', () => {
			const xsIconShape = 'plus';
			const actual = getIconShape(xsIconShape, 'xs');
			const expected = `${xsIconShape}${SVG_THIN_STYLE}`;
			expect(actual).toBe(expected);
		});

		it('renders small shape variant for "s" icons', () => {
			const xsIconShape = 'plus';
			const actual = getIconShape(xsIconShape, 's');
			const expected = `${xsIconShape}${SVG_THIN_STYLE}`;
			expect(actual).toBe(expected);
		});

		it('renders normal shape variant for icons larger than "s"', () => {
			const actual = getIconShape(shape, 'm');
			const expected = shape;
			expect(actual).toBe(expected);
		});

		it('does NOT render a --small shape variant for third party icons', () => {
			const xsIconShape = 'external-yahoo';
			const actual = getIconShape(xsIconShape, 'xs');
			const expected = xsIconShape;
			expect(actual).toBe(expected);
		});

		it('does NOT render a --small shape variant meetup m logo', () => {
			const xsIconShape = 'meetup-m';
			const actual = getIconShape(xsIconShape, 'xs');
			const expected = xsIconShape;
			expect(actual).toBe(expected);
		});
	});

	describe('renders color override', () => {
		it('does NOT render a --small shape variant meetup m logo', () => {
			const fillColor = '#ff0000';
			const icon = TestUtils.renderIntoDocument(
				<Icon shape="chevron-down" color={fillColor} />
			);
			const svgEl = ReactDOM.findDOMNode(icon).querySelector('svg');

			expect(svgEl.style.fill).toContain(fillColor);
		});
	});

	describe('circle shape surrounding icon', () => {
		it('adds circle class to span wrapper when `circled` prop is passed', () => {
			const icon = TestUtils.renderIntoDocument(
				<Icon aria-label={label} shape={shape} circled />
			);
			const iconEl = ReactDOM.findDOMNode(icon);
			expect(iconEl.classList.contains(ICON_CIRCLED_CLASS)).toBe(true);
		});
		it('does NOT add circle class to span wrapper when `circled` prop is NOT passed', () => {
			const icon = TestUtils.renderIntoDocument(
				<Icon aria-label={label} shape={shape} />
			);
			const iconEl = ReactDOM.findDOMNode(icon);
			expect(iconEl.classList.contains(ICON_CIRCLED_CLASS)).toBe(false);
		});
	});
});
