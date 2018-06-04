import React from 'react';
import { shallow } from 'enzyme';
import ReduxFormTextarea from './Textarea';

describe('redux-form Textarea', () => {
	const formAttrs = {
		input: {
			id: 'heroField',
			label: 'Super Hero',
			name: 'superhero',
			value: 'Wonder Woman and Robin',
			autosize: true,
			maxLength: 20,
			required: true,
		},
		meta: {
			error: 'Did you mean Batman and Robin?',
		},
	};

	it('renders a Textarea component with expected attributes from mock data', () => {
		const component = shallow(<ReduxFormTextarea {...formAttrs} />);
		expect(component).toMatchSnapshot();
	});
});
