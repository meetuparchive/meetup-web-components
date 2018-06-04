import React from 'react';
import { shallow } from 'enzyme';
import ReduxFormTextInput from './TextInput';

describe('redux-form TextInput', function() {
	const MOCK_ERROR = 'Did you mean Batman and Robin?';
	const formAttrs = {
		input: {
			label: 'Super Hero',
			name: 'superhero',
			value: 'Wonder Woman and Robin',
			maxLength: 20,
			required: true,
		},
		meta: {
			error: MOCK_ERROR,
		},
	};

	it('renders a TextInput component with expected attributes from mock data', () => {
		const component = shallow(<ReduxFormTextInput {...formAttrs} />);
		expect(component).toMatchSnapshot();
	});
});
