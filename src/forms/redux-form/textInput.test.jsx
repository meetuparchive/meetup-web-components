import React from 'react';
import { shallow } from 'enzyme';
import TextInput from './TextInput';

describe('redux-form TextInput', function() {

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
		const component = shallow(<TextInput {...formAttrs} />);

		expect(component).toMatchSnapshot();

	});

});
