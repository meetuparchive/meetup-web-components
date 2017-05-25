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
			isChecked,
			toggle
		} = this.props;

		return <h1 className={WRAPPED_COMPONENT_CLASS} onClick={toggle} aria-pressed={isChecked}>Is this component checked?</h1>;
	}
}

/**
 * @class TestComponent
 */
class TestComponentCustomProp extends React.Component {
	render() {
		const {
			on,
			toggle
		} = this.props;

		return <h1 onClick={toggle} aria-pressed={on}>Is this component checked?</h1>;
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

	it('provides `isChecked` props to wrapped component', () => {
		const actualPropNames = Object.keys(wrappedComponent.props);
		const expectedPropName = 'isChecked';

		expect(actualPropNames).toContain(expectedPropName);
	});

	it('provides custom prop name for bool to wrapped component when one is specified', () => {
		const TestComponentWithToggleControl = withToggleControl(TestComponentCustomProp, 'on');
		const wrappedComponentCustomProp = TestUtils.renderIntoDocument(
			<TestComponentWithToggleControl />
		);
		const actualPropNames = Object.keys(wrappedComponentCustomProp.props);
		const expectedPropName = 'on';

		expect(actualPropNames).toContain(expectedPropName);
	});

	it('updates wrapped component `isChecked` value', () => {
		const wrappedComponentNode = TestUtils.findRenderedDOMComponentWithClass(wrappedComponent, WRAPPED_COMPONENT_CLASS);

		expect(() => wrappedComponentNode).not.toThrow();

		expect(wrappedComponentNode.getAttribute('aria-pressed') == 'true').toBe(false);
		TestUtils.Simulate.click(wrappedComponentNode);
		expect(wrappedComponentNode.getAttribute('aria-pressed') == 'true').toBe(true);
	});

});
