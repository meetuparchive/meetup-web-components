import React from 'react';
import TestUtils from 'react-dom/test-utils';

import { MEDIA_QUERIES } from '../designConstants';
import withMatchMedia from './withMatchMedia';
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
const TestComponentWithMatchMedia = withMatchMedia(TestComponent);

/**
 * @param {Array} breakpoints - breakpoint names to pass to withMatchMedia
 */
function renderWrappedComponent(breakpoints) {
	return TestUtils.renderIntoDocument(<TestComponentWithMatchMedia />);
}

const MATCH_MEDIA_FN_MOCK = mq => ({
	matches: false,
	addListener: jest.fn(),
	removeListener: jest.fn(),
});

describe('withMatchMedia', () => {
	window.matchMedia = MATCH_MEDIA_FN_MOCK;

	it('should generate correct prop name from a given breakpoint', () => {
		const actual = MM.getStateNameByBreakpoint('foo');
		const expected = 'isAtFooUp';
		expect(actual).toEqual(expected);
	});

	it('build state object with boolean values (mocked to false)', () => {
		const actual = MM.getUpdatedMediaState(
			allBreakpoints.map(bp => window.matchMedia(MEDIA_QUERIES[bp])),
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

	it('provides breakpoint props to wrapped component', () => {
		const wrappedComponent = renderWrappedComponent(allBreakpoints);
		const innerComponent = TestUtils.findRenderedComponentWithType(
			wrappedComponent,
			TestComponent
		);
		const actualPropNames = Object.keys(innerComponent.props.media);

		allBreakpoints.forEach(bp => {
			const expectedPropName = MM.getStateNameByBreakpoint(bp);
			expect(actualPropNames).toContain(expectedPropName);
		});
	});

	it('provides a wrapped displayname', () => {
		expect(TestComponentWithMatchMedia.displayName).toBe(
			'WithMatchMedia(TestComponent)'
		);
	});
});
