import React from 'react';
import TestUtils from 'react-addons-test-utils';
import withToggleControl from './WithToggleControl';

const WRAPPED_COMPONENT_CLASS = 'wrappedComponent';

/**
 * @class TestComponent
 */
class TestComponent extends React.Component {
	render() {
		const {
			isActive,
			toggleActive
		} = this.props;

		return <h1 className={WRAPPED_COMPONENT_CLASS} onClick={toggleActive} aria-pressed={isActive}>Is this component checked?</h1>;
	}
}

describe('WithToggleControl', function() {
	const TestComponentWithToggleControl = withToggleControl(TestComponent);
	const wrappedComponent = TestUtils.renderIntoDocument(
		<TestComponentWithToggleControl />
	);

	it('renders a wrapped component', () => {
		expect(() => TestUtils.findRenderedDOMComponentWithClass(wrappedComponent, WRAPPED_COMPONENT_CLASS)).not.toThrow();
	});

	it('creates a span element with aria attributes', () => {
		const spanEl = TestUtils.findRenderedDOMComponentWithTag(wrappedComponent, 'span');
		expect(spanEl.getAttribute('role')).toBe('button');
		expect(spanEl.getAttribute('aria-pressed')).toBe('false');
	});

	it('provides `isActive` props to wrapped component', () => {
		const actualPropNames = Object.keys(wrappedComponent.props);
		const expectedPropName = 'isActive';

		expect(actualPropNames).toContain(expectedPropName);
	});

	it('updates wrapped component `isActive` value', () => {
		const wrappedComponentNode = TestUtils.findRenderedDOMComponentWithClass(wrappedComponent, WRAPPED_COMPONENT_CLASS);

		expect(() => wrappedComponentNode).not.toThrow();

		expect(wrappedComponentNode.getAttribute('aria-pressed') == 'true').toBe(false);
		TestUtils.Simulate.click(wrappedComponentNode);
		expect(wrappedComponentNode.getAttribute('aria-pressed') == 'true').toBe(true);
	});

});
