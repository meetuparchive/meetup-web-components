import React from 'react';
import TestUtils from 'react-addons-test-utils';

import {MEDIA_QUERIES} from '../designConstants';
import {
	createPropNameFromBreakpoint,
	validateBreakpoints,
	withMatchMedia
} from './withMatchMedia';

const TestComponent = ({props}) => (
	<h1>Hello world</h1>
);

function renderWrappedComponent(...mediaQueries) {
	const renderer = TestUtils.createRenderer();
	return renderer.render(
		withMatchMedia(TestComponent, ...mediaQueries)
	);
}

describe('withMatchMedia', () => {

	describe('breakpoint validation', () => {
		it('should throw an error if no breakpoint is provided', () => {
			expect(renderWrappedComponent()).toThrow();
		});
		it('should throw an error if an invalid breakpoint is passed', () => {
			expect(validateBreakpoints(['this is not valid'])).toThrow();
		});
	});

	describe('prop name generator', () => {
		it('should generate correct prop name from a given breakpoint', () => {
			const actual = createPropNameFromBreakpoint('foo');
			const expected = 'isAtFooUp';
			expect(actual).toEqual(expected);
		});
	});

	describe('media query prop provision', () => {
		const allBreakpoints = Object.keys(MEDIA_QUERIES);

		it('provides breakpoint props to wrapped component', () => {
			const wrappedComponent = renderWrappedComponent(MEDIA_QUERIES);
			const propNames = Object.keys(wrappedComponent.props);

			expect(wrappedComponent).not.toThrow();

			allBreakpoints.forEach(bp => {
				expect(propNames).toContain(bp);
			});
		});

		it('does NOT provide breakpoint props for unspecified media queries', () => {
			const onlyQuery = 'medium';
			const wrappedComponent = renderWrappedComponent([onlyQuery]);
			const propNames = Object.keys(wrappedComponent.props);

			Object.keys(MEDIA_QUERIES)
				.filter(bp => bp !== onlyQuery)
				.forEach(bp => {
					expect(propNames).not.toContain(bp);
				});
		});
	});
});
