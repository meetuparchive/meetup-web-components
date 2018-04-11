import React from 'react';
import { shallow } from 'enzyme';
import ReduxFormNumberInput from './NumberInput';

describe('redux-form NumberInput', function() {
	// props structured to match what redux-form provides to <Field> `component`
	const props = {
		meta: {},
		input: {
			label: 'Number of internets',
			name: 'internets',
			value: 10,
		},
	};

	it('renders a NumberInput component with expected attributes from mock data', () => {
		const component = shallow(<ReduxFormNumberInput {...props} />);
		expect(component).toMatchSnapshot();
	});
});
