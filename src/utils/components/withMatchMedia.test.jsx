import React from 'react';
import TestUtils from 'react-addons-test-utils';

import {MEDIA_QUERIES} from '../designConstants';
import * as MM from './withMatchMedia';

const allBreakpoints = Object.keys(MEDIA_QUERIES);


function renderWrappedComponent(breakpoints) {
	const renderer = TestUtils.createRenderer();
	const TestComponentWithMatchMedia = MM.withMatchMedia(
		<h1>Hello world</h1>,
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

	describe('matchMedia listener handling', () => {
		const wrappedComponent = renderWrappedComponent(allBreakpoints);

		it('should fire media change handler on mount', () => {
			const mediaChangeSpy = spyOn(MM, 'getUpdatedMediaState')
				.and.callThrough();

			expect(mediaChangeSpy).not.toHaveBeenCalled();
			wrappedComponent.componentDidMount();
			expect(mediaChangeSpy).toHaveBeenCalled();
		});

		it('should clean up all listeners on unmount', () => {
			const mqLength = wrappedComponent.mediaQueries.length;

			expect(mqLength).toEqual(allBreakpoints.length);
			wrappedComponent.componentWillUnmount();
			expect(mqLength).toEqual(0);
		});
	});
});
