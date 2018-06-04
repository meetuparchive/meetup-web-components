import React from 'react';
import withErrorList, { getErrorId } from './withErrorList';
import ErrorList from '../../forms/ErrorList';
import { shallow } from 'enzyme';

const MOCK_FIELD_ID = 'name';
const MOCK_ERROR_MSG = 'You are not Keith Hernandez';

const TestComponent = props => <h1 {...props}>Hello world</h1>;
const TestComponentWithErrorList = withErrorList(TestComponent);

describe('error id', () => {
	it('correctly generates id for `aria-describedby` from field `id` prop', () => {
		const actual = getErrorId(MOCK_FIELD_ID);
		const expected = 'name-error';
		expect(actual).toBe(expected);
	});
});

describe('withErrorList wrapped component', () => {
	const component = shallow(
		<TestComponentWithErrorList id={MOCK_FIELD_ID} error={MOCK_ERROR_MSG} />
	);
	const componentNoError = shallow(
		<TestComponentWithErrorList id={MOCK_FIELD_ID} />
	);
	const componentNoIdNoError = shallow(<TestComponentWithErrorList />);

	it('matches snapshot for component with id and error props', () => {
		expect(component).toMatchSnapshot();
	});
	it('matches snapshot for component without error prop', () => {
		expect(componentNoError).toMatchSnapshot();
	});
	it('matches snapshot for component without id or error props', () => {
		expect(componentNoIdNoError).toMatchSnapshot();
	});

	it('passes `error` to the `ErrorList`', () => {
		const errorProp = component.find(ErrorList).prop('error');
		expect(errorProp).toBe(MOCK_ERROR_MSG);
	});

	it('provides id for `aria-describedby` in both wrapped components when id is provided', () => {
		const wrappedComponent = componentNoError.find(TestComponent);
		const errorList = component.find(ErrorList);
		const expected = getErrorId(MOCK_FIELD_ID);

		expect(wrappedComponent.prop('aria-describedby')).toEqual(expected);
		expect(errorList.prop('id')).toEqual(expected);
	});

	it('does NOT provide id for `aria-describedby` in both wrapped components when id is NOT provided', () => {
		const wrappedComponent = componentNoIdNoError.find(TestComponent);
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
