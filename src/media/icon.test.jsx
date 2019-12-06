import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Icon from './Icon';
import { MEDIA_SIZES } from '../utils/designConstants';
const ICON_MEDIA_SIZES = {
	...MEDIA_SIZES,
	xs: '20',
};

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
			const value = ICON_MEDIA_SIZES[size];
			expect(svgEl.getAttribute('width')).toEqual(value);
			expect(svgEl.getAttribute('height')).toEqual(value);
			if (size === 'auto') {
				expect(svgEl.getAttribute('viewBox')).toEqual(
					`0 0 ${ICON_MEDIA_SIZES['xl']} ${ICON_MEDIA_SIZES['xl']}`
				);
			} else {
				expect(svgEl.getAttribute('viewBox')).toEqual(`0 0 ${value} ${value}`);
			}
		};

		it('renders each size correctly', () => {
			Object.keys(ICON_MEDIA_SIZES).forEach(sizeChecker);
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
});
