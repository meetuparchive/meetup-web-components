import React from 'react';

import withErrorList, {
	getFieldErrorProps,
	getErrorListProps,
} from './withErrorList';

const MOCK_FIELD_ID = 'name';
const MOCK_ERROR_MSG = 'You are not Keith Hernandez';

/**
 * @class TestComponent
 */
class TestComponent extends React.Component {
	render() {
		return <h1>Hello world</h1>;
	}
}
const TestComponentWithErrorList = withErrorList(TestComponent);

describe('getFieldErrorProps', () => {
	it('"aria-invalid" attribute should be true if there is an error passed', () => {
		const actual = getFieldErrorProps(MOCK_FIELD_ID, true);
		expect(actual).toHaveProperty('aria-invalid');
		expect(actual['aria-invalid']).toBe(true);
	});
	it('"aria-invalid" attribute should be false if there is no error passed', () => {
		const actual = getFieldErrorProps(MOCK_FIELD_ID, undefined);
		expect(actual).toHaveProperty('aria-invalid');
		expect(actual['aria-invalid']).toBe(false);
	});
	it('adds "aria-describedby" attribute when `id` is defined', () => {
		const actual = getFieldErrorProps(MOCK_FIELD_ID, true);
		expect(actual).toHaveProperty('aria-describedby');
	});
	it('does NOT add "aria-describedby" attribute when `id` is undefined', () => {
		const actual = getFieldErrorProps(undefined, true);
		expect(actual).not.toHaveProperty('aria-describedby');
	});
});

describe('getErrorListProps', () => {
	it('populates `errorId` when a defined id is passed', () => {
		const actual = getErrorListProps(MOCK_FIELD_ID, MOCK_ERROR_MSG);
		const expected = {
			errors: MOCK_ERROR_MSG,
			errorId: `${MOCK_FIELD_ID}-error`,
		};
		expect(actual).toMatchObject(expected);
	});
	it('does NOT populate `errorId` when an undefined id is passed', () => {
		const actual = getErrorListProps(undefined, MOCK_ERROR_MSG);
		const expected = {
			errors: MOCK_ERROR_MSG
		};
		expect(actual).toMatchObject(expected);
	});
});

describe('rendering of withErrorList wrapped component', () => {
	it('provides a wrapped displayname', () => {
		expect(TestComponentWithErrorList.displayName).toBe(
			'WithErrorList(TestComponent)'
		);
	});
});
