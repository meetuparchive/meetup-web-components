import React from 'react';
import { shallow } from 'enzyme';
import ReduxTextInput from './ReduxTextInput';

describe('ReduxTextInput', function() {

	const formAttrs = {
		input: {
			label: 'Super Hero',
			name: 'superhero',
			value: 'Wonder Woman and Robin',
			maxLength: 20,
			required: true
		},
		meta: {
			error: 'Did you mean Batman and Robin?'
		}
	};

	it('renders a TextInput component with expected attributes from mock data', () => {
		const component = shallow(<ReduxTextInput {...formAttrs} />);

		expect(component).toMatchSnapshot();

	});

});
