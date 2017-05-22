import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { withToggleControl } from './WithToggleControl';

const WRAPPED_COMPONENT_CLASS = 'wrappedComponent';
const WRAPPED_COMPONENT_ID = 'testComponent';
const WRAPPED_COMPONENT_NAME = 'testComponentName';

/**
 * @class TestComponent
 */
class TestComponent extends React.Component {
	render() {
		const {
			isChecked
		} = this.props;

		return <h1 className={WRAPPED_COMPONENT_CLASS}>{`Is this component checked? ${isChecked}`}</h1>;
	}
}

describe('WithToggleControl', function() {
	const TestComponentWithToggleControl = withToggleControl(TestComponent);
	const wrappedComponent = TestUtils.renderIntoDocument(
		<TestComponentWithToggleControl
			id={WRAPPED_COMPONENT_ID}
			name={WRAPPED_COMPONENT_NAME}
		/>
	);

	it('renders a wrapped component', () => {
		expect(() => TestUtils.findRenderedDOMComponentWithClass(wrappedComponent, WRAPPED_COMPONENT_CLASS)).not.toThrow();
	});

	it('creates an input element', () => {
		expect(() => TestUtils.findRenderedDOMComponentWithTag(wrappedComponent, 'input')).not.toThrow();
	});

	it('creates a label element', () => {
		expect(() => TestUtils.findRenderedDOMComponentWithTag(wrappedComponent, 'label')).not.toThrow();
	});

	it('provides `isChecked` props to wrapped component', () => {
		const actualPropNames = Object.keys(wrappedComponent.props);
		const expectedPropName = 'isChecked';

		// console.warn(wrappedComponent);

		expect(actualPropNames).toContain(expectedPropName);
	});

	it('updates wrapped component `isChecked` prop', () => {
		const checkboxEl = TestUtils.findRenderedDOMComponentWithTag(wrappedComponent, 'input');

		expect(() => checkboxEl).not.toThrow();

		expect(wrappedComponent.props.isChecked).toBe(false);
		// expect(checkboxEl.checked).toBe(false);
		TestUtils.Simulate.change(checkboxEl, { target: { checked : true }});
		// expect(checkboxEl.checked).toBe(true);
		expect(wrappedComponent.props.isChecked).toBe(true);
	});

});
