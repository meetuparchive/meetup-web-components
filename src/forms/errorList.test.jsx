import React from 'react';
import ErrorList from './ErrorList';
import { shallow } from 'enzyme';

const MOCK_ERROR = 'This is an error message';
const MOCK_ERROR_ID = 'name';

describe('ErrorList', () => {
	const componentWithId = shallow(
		<ErrorList errorId={MOCK_ERROR_ID} error={MOCK_ERROR} />
	);
	const componentWithoutId = shallow(<ErrorList error={MOCK_ERROR} />);

	it('matches snapshot for single error', () => {
		expect(componentWithId).toMatchSnapshot();
	});
	it('matches snapshot for input without id', () => {
		expect(componentWithoutId).toMatchSnapshot();
	});
});
