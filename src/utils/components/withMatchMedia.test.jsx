import React from 'react';
import TestUtils from 'react-addons-test-utils';

import {MEDIA_QUERIES} from '../designConstants';
import * as MM from './withMatchMedia';

const allBreakpoints = Object.keys(MEDIA_QUERIES);

/**
 * @class TestComponent
 */
class TestComponent extends React.Component {
	render() {
		return <h1>Hello world</h1>;
	}
}

/**
 * @param {Array} breakpoints - breakpoint names to pass to withMatchMedia
 */
function renderWrappedComponent(breakpoints) {
	const renderer = TestUtils.createRenderer();
	const TestComponentWithMatchMedia = MM.withMatchMedia(
		TestComponent,
		breakpoints
	);
	renderer.render(<TestComponentWithMatchMedia />);
	return renderer.getRenderOutput();
}

describe('withMatchMedia', () => {

	describe('prop name generator', () => {
		it('should generate correct prop name from a given breakpoint', () => {
			const actual = MM.getStateNameByBreakpoint('foo');
			const expected = 'isAtFooUp';
			expect(actual).toEqual(expected);
		});
	});

	describe('media query prop provision', () => {

		it('provides breakpoint props to wrapped component', () => {
			const wrappedComponent = renderWrappedComponent(allBreakpoints);
			const actualPropNames = Object.keys(wrappedComponent.props);

			allBreakpoints.forEach(bp => {
				const expectedPropName = MM.getStateNameByBreakpoint(bp);
				expect(actualPropNames).toContain(expectedPropName);
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
