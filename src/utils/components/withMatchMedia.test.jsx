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
	const TestComponentWithMatchMedia = MM.withMatchMedia(
		TestComponent,
		breakpoints
	);
	return TestUtils.renderIntoDocument(<TestComponentWithMatchMedia />);
}

const MATCH_MEDIA_FN_MOCK = (mq) => ({
	matches: false,
	addListener: jest.fn(),
	removeListener: jest.fn(),
});

describe('withMatchMedia', () => {
	window.matchMedia = MATCH_MEDIA_FN_MOCK;

	describe('prop name generator', () => {
		it('should generate correct prop name from a given breakpoint', () => {
			const actual = MM.getStateNameByBreakpoint('foo');
			const expected = 'isAtFooUp';
			expect(actual).toEqual(expected);
		});
	});

	describe('state management', () => {
		const actual = MM.getUpdatedMediaState(
			allBreakpoints
				.map(bp => window.matchMedia(MEDIA_QUERIES[bp])),
			allBreakpoints
		);
		const expected = {
			isAtSmallUp: false,
			isAtMediumUp: false,
			isAtLargeUp: false,
			isAtHugeUp: false,
		};
		expect(actual).toEqual(expected);
	});

	describe('media query prop provision', () => {

		it('provides breakpoint props to wrapped component', () => {
			const wrappedComponent = renderWrappedComponent(allBreakpoints);
			const innerComponent = TestUtils.findRenderedComponentWithType(
				wrappedComponent,
				TestComponent
			);
			const actualPropNames = Object.keys(innerComponent.props);

			allBreakpoints.forEach(bp => {
				const expectedPropName = MM.getStateNameByBreakpoint(bp);
				expect(actualPropNames).toContain(expectedPropName);
			});
		});

		it('does NOT provide breakpoint props for unspecified media queries', () => {
			const onlyQuery = 'medium';
			const wrappedComponent = renderWrappedComponent([onlyQuery]);
			const innerComponent = TestUtils.findRenderedComponentWithType(
				wrappedComponent,
				TestComponent
			);
			const propNames = Object.keys(innerComponent.props);

			Object.keys(MEDIA_QUERIES)
				.filter(bp => bp !== onlyQuery)
				.forEach(bp => {
					expect(propNames).not.toContain(bp);
				});
		});
	});
});
