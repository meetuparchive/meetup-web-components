import React from 'react';
import withErrorList, { getErrorId } from './withErrorList';
import ErrorList from '../../forms/ErrorList';
import { mount } from 'enzyme';

const MOCK_FIELD_ID = 'name';
const MOCK_ERROR_MSG = 'You are not Keith Hernandez';

const TestComponent = (props) => (<h1 {...props}>Hello world</h1>);
const TestComponentWithErrorList = withErrorList(TestComponent);

describe('error id', () => {
	it('correctly generates id for `aria-describedby` from field `id` prop', () => {
		const actual = getErrorId(MOCK_FIELD_ID);
		const expected = 'name-error';
		expect(actual).toBe(expected);
	});
});

describe('withErrorList wrapped component', () => {

	it('passes `error` to the `ErrorList`', () => {
		const component = mount(
			<TestComponentWithErrorList
				id={MOCK_FIELD_ID}
				error={MOCK_ERROR_MSG}
			/>
		);
		expect(component.find('li').text()).toBe(MOCK_ERROR_MSG);
	});

	it('provides TRUE `aria-invalid` prop when wrapped component has `error`', () => {
		const component = mount(
			<TestComponentWithErrorList
				id={MOCK_FIELD_ID}
				error={MOCK_ERROR_MSG}
			/>
		);
		const wrappedComponent = component.find(TestComponent);
		expect(wrappedComponent.prop('aria-invalid')).toBe(true);
	});

	it('provides FALSE `aria-invalid` prop when wrapped component does not have `error`', () => {
		const component = mount(
			<TestComponentWithErrorList
				id={MOCK_FIELD_ID}
			/>
		);
		const wrappedComponent = component.find(TestComponent);
		expect(wrappedComponent.prop('aria-invalid')).toBe(false);
	});

	it('provides id for `aria-describedby` in both wrapped components when id is provided', () => {
		const component = mount(
			<TestComponentWithErrorList
				id={MOCK_FIELD_ID}
			/>
		);
		const wrappedComponent = component.find(TestComponent);
		const errorList = component.find(ErrorList);

		expect(wrappedComponent.prop('aria-describedby'))
			.toEqual(getErrorId(MOCK_FIELD_ID));
		expect(errorList.prop('errorId'))
			.toEqual(getErrorId(MOCK_FIELD_ID));
	});

	it('does NOT provide id for `aria-describedby` in both wrapped components when id is NOT provided', () => {
		const component = mount(
			<TestComponentWithErrorList />
		);
		const wrappedComponent = component.find(TestComponent);
		const errorList = component.find(ErrorList);

		expect(wrappedComponent.prop('aria-describedby')).toBe(undefined);
		expect(errorList.prop('errorId')).toBe(undefined);
	});

	it('provides a wrapped displayname', () => {
		expect(TestComponentWithErrorList.displayName).toBe(
			'WithErrorList(TestComponent)'
		);
		expect(true).toBe(true);
	});
});
