import React from 'react';
import ErrorList from './ErrorList';
import { shallow } from 'enzyme';

const MOCK_ERROR = "This is an error message";
const MOCK_ERROR_LIST = [
	"First error message",
	"Second error message",
	"Third error message"
];
const MOCK_ERROR_ID = "name";

describe('ErrorList', () => {

	const componentWithId = shallow(
		<ErrorList
			errorId={MOCK_ERROR_ID}
			errors={MOCK_ERROR}
		/>
	);
	const componentWithoutId = shallow(
		<ErrorList errors={MOCK_ERROR} />
	);

	it('matches snapshot for single error', () => {
		expect(componentWithId).toMatchSnapshot();
	});
	it('matches snapshot for multiple errors', () => {
		const component = shallow(
			<ErrorList
				errorId={MOCK_ERROR_ID}
				errors={MOCK_ERROR_LIST}
			/>
		);
		expect(component).toMatchSnapshot();
	});
	it('matches snapshot for input without id', () => {
		expect(componentWithoutId).toMatchSnapshot();
	});
	it('applies id attribute when `errorId` provided', () => {
		expect(componentWithId.props()).toHaveProperty('id');
		expect(componentWithId.prop('id')).toEqual(MOCK_ERROR_ID);
	});
	it('does NOT apply id attribute when `errorId` is not provided', () => {
		expect(componentWithoutId.props()).not.toHaveProperty('id');
	});
	it('list of errors has `aria-live` attribute', () => {
		[
			componentWithoutId,
			componentWithId
		].forEach(c => {
			expect(c.find('ul').html()).toEqual(
				expect.stringContaining('aria-live')
			);
		});
	});
});
