import React from 'react';
import TestUtils from 'react-dom/test-utils';
import withToggleControl from './WithToggleControl';

const WRAPPED_COMPONENT_CLASS = 'wrappedComponent';

/**
 * @class TestComponent
 */
class TestComponent extends React.Component {
	render() {
		const { isActive, toggleActive } = this.props;

		return (
			<h1
				className={WRAPPED_COMPONENT_CLASS}
				onClick={toggleActive}
				isActive={isActive}
			>
				Is this component checked?
			</h1>
		);
	}
}

const TestComponentWithToggleControl = withToggleControl(TestComponent);
const wrappedComponent = TestUtils.renderIntoDocument(
	<TestComponentWithToggleControl />
);

describe('WithToggleControl', function() {

	it('renders a wrapped component', () => {
		expect(() =>
			TestUtils.findRenderedDOMComponentWithClass(
				wrappedComponent,
				WRAPPED_COMPONENT_CLASS
			)
		).not.toThrow();
	});

	it('creates a span element with aria attributes', () => {
		const spanEl = TestUtils.findRenderedDOMComponentWithTag(
			wrappedComponent,
			'span'
		);
		expect(spanEl.getAttribute('role')).toBe('button');
		expect(spanEl.getAttribute('aria-pressed')).toBe('false');
	});

	it('provides `isActive` props to wrapped component', () => {
		const actualPropNames = Object.keys(wrappedComponent.props);
		const expectedPropName = 'isActive';

		expect(actualPropNames).toContain(expectedPropName);
	});

	it('updates `isActive` on click', () => {
		const buttonRoleNode = TestUtils.findRenderedDOMComponentWithTag(
			wrappedComponent,
			'span'
		);

		expect(buttonRoleNode.getAttribute('aria-pressed') == 'true').toBe(
			false
		);
		TestUtils.Simulate.click(buttonRoleNode);
		expect(buttonRoleNode.getAttribute('aria-pressed') == 'true').toBe(
			true
		);
	});

	it('updates `isActive` on valid key press (Enter or Space bar)', () => {
		const buttonRoleNode = TestUtils.findRenderedDOMComponentWithTag(
			wrappedComponent,
			'span'
		);

		expect(buttonRoleNode.getAttribute('aria-pressed') == 'true').toBe(
			false
		);
		TestUtils.Simulate.keyUp(buttonRoleNode, {key: 'Enter'});
		expect(buttonRoleNode.getAttribute('aria-pressed') == 'true').toBe(
			true
		);

		TestUtils.Simulate.keyUp(buttonRoleNode, {key: ' '});
		expect(buttonRoleNode.getAttribute('aria-pressed') == 'true').toBe(
			false
		);
	});
});
