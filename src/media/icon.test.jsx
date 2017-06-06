import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Icon, {
	ICON_CLASS,
	SVG_THIN_STYLE,
	getIconShape
} from './Icon';
import { MEDIA_SIZES } from '../utils/designConstants';

describe('Icon', () => {
	const label = 'Icon Label',
		shape = 'chevron-down';

	describe('is a Icon element', () => {
		let iconEl;

		beforeEach(() => {
			const icon = TestUtils.renderIntoDocument(
				<Icon
					aria-label={label}
					shape={shape} />
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
		const sizeChecker = (size) => {
			const icon = TestUtils.renderIntoDocument(
				<Icon
					aria-label={label}
					shape={shape}
					size={size} />
			);
			const iconEl = ReactDOM.findDOMNode(icon);
			const svgEl = iconEl.querySelector('svg');
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

		it('renders small shape variant for "xs" icons', () => {
			const xsIconShape = 'test';
			const actual = getIconShape(xsIconShape, 'xs');
			const expected = `${xsIconShape}${SVG_THIN_STYLE}`;
			expect(actual).toBe(expected);
		});

		it('renders small shape variant for "s" icons', () => {
			const xsIconShape = 'test';
			const actual = getIconShape(xsIconShape, 's');
			const expected = `${xsIconShape}${SVG_THIN_STYLE}`;
			expect(actual).toBe(expected);
		});

		it('renders normal shape variant for icons larger than "xs"', () => {
			const actual = getIconShape(shape, 'm');
			const expected = shape;
			expect(actual).toBe(expected);
		});

		it('does NOT render a --small shape variant for third party icons', () => {
			const xsIconShape = 'external-friendster';
			const actual = getIconShape(xsIconShape, 'xs');
			const expected = xsIconShape;
			expect(actual).toBe(expected);
		});
	});
});
