import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Hscroll from './Hscroll';

const listItems = [
	<div>item</div>,
	<div>item</div>,
	<div>item</div>,
	<div>item</div>,
	<div>item</div>,
	<div>item</div>,
	<div>item</div>,
	<div>item</div>,
	<div>item</div>
];

describe('Default Hscroll', () => {
	let component;

	beforeEach(() => {
		component = TestUtils.renderIntoDocument(
			<Hscroll>
				{listItems}
			</Hscroll>
		);
	});
	afterEach(() => {
		component = null;
	});

	it('does not have graident class when `gradient` prop is not supplied', () => {
		const gradientEls = TestUtils.scryRenderedDOMComponentsWithClass(
			component,
			'hscrollGradientWrap'
		);
		expect(gradientEls).toHaveLength;
	});
});

describe('Gradient Hscroll', () => {
	const component = TestUtils.renderIntoDocument(
		<Hscroll
			hasGradient
		>
			{listItems}
		</Hscroll>
	);
	const gradientEls = TestUtils.scryRenderedDOMComponentsWithClass(
		component,
		'hscrollGradientWrap'
	);

	it('has graident class when `gradient` prop is supplied', () => {
		expect(gradientEls.length).toBe(1);
	});

});

describe('Responsive Hscroll', () => {
	const component = TestUtils.renderIntoDocument(
		<Hscroll
			unclipAt='large'
		>
			{listItems}
		</Hscroll>
	);
	const hscrollElement = TestUtils.findRenderedDOMComponentWithClass(
		component,
		'hscroll'
	);

	it('has correct media-conditional modifier on `hscroll` element', () => {
		expect(hscrollElement.className).toContain('atLarge_hscroll--unclip');
	});

});
